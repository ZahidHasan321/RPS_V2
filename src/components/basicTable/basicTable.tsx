import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import "../../index.css";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type BasicTableProps<T extends object> = {
  data: T[];
  columns: ColumnDef<T>[];
  className?: string;
  loading?: boolean;
};

const BasicTable = <T extends object>({
  data,
  columns,
  className,
  loading,
}: BasicTableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    enableColumnResizing: true,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
  });

  //TODO: Design the table accordingly
  return (
    <div className={cn("rounded-lg border", className)}>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header, idx) => {
                return (
                  <TableHead
                    key={header.id}
                    className={`relative ${headerGroup.headers.length - 1 !== idx ? "border-r" : ""} bg-gray-100 font-bold text-black text-base`}
                    style={{ width: `${header.getSize()}px` }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    <div
                      onDoubleClick={() => header.column.resetSize()}
                      onMouseDown={header.getResizeHandler()}
                      className={`
                    absolute 
                    top-0 
                    right-0 
                    bg-gray-400 
                    w-1 
                    h-full 
                    cursor-col-resize 
                    select-none 
                    opacity-0
                    rounded-lg
                    hover:opacity-100
                    ${header.column.getIsResizing() && "bg-black opacity-100"}
                    `}
                    />
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {!loading && table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 border-2 text-center text-2xl"
              >
                {loading ? (
                  <Loader2 size={32} className="animate-spin" />
                ) : (
                  "No results"
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default BasicTable;
