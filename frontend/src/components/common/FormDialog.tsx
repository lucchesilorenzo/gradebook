import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StudentWithCourseUnit } from "@/lib/types";
import StudentEditForm from "../courses/StudentEditForm";

type FormDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  student: StudentWithCourseUnit;
};

export default function FormDialog({
  open,
  setOpen,
  student,
}: FormDialogProps) {
  function handleFormSubmit() {
    setOpen(!open);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {student.first_name} {student.last_name}
          </DialogTitle>
          <DialogDescription>
            Attendance: {student.attendance_rate}%
          </DialogDescription>
        </DialogHeader>
        <StudentEditForm onFormSubmit={handleFormSubmit} student={student} />
      </DialogContent>
    </Dialog>
  );
}
