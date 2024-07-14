import { formatOrdinals } from "@/helper/formatOrdinals";
import { cn } from "@/lib/utils";
import { Card } from "../../ui/card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { CatmItem } from "@/type";
import useAuth from "@/hooks/auth";

type CatmsProps = {
  className?: string;
};

const Catms = ({ className }: CatmsProps) => {
  const { user } = useAuth();

  const { data: catms, isLoading } = useQuery({
    queryKey: ["catms", user.teacher_id],
    queryFn: () => getCatms(user.teacher_id),
  });

  if (isLoading)
    return (
      <div className="flex flex-row items-start justify-center">
        <Loader2 size={32} />
      </div>
    );

  if (!catms)
    return <div className="w-full grid place-items-center pb-2">No Data</div>;

  return (
    <div className={cn(className)}>
      <h1 className="font-semibold text-3xl mb-10">Class Test Marks</h1>
      <div className="flex flex-col gap-3">
        {catms.map((catm, idx) => (
          <Link
            key={idx}
            to="/catm/$teacher_id/$exam_id/$course_id"
            params={{
              teacher_id: user.teacher_id.toString(),
              exam_id: catm.exam_id.toString(),
              course_id: catm.course_id.toString(),
            }}
          >
            <Card className=" bg-white shadow-md rounded-lg overflow-hidden transition-all ease-in-out duration-300 hover:shadow-xl py-4 px-2">
              <h1 className="text-xl">
                {catm.course_title},{catm.course_code},{" "}
                {formatOrdinals(catm.semester)}, {catm.session}
              </h1>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

async function getCatms(teacher_id: number): Promise<CatmItem[]> {
  const data = await axios
    .get(import.meta.env.VITE_API_URL + `/course-teacher/${teacher_id}`, {
      params: {
        is_catm_submitted: 0,
      },
    })
    .then((res) => res.data);
  return data;
}

export default Catms;
