import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import FormDialog from "@/components/common/FormDialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";
import { useState } from "react";
import TablePagination from "../ui/TablePagination";
import { format } from "date-fns";

type StudentRegisterTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
};

export default function StudentRegisterTable<TData, TValue>({
  columns,
  data,
}: StudentRegisterTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});

  const isAnyRowSelected = Object.keys(rowSelection).length > 0;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  const attendanceData = table.getCoreRowModel().rows.map((row) => ({
    ...row.original,
    status: row.getIsSelected(),
    date: format(new Date(), "yyyy-MM-dd"),
    start_time: format(new Date(), "HH:mm"),
  }));

  return (
    <div className="space-y-4">
      <FormDialog attendanceData={attendanceData}>
        <Button disabled={!isAnyRowSelected}>
          <Plus /> Confirm attendance
        </Button>
      </FormDialog>
      <div>
        <Table>
          <TableHeader className="bg-zinc-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <TablePagination table={table} />
    </div>
  );
}
