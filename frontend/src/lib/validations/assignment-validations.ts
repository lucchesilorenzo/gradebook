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

export const gradeCellFormSchema = z.object({
  grade: z.coerce
    .number({
      invalid_type_error: "Grade must be a number.",
    })
    .min(40, "Grade must be between 40 and 100.")
    .max(100, "Grade must be between 40 and 100."),
});

export const notesCellFormSchema = z.object({
  notes: z.string().trim().max(200, "Notes is too long."),
});

export type TAssignmentFormSchema = z.infer<typeof assignmentFormSchema>;
export type TAssignmentGradeFormSchema = z.infer<typeof gradeCellFormSchema>;
export type TAssignmentNotesFormSchema = z.infer<typeof notesCellFormSchema>;
