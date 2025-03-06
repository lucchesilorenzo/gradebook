import { ColumnDef } from "@tanstack/react-table";

import GradeCell from "@/components/courses/units/assignments/grades/GradeCell";
import NotesCell from "@/components/courses/units/assignments/grades/NotesCell";
import { AssignmentTable } from "@/types";

export const columns: ColumnDef<AssignmentTable>[] = [
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
    accessorKey: "grade",
    id: "grade",
    header: "Grade",
    cell: ({ row }) => {
      const grade = row.original.pivot.grade;

      return (
        <div className="w-[150px]">
          {grade ?? (
            <GradeCell
              grade={grade}
              assignmentId={row.original.pivot.assignment_id}
              studentId={row.original.pivot.student_id}
            />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "notes",
    id: "notes",
    header: "Notes",
    cell: ({ row }) => {
      const notes = row.original.pivot.notes;

      return (
        <div className="w-[150px]">
          {notes ?? (
            <NotesCell
              notes={notes}
              assignmentId={row.original.pivot.assignment_id}
              studentId={row.original.pivot.student_id}
            />
          )}
        </div>
      );
    },
  },
];
