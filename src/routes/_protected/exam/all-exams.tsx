import BasicTable from "@/components/basicTable/basicTable";
import useAuth from "@/hooks/auth";
import secureAxios from "@/lib/interceptor";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/_protected/exam/all-exams")({
  component: AllExams,
});

function AllExams() {
  const { user } = useAuth();
  const { data: exams, isLoading } = useQuery({
    queryKey: ["assigned_exams", "all_exams", user?.teacher_id],
    queryFn: () => getAssignedExams(user?.teacher_id),
  });

  if (isLoading)
    return (
      <div className="flex flex-row items-start justify-center">
        <Loader2 size={32} />
      </div>
    );

  const columns: ColumnDef<Exam>[] = [
    {
      accessorKey: "exam_id",
      header: "Exam ID",
    },
    {
      accessorKey: "role",
      header: "Role",
    },
    {
      accessorKey: "formation_date",
      header: "Formation Date",
    },
    {
      accessorKey: "semester",
      header: "Semester",
    },
    {
      accessorKey: "exam_name",
      header: "Exam Name",
    },
    {
      accessorKey: "exam_session",
      header: "Exam Session",
    },
    {
      accessorKey: "total_courses",
      header: "Total Courses",
    },
    {
      accessorKey: "completed_courses",
      header: "Completed Courses",
    },
    {
      header: "Action",
      cell: (info) => {
        return (
          <Link
            to={"/exam/$exam_id"}
            params={{
              exam_id: info.row.original.exam_id.toString(),
            }}
            className="font-medium transition-colors text-blue-400 hover:text-blue-600 visited:text-blue-800"
          >
            see more
          </Link>
        );
      },
    },
  ];

  return (
    <div className="m-20">
      <BasicTable columns={columns} data={exams || []} />
    </div>
  );
}

type Exam = {
  exam_id: number;
  teacher_id: number;
  role: string;
  formation_date: string;
  semester: number;
  exam_name: string;
  exam_session: string;
  total_courses: number;
  completed_courses: number;
};

async function getAssignedExams(
  teacher_id: number | undefined,
): Promise<Exam[]> {
  if (!teacher_id) return [];
  const data = await secureAxios
    .get(`/exam-committee/${teacher_id}/assigned-exams`)
    .then((res) => res.data);

  return data;
}
