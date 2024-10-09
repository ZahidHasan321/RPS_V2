import useAuth from "@/hooks/auth";
import secureAxios from "@/lib/interceptor";
import { cn } from "@/lib/utils";
import { PaperData } from "@/type";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";
import { Suspense } from "react";
import BasicTable from "../../basicTable/basicTable";

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

async function getAssignedPapers(
  teacher_id: number | undefined,
  is_submitted?: number,
): Promise<PaperData[]> {
  if (!teacher_id) return [];
  const data = await secureAxios
    .get("/examiner", {
      params: {
        teacher_id: teacher_id,
        is_submitted: is_submitted,
      },
    })
    .then((res) => res.data);
  return data;
}

const Papers = ({
  className,
  is_submitted,
}: {
  className?: string;
  is_submitted?: number;
}) => {
  const { user } = useAuth();

  const { data: papers, isLoading } = useQuery({
    queryKey: ["assigned_papers", user?.teacher_id],
    queryFn: () => getAssignedPapers(user?.teacher_id, is_submitted),
  });

  return (
    <div className={cn(className)}>
      <Suspense fallback={<div>Loading...</div>}>
        <BasicTable data={papers || []} columns={columns} loading={isLoading} />
      </Suspense>
    </div>
  );
};

export default Papers;
