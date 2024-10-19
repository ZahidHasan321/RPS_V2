import BasicTable from "@/components/basicTable/basicTable";
import secureAxios from "@/lib/interceptor";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import DecodeTable from "./tables/decodeTable";

const DecodeTab = ({
  exam_id,
  course_id,
  course_type,
}: {
  exam_id: string;
  course_id: string;
  course_type: string;
}) => {
  const { data: DecodeList, isLoading } = useQuery({
    queryKey: ["DecodePage", exam_id, course_id],
    queryFn: () => getDecodeList(exam_id, course_id),
  });

  const columns: ColumnDef<StudentDecodeList>[] = [
    {
      header: "Student ID",
      accessorKey: "student_id",
      cell: (info) => info.getValue(),
    },
    {
      header: "Set-A",
      accessorKey: "set_A",
      cell: (info) => info.getValue(),
    },
    {
      header: "Set-B",
      accessorKey: "set_B",
      cell: (info) => info.getValue(),
    },
  ];

  const LabColumns: ColumnDef<StudentDecodeList>[] = [
    {
      header: "Student ID",
      accessorKey: "student_id",
      cell: (info) => info.getValue(),
    },
    {
      header: "Set",
      accessorKey: "Set_A",
      cell: (info) => info.getValue(),
    },
  ];

  if (isLoading) return <div>Loading...</div>;
  if (!DecodeList) return <div>No Data found</div>;

  if (DecodeList.is_decoded === 0)
    return (
      <DecodeTable
        course_type={course_type}
        exam_id={exam_id}
        course_id={course_id}
      />
    );

  return (
    <div className="w-full grid place-items-center pb-2">
      <BasicTable
        className="w-[60%]"
        data={DecodeList.studentDecodeList}
        columns={course_type === "Theory" ? columns : labColumns}
      />
    </div>
  );
};

const columns: ColumnDef<StudentDecodeList>[] = [
  {
    header: "Student ID",
    accessorKey: "student_id",
    cell: (info) => info.getValue(),
  },
  {
    header: "Set-A",
    accessorKey: "set_A",
    cell: (info) => info.getValue(),
  },
  {
    header: "Set-B",
    accessorKey: "set_B",
    cell: (info) => info.getValue(),
  },
];

const labColumns: ColumnDef<StudentDecodeList>[] = [
  {
    header: "Student ID",
    accessorKey: "student_id",
    cell: (info) => info.getValue(),
  },
  {
    header: "Set-A",
    accessorKey: "set_A",
    cell: (info) => info.getValue(),
  },
];

type StudentDecodeList = {
  student_id: number;
  set_A: number | null;
  set_B: number | null;
};

type DecodeList = {
  exam_id: string;
  course_id: string;
  is_decoded: number;
  studentDecodeList: {
    student_id: number;
    set_A: number | null;
    set_B: number | null;
  }[];
};

async function getDecodeList(
  exam_id: string,
  course_id: string,
): Promise<DecodeList> {
  const data = await secureAxios
    .get(`/total-papermark/decode`, {
      params: {
        exam_id: exam_id,
        course_id: course_id,
      },
    })
    .then((res) => res.data);
  return data;
}

export default DecodeTab;
