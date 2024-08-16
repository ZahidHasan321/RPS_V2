import { getExamSessions } from "@/common_queries/session";
import BasicTable from "@/components/basicTable/basicTable";
import Combobox from "@/components/combobox/combobox";
import CreateExamCommittee from "@/components/modals/createExamCommittee";
import { programs } from "@/constants/programs";
import secureAxios from "@/lib/interceptor";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";
import { Suspense, useState } from "react";

type CommitteeMemberDataType = {
  exam_id: number;
  department_id: number;
  academic_session_id: number;
  exam_name: string;
  exam_centre: string;
  exam_session: string;
  exam_start_date: string; // Assuming it's always a date string in ISO format
  exam_end_date: string | null;
  is_result_submitted: number;
  result_submit_date: string | null;
  teacher_id: number;
  role: string;
  formation_date: string;
  user_id: string;
  title: string;
  designation: string;
  area_of_interest: string;
  department_name: string;
  university_id: number;
  faculty: string;
  undergrad_semester_no: number;
  grad_semester_no: number;
  department_abbr: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
};

const columns: ColumnDef<CommitteeMemberDataType>[] = [
  {
    header: "Id",
    accessorKey: "teacher_id",
    cell: (info) => info.getValue(),
  },
  {
    header: "Name",
    cell: (info) => info.getValue(),
    accessorFn: (row) =>
      `${row.designation} ${row.first_name} ${row.last_name}`,
  },
  {
    header: "Role",
    accessorKey: "role",
    cell: (info) => info.getValue(),
  },
  {
    header: "Email",
    accessorKey: "email",
    cell: (info) => info.getValue(),
  },
  {
    header: "Contact",
    accessorKey: "phone",
    cell: (info) => info.getValue(),
  },
  {
    header: "Department",
    accessorKey: "department_name",
    cell: (info) => info.getValue(),
  },
];

async function getExamCommitteeData(
  session: string,
  semester: string,
): Promise<CommitteeMemberDataType[]> {
  const MemberData = await secureAxios
    .get(`/exam-committee/${session}/${semester}`)
    .then((res) => res.data);
  return MemberData;
}

const Home = () => {
  const [program, setProgram] = useState("");
  const [session, setSession] = useState("");
  const [semester, setSemester] = useState("");

  const { data: CommitteeData } = useQuery({
    queryKey: ["committeeMembers", session, semester, program],
    queryFn: () => getExamCommitteeData(session, semester),
    enabled: session !== "" && semester !== "" && program !== "",
  });

  const { data: academicSessionData, isLoading } = useQuery({
    queryKey: ["AssignedAcademicSession", program],
    queryFn: () => getExamSessions(program, 1),
    enabled: program !== "",
  });

  return (
    <div className="h-screen w-full flex flex-col p-10">
      <div className="flex my-10 gap-10">
        <div>
          <div className="text-sm font-medium text-slate-700">
            Choose a program
          </div>
          <Combobox
            frameworks={programs}
            setData={setProgram}
            placeholder="Search program...."
            label="Select program"
          />
        </div>
        <div>
          <div className="text-sm font-medium text-slate-700">
            Choose a session
          </div>
          <Combobox
            disabled={program === "" || program === undefined}
            frameworks={academicSessionData?.sessions || []}
            setData={setSession}
            placeholder="Search session...."
            label="Select session"
          />
        </div>
        <div>
          <div className="text-sm font-medium text-slate-700">
            Choose a semester
          </div>
          <Combobox
            frameworks={academicSessionData?.semesters.get(session) || []}
            disabled={session === "" ? true : false}
            setData={setSemester}
            placeholder="Search semester...."
            label="Select semester"
          />
        </div>
        <div className="ml-auto">
          <CreateExamCommittee />
        </div>
      </div>

      <div>
        <Suspense fallback={<p>Loading</p>}>
          <BasicTable
            data={CommitteeData || []}
            columns={columns}
            loading={isLoading}
          />
        </Suspense>
      </div>
    </div>
  );
};

export const Route = createLazyFileRoute("/_protected/admin/")({
  component: Home,
});
