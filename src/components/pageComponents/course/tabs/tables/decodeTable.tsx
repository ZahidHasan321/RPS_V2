import SimpleTable from "@/components/basicTable/simpleTable";
import { Button } from "@/components/ui/button";
import secureAxios from "@/lib/interceptor";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ColumnDef,
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

type Student = {
  student_id: number;
  set_A: string | null;
  set_B: string | null;
};

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

const defaultColumn: Partial<ColumnDef<Student>> = {
  cell: function CellComponent({
    getValue,
    row: { index },
    column: { id },
    table,
  }) {
    const initialValue = getValue();
    // We need to keep and update the state of the cell normally
    const [value, setValue] = useState(initialValue);

    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = () => {
      table.options.meta?.updateData(index, id, value);
    };

    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    if (id === "student_id") return initialValue as string;

    return (
      <input
        className="w-full p-2 bg-transparent border border-gray-300 rounded"
        value={(value as string) || ""}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
      />
    );
  },
};

const columnHelper = createColumnHelper<Student>();

const columns = [
  columnHelper.accessor("student_id", {
    header: "Student ID",
  }),
  columnHelper.accessor("set_A", {
    header: "Set A",
  }),
  columnHelper.accessor("set_B", {
    header: "Set B",
  }),
];

const labColumns: ColumnDef<Student>[] = [
  {
    header: "Student ID",
    accessorKey: "student_id",
    cell: (info) => info.getValue(),
  },
  {
    header: "Set",
    accessorKey: "set_A",
    cell: (info) => info.getValue(),
  },
];

export default function DecodeTable({
  exam_id,
  course_id,
  course_type,
}: {
  exam_id: string;
  course_id: string;
  course_type: string;
}) {
  const {
    data: studentList,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["StudentList", exam_id, course_id],
    queryFn: () => getStudentList(exam_id, course_id),
    staleTime: Infinity,
  });

  const [data, setData] = useState<Student[]>(studentList || []);

  const table = useReactTable({
    data,
    columns: course_type === "Theory" ? columns : labColumns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),

    meta: {
      updateData: (rowIndex, columnId, value) => {
        setData((prev) =>
          prev.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...row,
                [columnId]: value,
              };
            }
            return row;
          }),
        );
      },
    },
  });

  const decodeMutate = useMutation({
    onError: (error) => {
      toast("Unable to decode data", {
        description: error.message,
      });
    },
    onSuccess(data) {
      toast(data.data.message);
      queryClient.invalidateQueries({ queryKey: ["DecodePage"] });
    },
    mutationFn: () => submitDecodedData(exam_id, course_id, data as Student[]),
  });

  useEffect(() => {
    if (isSuccess) setData(studentList);
  }, [studentList, isSuccess]);
  const queryClient = useQueryClient();

  if (isLoading) {
    return <Loader2 size={32} />;
  }

  return (
    <div className="w-full flex flex-col items-center pb-2 gap-4">
      <SimpleTable table={table} className="w-[60%]" />
      <Button
        size={"lg"}
        disabled={decodeMutate.status === "pending"}
        onClick={() => decodeMutate.mutate()}
      >
        {decodeMutate.status === "pending" ? <Loader2 size={32} /> : "Submit"}
      </Button>
    </div>
  );
}

type getStudentListResponseType = {
  student_id: number;
  student_status: "Improvement" | "Irregular" | "Regular";
};

async function getStudentList(
  exam_id: string,
  course_id: string,
): Promise<Student[]> {
  const data = await secureAxios
    .get(`/exam/${exam_id}/course/${course_id}`, {
      params: {
        limit: "all",
      },
    })
    .then((res) => res.data);

  const processedData = data.map((student: getStudentListResponseType) => {
    return {
      student_id: student.student_id,
      set_A: null,
      set_B: null,
    };
  });

  return processedData;
}

type ProcessedDataType = {
  student_id: number;
  set: "A" | "B";
  paper_code: number;
};

async function submitDecodedData(
  exam_id: string,
  course_id: string,
  data: Student[],
) {
  const processedData: ProcessedDataType[] = [];

  data.forEach((student) => {
    if (student.set_A !== null) {
      processedData.push({
        student_id: student.student_id,
        set: "A",
        paper_code: parseInt(student.set_A),
      });
    }
    if (student.set_B !== null) {
      processedData.push({
        student_id: student.student_id,
        set: "B",
        paper_code: parseInt(student.set_B),
      });
    }
  });

  return await secureAxios.post(`/total-papermark/decode`, {
    exam_id: parseInt(exam_id),
    course_id: parseInt(course_id),
    studentDecodeList: processedData,
  });
}
