import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";
import BasicTable from "../../basicTable/basicTable";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { PaperData } from "@/type";
import useAuth from "@/hooks/auth";

const columns: ColumnDef<PaperData>[] = [
  {
    header: "Course Code",
    accessorKey: "course_code",
    cell: (info) => info.getValue(),
  },
  {
    header: "Course Name",
    accessorKey: "course_title",
    cell: (info) => info.getValue(),
  },
  {
    header: "Session",
    accessorKey: "exam_session",
    cell: (info) => info.getValue(),
  },
  {
    header: "Semester",
    accessorKey: "semester",
    cell: (info) => info.getValue(),
  },
  {
    header: "Set",
    accessorKey: "set",
    cell: (info) => info.getValue(),
  },
  {
    header: "Course Type",
    accessorKey: "course_type",
    cell: (info) => info.getValue(),
  },
  {
    header: "Department",
    accessorKey: "department_name",
    cell: (info) => info.getValue(),
  },
  {
    header: "Action",
    cell: (info) => {
      return (
        <Link
          to={"/examiner/$exam_id/$course_id/$set"}
          params={{
            exam_id: info.row.original.exam_id.toString(),
            course_id: info.row.original.course_id.toString(),
            set: info.row.original.set,
          }}
          className="font-medium transition-colors text-blue-400 hover:text-blue-600 visited:text-blue-800"
        >
          Fill Paper
        </Link>
      );
    },
  },
];

async function getAssignedPapers(teacher_id: number): Promise<PaperData[]> {
  const data = await axios
    .get(import.meta.env.VITE_API_URL + "/examiner", {
      params: {
        teacher_id: teacher_id,
        is_submitted: 0,
      },
    })
    .then((res) => res.data);
  return data;
}

const Papers = ({ className }: { className?: string }) => {
  const { user } = useAuth();

  const { data: papers, isLoading } = useQuery({
    queryKey: ["assigned_papers", user.teacher_id],
    queryFn: () => getAssignedPapers(user.teacher_id),
  });

  return (
    <div className={cn(className)}>
      <h1 className="font-semibold text-3xl mb-10">Assigned Papers</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <BasicTable data={papers || []} columns={columns} loading={isLoading} />
      </Suspense>
    </div>
  );
};

export default Papers;
