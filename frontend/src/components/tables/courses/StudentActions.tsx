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
import { StudentWithCourseAndUnit } from "@/lib/types";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";

type StudentActionsProps = {
  student: StudentWithCourseAndUnit;
};

export default function StudentActions({ student }: StudentActionsProps) {
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
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setIsOpen(!isOpen)}>
            Attendance
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <FormDialog open={isOpen} setOpen={setIsOpen} student={student} />
    </>
  );
}
