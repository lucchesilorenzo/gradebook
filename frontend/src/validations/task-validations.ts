import { z } from "zod";

export const taskFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required.")
    .max(40, "Title is too long."),
});

export type TTaskFormSchema = z.infer<typeof taskFormSchema>;
