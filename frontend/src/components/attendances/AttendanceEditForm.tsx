import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { LoadingButton } from "../common/LoadingButton";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUpdateAttendance } from "@/hooks/mutations/attendances/useUpdateAttendance";
import { StudentRegisterData } from "@/types";
import {
  TAttendanceEditFormSchema,
  attendanceEditFormSchema,
} from "@/validations/attendance-validations";

type AttendanceEditFormProps = {
  onFormSubmit: () => void;
  student: StudentRegisterData;
};

export default function AttendanceEditForm({
  onFormSubmit,
  student,
}: AttendanceEditFormProps) {
  const { mutateAsync: updateAttendance } = useUpdateAttendance();
  const form = useForm({
    resolver: zodResolver(attendanceEditFormSchema),
    defaultValues: {
      attendance_type: "",
      time: "",
    },
  });

  async function onSubmit(data: TAttendanceEditFormSchema) {
    await updateAttendance({
      data,
      student_id: student.id,
      course_id: student.course_id,
      course_unit_id: student.course_unit_id,
    });

    onFormSubmit();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="attendance_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Attendance Type</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select attendance type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="early_departure">
                    Early Departure
                  </SelectItem>
                  <SelectItem value="late_arrival">Late Arrival</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem className="w-[120px]">
              <FormLabel>Time</FormLabel>
              <FormControl>
                <Input type="time" min="09:00" max="18:00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton
          type="submit"
          className="w-full"
          isLoading={form.formState.isSubmitting}
        >
          Submit Attendance
        </LoadingButton>
      </form>
    </Form>
  );
}
