import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CourseMaterial, StudentRegisterData } from "@/lib/types";
import { useState } from "react";
import AttendanceEditForm from "../attendances/AttendanceEditForm";
import CourseMaterialsForm from "../courses/CourseMaterialsForm";
import CourseMaterialsEditForm from "../courses/CourseMaterialsEditForm";

type FormDialogProps = {
  children?: React.ReactNode;
  actionType: "attendance" | "add-course-material" | "edit-course-material";
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  student?: StudentRegisterData;
  courseMaterial?: CourseMaterial;
};

export default function FormDialog({
  children,
  actionType,
  open,
  setOpen,
  student,
  courseMaterial,
}: FormDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = open ?? internalOpen;
  const setIsOpen = setOpen ?? setInternalOpen;

  function handleFormSubmit() {
    setIsOpen(false);
  }

  const formDialogMapping: Record<
    string,
    {
      title: string;
      description: string;
      component: React.ReactNode;
    }
  > = {
    "add-course-material": {
      title: "Add New Material",
      description: "Add a new material to this course unit.",
      component: <CourseMaterialsForm onFormSubmit={handleFormSubmit} />,
    },
    "edit-course-material": {
      title: "Edit Material",
      description: "Edit this course material.",
      component: (
        <CourseMaterialsEditForm
          onFormSubmit={handleFormSubmit}
          courseMaterial={courseMaterial!}
        />
      ),
    },
  };

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
          <DialogTitle>{formDialogMapping[actionType].title}</DialogTitle>
          <DialogDescription>
            {formDialogMapping[actionType].description}
          </DialogDescription>
        </DialogHeader>
        {formDialogMapping[actionType].component}
      </DialogContent>
    </Dialog>
  );
}
