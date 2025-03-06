import { format } from "date-fns";
import { Clock } from "lucide-react";

import { Badge } from "../ui/badge";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useCreateAttendances } from "@/hooks/mutations/attendances/useCreateAttendances";
import { useUpdateEndTime } from "@/hooks/mutations/attendances/useUpdateEndTime";

type MainAlertDialogProps<T> = {
  children: React.ReactNode;
  attendanceStart?: T;
  attendanceEnd?: {
    course_slug: string;
    course_unit_slug: string;
    end_time: string;
  };
  type: "start" | "end";
  currentTime: Date;
};

export default function MainAlertDialog<T>({
  children,
  attendanceStart,
  attendanceEnd,
  type,
  currentTime,
}: MainAlertDialogProps<T>) {
  const { mutateAsync: createAttendances } = useCreateAttendances();
  const { mutateAsync: updateEndTime } = useUpdateEndTime();

  async function handleAttendances() {
    if (type === "start" && attendanceStart) {
      await createAttendances(attendanceStart);
    } else if (type === "end" && attendanceEnd) {
      await updateEndTime(attendanceEnd);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="space-y-2">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl uppercase">
            Confirm attendance {type === "start" ? "(start)" : "(end)"}
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span className="text-lg font-semibold text-black">
                Current time:
              </span>
              <Badge className="px-3 py-1 text-lg">
                {format(currentTime, "HH:mm")}
              </Badge>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleAttendances}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
