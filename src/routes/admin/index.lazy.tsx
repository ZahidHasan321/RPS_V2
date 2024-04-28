import BasicTable from "@/components/basicTable/basicTable";
import Combobox from "@/components/combobox/combobox";
import CreateExamCommittee from "@/components/modals/createExamCommittee";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";
import { Suspense, useState } from "react";

const years = [
  {
    value: "2022",
    label: "2022",
  },

  {
    value: "2023",
    label: "2023",
  },
  {
    value: "2024",
    label: "2024",
  },
];

const semesters = new Map([
  [
    "2022",
    [
      {
        value: "1",
        label: "1st",
      },
      {
        value: "2",
        label: "2nd",
      },
      {
        value: "3",
        label: "3rd",
      },
    ],
  ],
]);

type Member = {
  id: number;
  name: string;
  role: "chairman" | "member" | "tabulator";
  contact: number;
};

const MemberData: Member[] = [
  {
    id: 1,
    name: "teacher1",
    role: "chairman",
    contact: 12345,
  },
  {
    id: 2,
    name: "teacher2",
    role: "tabulator",
    contact: 12345,
  },
  {
    id: 3,
    name: "teacher3",
    role: "member",
    contact: 12345,
  },
];

const columns: ColumnDef<Member>[] = [
  {
    header: "Id",
    accessorKey: "id",
    cell: (info) => info.getValue(),
  },
  {
    header: "Name",
    accessorKey: "name",
    cell: (info) => info.getValue(),
  },
  {
    header: "Role",
    accessorKey: "role",
    cell: (info) => info.getValue(),
  },
  {
    header: "Contact",
    accessorKey: "contact",
    cell: (info) => info.getValue(),
  },
];

const Home = () => {
  const [session, setSession] = useState("");
  const [semester, setSemester] = useState("");

  const { data: memberList } = useQuery({
    queryKey: ["committeeMembers", session, semester],
    queryFn: () => MemberData,
    enabled: session !== "" && semester !== "",
  });

  return (
    <div className="h-screen w-full flex flex-col">
      <div className="flex m-10 gap-10">
        <Combobox
          frameworks={years}
          setData={setSession}
          placeholder="Search session...."
          label="Select session"
        />
        <Combobox
          frameworks={semesters.get(session) || []}
          disabled={session === "" ? true : false}
          setData={setSemester}
          placeholder="Search semester...."
          label="Select semester"
        />
        <div className="ml-auto">
          <CreateExamCommittee />
        </div>
      </div>

      <div>
        <Suspense fallback={<p>Loading</p>}>
          {memberList ? (
            <BasicTable data={memberList} columns={columns} />
          ) : (
            <p>There is no data</p>
          )}
        </Suspense>
      </div>
    </div>
  );
};

export const Route = createLazyFileRoute("/admin/")({
  component: Home,
});
