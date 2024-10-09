import BasicTable from "@/components/basicTable/basicTable";
import useAuth from "@/hooks/auth";
import secureAxios from "@/lib/interceptor";
import { cn } from "@/lib/utils";
import { CatmItem } from "@/type";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";
import { Suspense } from "react";

type CatmsProps = {
  className?: string;
  is_catm_submitted?: number;
};

const Catms = ({ className, is_catm_submitted }: CatmsProps) => {
  const { user } = useAuth();

  const { data: catms, isLoading } = useQuery({
    queryKey: ["catms", user?.teacher_id, is_catm_submitted],
    queryFn: () => getCatms(user?.teacher_id, is_catm_submitted),
  });

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
      accessorKey: "exam_session",
    },
    {
      header: "Course Type",
      accessorKey: "course_type",
    },
    {
      header: "Action",
      cell: (info) => {
        if (!user) return null;
        return (
          <Link
            to="/catm/$teacher_id/$exam_id/$course_id"
            params={{
              teacher_id: user?.teacher_id!.toString(),
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
      <div className="flex flex-col gap-3">
        <Suspense fallback={<div>Loading...</div>}>
          <BasicTable
            data={catms || []}
            columns={columns}
            loading={isLoading}
          />
        </Suspense>
      </div>
    </div>
  );
};

async function getCatms(
  teacher_id: number | undefined,
  is_catm_submitted?: number,
): Promise<CatmItem[]> {
  if (!teacher_id) return [];

  const data = await secureAxios
    .get(`/course-teacher/${teacher_id}`, {
      params: {
        is_catm_submitted: is_catm_submitted,
      },
    })
    .then((res) => res.data);
  return data;
}

export default Catms;
