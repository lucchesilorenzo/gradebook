import MainAlertDialog from "@/components/common/MainAlertDialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import TablePagination from "../../../ui/TablePagination";

type StudentRegisterTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  courseSlug: string;
  courseUnitSlug: string;
};

export default function StudentRegisterTable<TData, TValue>({
  columns,
  data,
  courseSlug,
  courseUnitSlug,
}: StudentRegisterTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

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

  // Start lesson
  const attendanceStart = table.getCoreRowModel().rows.map((row) => ({
    ...row.original, // Taking ID only
    status: row.getIsSelected(),
    date: format(currentTime, "yyyy-MM-dd"),
    start_time: format(currentTime, "HH:mm"),
  }));

  // End lesson
  const attendanceEnd = {
    course_slug: courseSlug,
    course_unit_slug: courseUnitSlug,
    end_time: format(currentTime, "HH:mm"),
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <MainAlertDialog
          type="start"
          attendanceStart={attendanceStart}
          currentTime={currentTime}
        >
          <Button size="responsive">
            <Plus /> Confirm start lesson
          </Button>
        </MainAlertDialog>

        <MainAlertDialog
          type="end"
          attendanceEnd={attendanceEnd}
          currentTime={currentTime}
        >
          <Button size="responsive">
            <Plus /> Confirm end lesson
          </Button>
        </MainAlertDialog>
      </div>

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
