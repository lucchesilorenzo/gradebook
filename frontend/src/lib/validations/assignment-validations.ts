import { z } from "zod";

export const assignmentFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required.")
    .max(40, "Title is too long."),
  description: z
    .string()
    .trim()
    .min(1, "Description is required.")
    .max(150, "Description is too long."),
  deadline: z.string().min(1, "Deadline is required."),
});

export type TAssignmentFormSchema = z.infer<typeof assignmentFormSchema>;
