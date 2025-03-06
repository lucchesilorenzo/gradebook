import { useState } from "react";

import { EllipsisVertical } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import FormDialog from "@/components/common/FormDialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StudentRegisterData } from "@/types";

type StudentActionsProps = {
  student: StudentRegisterData;
};

export default function StudentActions({ student }: StudentActionsProps) {
  const { courseSlug, courseUnitSlug } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <span className="sr-only">Open menu</span>
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Student</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => setIsOpen(!isOpen)}>
            Attendances
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              to={`/courses/${courseSlug}/course-units/${courseUnitSlug}/students/${student.id}/grades`}
            >
              Grades
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <FormDialog
        actionType="attendance"
        open={isOpen}
        setOpen={setIsOpen}
        student={student}
      />
    </>
  );
}
