import { formatOrdinals } from "@/helper/formatOrdinals";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";

const catms = [
  {
    id: 1,
    course_code: "CSE 613",
    course_name: "Telecommunication",
    semester: 6,
    session: "2022-23",
  },
  {
    id: 2,
    course_code: "CSE 514",
    course_name: "Artificial Intelligence",
    semester: 5,
    session: "2022-23",
  },
];

type CatmsProps = {
  className?: string;
};

const Catms = ({ className }: CatmsProps) => {
  return (
    <div className={cn(className)}>
      <h1>Class Test Marks</h1>
      <div className="flex flex-col gap-3">
        {catms.map((catm) => (
          <Card
            key={catm.id}
            className=" bg-white shadow-md rounded-lg overflow-hidden transition-all ease-in-out duration-300 hover:shadow-xl py-4 px-2"
          >
            <h1 className="text-xl">
              {catm.course_code},{catm.course_name},{" "}
              {formatOrdinals(catm.semester)}, {catm.session}
            </h1>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Catms;
