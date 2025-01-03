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
import { format } from "date-fns";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";

type FormDialogProps<T> = {
  children: React.ReactNode;
  attendanceData: T;
};

export default function FormDialog<T>({
  children,
  attendanceData,
}: FormDialogProps<T>) {
  const { mutateAsync: createAttendances } = useCreateAttendances();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  async function handleCreateAttendances() {
    await createAttendances(attendanceData);
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl uppercase">
            Confirm attendance
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="mt-1 flex items-center gap-2">
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
          <AlertDialogAction onClick={handleCreateAttendances}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
