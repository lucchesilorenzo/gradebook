import { Checkbox } from "@/components/ui/checkbox";
import { Student } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { Clock, IdCard, Mail } from "lucide-react";

export const columns: ColumnDef<Student>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "fullName",
    id: "fullName",
    header: "Name",
    cell: ({ row }) => {
      const firstName = row.original.first_name;
      const lastName = row.original.last_name;

      return (
        <div className="font-medium uppercase">{`${firstName} ${lastName}`}</div>
      );
    },
  },
  {
    accessorKey: "taxId",
    id: "taxId",
    header: "Tax ID",
    cell: ({ row }) => {
      const taxId = row.original.tax_id;

      return (
        <div className="flex items-center gap-2">
          <IdCard className="h-4 w-4 text-muted-foreground" />
          <span>{taxId}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    id: "email",
    header: "Email",
    cell: ({ row }) => {
      const email: Student["email"] = row.getValue("email");

      return (
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <span>{email}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "Attendance",
    id: "attendance",
    header: "Attendance",
    cell: ({ row }) => {
      // TODO: Get attendance rate
      const attendanceRate = 5;

      return (
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>{attendanceRate}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      // TODO: Create actions for early departures / late arrivals
      const student = row.original;

      return <div className="flex items-center gap-2">X</div>;
    },
  },
];
