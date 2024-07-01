import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";
import BasicTable from "../basicTable/basicTable";

type Paper = {
  id: number;
  course_code: string;
  course_name: string;
  course_type: string;
  session: string;
  semester: number;
};

const papers = [
  {
    id: 1,
    course_code: "CSE 613",
    course_name: "Artificial Intelligence",
    course_type: "Theroy",
    session: "2022-23",
    semester: 6,
  },
  {
    id: 2,
    course_code: "CSE 514",
    course_name: "Networking",
    course_type: "Lab",
    session: "2022-23",
    semester: 5,
  },
  {
    id: 3,
    course_code: "CSE 614",
    course_name: "Computer interface",
    course_type: "Theroy",
    session: "2022-23",
    semester: 6,
  },
];

const columns: ColumnDef<Paper>[] = [
  {
    header: "Course Code",
    accessorKey: "course_code",
    cell: (info) => info.getValue(),
  },
  {
    header: "Course Name",
    accessorKey: "course_name",
    cell: (info) => info.getValue(),
  },
  {
    header: "Course Type",
    accessorKey: "course_type",
    cell: (info) => info.getValue(),
  },
  {
    header: "Session",
    accessorKey: "session",
    cell: (info) => info.getValue(),
  },
  {
    header: "Action",
    cell: (info) => {
      return (
        <Link
          to={info.row.original.course_code}
          className="font-medium transition-colors text-blue-400 hover:text-blue-600 visited:text-blue-800"
        >
          See info
        </Link>
      );
    },
  },
];

const Papers = ({ className }: { className?: string }) => {
  return (
    <div className={cn(className)}>
      <h1 className="font-semibold mb-10">Assigned Papers</h1>
      <BasicTable data={papers} columns={columns} />
    </div>
  );
};

export default Papers;
