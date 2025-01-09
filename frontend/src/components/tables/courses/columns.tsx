import { Checkbox } from "@/components/ui/checkbox";
import { StudentRegisterData } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { Annoyed, Clock, IdCard, Mail, Smile } from "lucide-react";
import StudentActions from "./StudentActions";

export const columns: ColumnDef<StudentRegisterData>[] = [
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
    accessorKey: "full_name",
    id: "full_name",
    header: "Name",
    cell: ({ row }) => {
      const firstName = row.original.first_name;
      const lastName = row.original.last_name;

      return (
        <div className="w-[150px] font-medium uppercase">{`${firstName} ${lastName}`}</div>
      );
    },
  },
  {
    accessorKey: "tax_id",
    id: "tax_id",
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
      const email: StudentRegisterData["email"] = row.getValue("email");

      return (
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <span>{email}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    id: "status",
    header: "Status",
    cell: ({ row }) => {
      const status: StudentRegisterData["status"] = row.getValue("status");
      const statusEmoji =
        status === "PRESENT" ? (
          <Smile className="h-4 w-4 text-muted-foreground" />
        ) : (
          <Annoyed className="h-4 w-4 text-muted-foreground" />
        );

      return (
        <div className="flex items-center gap-2">
          {(status && statusEmoji) ?? null}
          <span className="font-medium">{status ?? "N/A"}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "attendance_rate",
    id: "attendance_rate",
    header: "Attendance",
    cell: ({ row }) => {
      const attendanceRate: StudentRegisterData["attendance_rate"] =
        row.getValue("attendance_rate");

      return (
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>{attendanceRate}%</span>
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

      return <StudentActions student={student} />;
    },
  },
];
