import { z } from "zod";

export const toDoListFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required.")
    .max(20, "Title is too long."),
});

export type TToDoListFormSchema = z.infer<typeof toDoListFormSchema>;
