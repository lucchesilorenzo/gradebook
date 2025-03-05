import { StudentWithGrades } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<StudentWithGrades["grades"][number]>[] = [
  {
    accessorKey: "assignment",
    id: "assignment",
    header: "Assignment",
    cell: ({ row }) => {
      const assignmentTitle = row.original.title;

      return <div className="w-[150px] font-semibold">{assignmentTitle}</div>;
    },
  },
  {
    accessorKey: "grade",
    id: "grade",
    header: "Grade",
    cell: ({ row }) => {
      const grade = row.original.grade;

      return <div className="w-[150px]">{grade}</div>;
    },
  },
  {
    accessorKey: "notes",
    id: "notes",
    header: "Notes",
    cell: ({ row }) => {
      const notes = row.original.notes;

      return <div className="w-[150px]">{notes || "N/A"}</div>;
    },
  },
  {
    accessorKey: "date",
    id: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = row.original.date;

      return (
        <div className="w-[150px]">
          {new Date(date).toLocaleDateString("it-IT")}
        </div>
      );
    },
  },
];
