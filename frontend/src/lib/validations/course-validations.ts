import { z } from "zod";

export const courseMaterialsFormSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, "Title is required.")
      .max(20, "Title is too long."),
    description: z.string().trim().max(40, "Description is too long."),
    type: z.string().min(1, "Type is required."),
    file: z.instanceof(File).optional(),
    url: z.string().trim().optional(),
  })
  .refine((data) => data.type !== "PDF" || data.file, {
    message: "File is required.",
    path: ["file"],
  })
  .refine(
    (data) => (data.type !== "VIDEO" && data.type !== "LINK") || data.url,
    {
      message: "URL is required.",
      path: ["url"],
    },
  );

export type TCourseMaterialsFormSchema = z.infer<
  typeof courseMaterialsFormSchema
>;
