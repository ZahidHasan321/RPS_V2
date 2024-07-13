import { flexRender, Table as TableType } from "@tanstack/react-table";

import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "../ui/table";
import { cn } from "@/lib/utils";

const SimpleTable = ({
  table,
  className,
}: {
  table: TableType<any>;
  className?: string;
}) => {
  return (
    <div className={cn("rounded-lg border", className)}>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header, idx) => (
                <TableHead
                  key={header.id}
                  className={`relative ${headerGroup.headers.length - 1 !== idx ? "border-r" : ""} bg-gray-100 font-bold text-black text-base`}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SimpleTable;
