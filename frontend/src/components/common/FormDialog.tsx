import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { StudentRegisterData } from "@/lib/types";
import { useState } from "react";
import AttendanceEditForm from "../attendances/AttendanceEditForm";
import CourseMaterialsForm from "../courses/CourseMaterialsForm";

type FormDialogProps = {
  children?: React.ReactNode;
  actionType: "attendance" | "course-materials";
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  student?: StudentRegisterData;
};

export default function FormDialog({
  children,
  actionType,
  open,
  setOpen,
  student,
}: FormDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = open ?? internalOpen;
  const setIsOpen = setOpen ?? setInternalOpen;

  function handleFormSubmit() {
    setIsOpen(!open);
  }

  if (actionType === "attendance" && student) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {student.first_name} {student.last_name}
            </DialogTitle>
            <DialogDescription>
              Attendance: {student.attendance_rate}%
            </DialogDescription>
          </DialogHeader>
          <AttendanceEditForm
            onFormSubmit={handleFormSubmit}
            student={student}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Material</DialogTitle>
          <DialogDescription>
            Add a new material to this course unit.
          </DialogDescription>
        </DialogHeader>
        {actionType === "course-materials" && (
          <CourseMaterialsForm onFormSubmit={handleFormSubmit} />
        )}
      </DialogContent>
    </Dialog>
  );
}
