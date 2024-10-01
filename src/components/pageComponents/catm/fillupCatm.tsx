import SimpleTable from "@/components/basicTable/simpleTable";
import { Button } from "@/components/ui/button";
import secureAxios from "@/lib/interceptor";
import { catmTableDataType } from "@/type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ColumnDef,
  getCoreRowModel,
  RowData,
  useReactTable,
} from "@tanstack/react-table";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

const defaultColumn: Partial<ColumnDef<catmTableDataType>> = {
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

const columns: ColumnDef<catmTableDataType>[] = [
  {
    header: "Student ID",
    accessorKey: "student_id",
  },
  { header: "ct_mark", accessorKey: "ct_mark" },
  { header: "attendance_mark", accessorKey: "attendance_mark" },
];

export default function FillupCatm({
  exam_id,
  course_id,
}: {
  exam_id: string;
  course_id: string;
}) {
  const {
    data: studentList,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["CatmStudentList", exam_id, course_id],
    queryFn: () => getStudentList(exam_id, course_id),
    staleTime: Infinity,
  });

  const queryClient = useQueryClient();
  const catmMutation = useMutation({
    mutationFn: () => postCatm(exam_id, course_id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["catm", exam_id, course_id] });
      toast("CATM Submitted successfully");
    },
    onError: (error) => {
      toast("Something went wrong", {
        description: "Please try again",
      });

      console.log(error);
    },
  });

  const [data, setData] = useState<catmTableDataType[]>(studentList || []);

  useEffect(() => {
    if (isSuccess) setData(studentList);
  }, [studentList, isSuccess]);

  const table = useReactTable({
    data: data,
    columns,
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

  return (
    <div className="w-full border p-2 grid place-items-center">
      <div className="flex flex-col justify-center items-center gap-4">
        <SimpleTable className="w-full" table={table} />
        <Button onClick={() => catmMutation.mutate()} className="self-end">
          Submit
        </Button>
      </div>
    </div>
  );
}

async function getStudentList(
  exam_id: string,
  course_id: string,
): Promise<catmTableDataType[]> {
  const data = await secureAxios
    .get(`/exam/${exam_id}/course/${course_id}`, {
      params: {
        limit: "all",
        student_status: "Regular",
      },
    })
    .then((res) => res.data);

  const processedData = data.map((student: { student_id: number }) => {
    return {
      student_id: student.student_id,
      ct_mark: null,
      attendance_mark: null,
    };
  });

  return processedData;
}
async function postCatm(
  exam_id: string,
  course_id: string,
  data: catmTableDataType[],
): Promise<unknown> {
  return await secureAxios
    .post(`/catm-mark/${exam_id}/${course_id}`, {
      catmList: data,
    })
    .then((res) => res.data);
}
