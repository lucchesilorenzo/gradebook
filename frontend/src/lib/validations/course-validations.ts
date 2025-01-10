import { z } from "zod";

export const courseMaterialsFormSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, "Title is required.")
      .max(10, "Title is too long."),
    description: z.string().trim().max(15, "Type is too long."),
    type: z.string().min(1, "Type is required."),
    file: z.string(),
    url: z.string(),
  })
  .refine((data) => data.type !== "pdf", {
    message: "File is required.",
    path: ["file"],
  })
  .refine((data) => data.type !== "video" && data.type !== "link", {
    message: "URL is required.",
    path: ["url"],
  });

export type TCourseMaterialsFormData = z.infer<
  typeof courseMaterialsFormSchema
>;
