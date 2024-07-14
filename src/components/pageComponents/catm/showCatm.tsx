import BasicTable from "@/components/basicTable/basicTable";
import { catmTableDataType } from "@/type";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";

export default function ShowCatm({
  exam_id,
  course_id,
}: {
  exam_id: string;
  course_id: string;
}) {
  const { data } = useQuery({
    queryKey: ["showCatm", exam_id, course_id],
    queryFn: () => getCatm(exam_id, course_id),
  });

  const columns: ColumnDef<catmTableDataType>[] = [
    {
      header: "Student ID",
      accessorKey: "student_id",
    },
    { header: "ct_mark", accessorKey: "ct_mark" },
    { header: "attendance_mark", accessorKey: "attendance_mark" },
  ];

  return (
    <div className="w-full grid place-items-center pb-2">
      <BasicTable className="w-[60%]" data={data || []} columns={columns} />
    </div>
  );
}

async function getCatm(
  exam_id: string,
  course_id: string,
): Promise<catmTableDataType[]> {
  return await axios
    .get(import.meta.env.VITE_API_URL + `/catm-mark/${exam_id}/${course_id}`)
    .then((res) => res.data);
}
