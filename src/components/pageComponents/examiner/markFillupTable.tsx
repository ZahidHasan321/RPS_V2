import SimpleTable from "@/components/basicTable/simpleTable";
import { Button } from "@/components/ui/button";
import { PaperTableColumns } from "@/constants/paperTableColumn";
import secureAxios from "@/lib/interceptor";
import { PaperMark } from "@/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

const defaultColumn: Partial<ColumnDef<PaperMark>> = {
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
    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    return (
      <input
        className="w-full p-2 bg-transparent border border-gray-300 rounded"
        value={(value as number) || ""}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
      />
    );
  },
};

const emptyCell = {
  paper_code: null,
  q1: null,
  q2: null,
  q3: null,
  q4: null,
  q5: null,
  q6: null,
  q7: null,
  q8: null,
  q9: null,
  q10: null,
  q11: null,
  q12: null,
  q13: null,
  q14: null,
  q15: null,
};

export default function MarkFillupTable({
  exam_id,
  course_id,
  set,
}: {
  exam_id: string;
  course_id: string;
  set: string;
}) {
  const [data, setData] = useState<PaperMark[]>([emptyCell]);
  const queryClient = useQueryClient();
  const fillupMarkMutation = useMutation({
    mutationFn: () => fillupMark(exam_id, course_id, set, data),
    onSuccess(data) {
      toast(data.message);
      queryClient.invalidateQueries({
        queryKey: ["Paper", exam_id, course_id, set],
      });
    },
    onError: (error) => {
      toast("Unable to fillup marks", {
        description: error.message,
      });
    },
  });

  const table = useReactTable({
    data,
    columns: PaperTableColumns,
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
    <div className="flex flex-col gap-4">
      <div className="w-full flex flex-col gap-2 border p-2">
        <SimpleTable table={table} />
        <Button
          className="self-end gap-2"
          onClick={() => setData([...data, emptyCell])}
        >
          {<Plus />}Add Row
        </Button>
      </div>
      <Button
        disabled={fillupMarkMutation.status === "pending"}
        size={"lg"}
        className="self-end text-lg bg-green-500"
        onClick={() => fillupMarkMutation.mutate()}
      >
        Submit
      </Button>
    </div>
  );
}

type questionMarkListItem = {
  paper_code: number;
  q_no: string;
  q_mark: number;
};

async function fillupMark(
  exam_id: string,
  course_id: string,
  set: string,
  data: PaperMark[],
) {
  const questionMarkList: questionMarkListItem[] = [];

  data.map((item) => {
    let paper_code: number;

    Object.entries(item).forEach(([key, value]) => {
      if (key === "paper_code") {
        if (value === null) return;
        paper_code = value;
      } else if (key !== "paper_code" && value !== null) {
        questionMarkList.push({
          paper_code: paper_code,
          q_no: key,
          q_mark: value,
        });
      }
    });
  });

  return await secureAxios
    .post("/question-mark", {
      exam_id: exam_id,
      course_id: course_id,
      set: set,
      questionMarkList,
    })
    .then((res) => res.data);
}
