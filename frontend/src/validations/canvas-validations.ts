import { z } from "zod";

export const deskFormSchema = z.object({
  student_name: z
    .string()
    .trim()
    .min(1, "Student name is required.")
    .max(40, "Student name is too long."),
});

export type TDeskFormSchema = z.infer<typeof deskFormSchema>;
