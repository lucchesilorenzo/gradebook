import { z } from "zod";

export const AttendanceEditFormSchema = z.object({
  attendance_type: z.string().min(1, "Attendance type is required."),
  time: z.string().min(1, "Time is required."),
});

export type TAttendanceEditFormSchema = z.infer<
  typeof AttendanceEditFormSchema
>;
