import BasicTable from "@/components/basicTable/basicTable";
import useAuth from "@/hooks/auth";
import secureAxios from "@/lib/interceptor";
import { cn } from "@/lib/utils";
import { CatmItem } from "@/type";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

type CatmsProps = {
  className?: string;
};

const Catms = ({ className }: CatmsProps) => {
  const { user } = useAuth();

  const { data: catms, isLoading } = useQuery({
    queryKey: ["catms", user?.teacher_id],
    queryFn: () => getCatms(user?.teacher_id),
  });

  if (isLoading)
    return (
      <div className="flex flex-row items-start justify-center">
        <Loader2 size={32} />
      </div>
    );

  if (!catms)
    return <div className="w-full grid place-items-center pb-2">No Data</div>;

  const columns: ColumnDef<CatmItem>[] = [
    {
      header: "Course Code",
      accessorKey: "course_code",
    },
    {
      header: "Course Title",
      accessorKey: "course_title",
    },
    {
      header: "Semester",
      accessorKey: "semester",
    },
    {
      header: "Session",
      accessorKey: "session",
    },
    {
      header: "Course Type",
      accessorKey: "course_type",
    },
    {
      header: "Action",
      cell: (info) => {
        return (
          <Link
            to="/catm/$teacher_id/$exam_id/$course_id"
            params={{
              teacher_id: user?.teacher_id.toString(),
              exam_id: info.row.original.exam_id.toString(),
              course_id: info.row.original.course_id.toString(),
            }}
            className="font-medium transition-colors text-blue-400 hover:text-blue-600 visited:text-blue-800"
          >
            Fill Paper
          </Link>
        );
      },
    },
  ];

  return (
    <div className={cn(className)}>
      <h1 className="font-semibold text-3xl mb-10">Class Test Marks</h1>
      <div className="flex flex-col gap-3">
        <Suspense fallback={<div>Loading...</div>}>
          <BasicTable data={catms} columns={columns} loading={isLoading} />
        </Suspense>
      </div>
    </div>
  );
};

async function getCatms(teacher_id: number): Promise<CatmItem[]> {
  const data = await secureAxios
    .get(`/course-teacher/${teacher_id}`, {
      params: {
        is_catm_submitted: 0,
      },
    })
    .then((res) => res.data);
  return data;
}

export default Catms;
