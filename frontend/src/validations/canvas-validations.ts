import { z } from "zod";

import { CANVAS_HEIGHT, CANVAS_WIDTH } from "@/lib/constants";

export const deskFormSchema = z.object({
  student_id: z
    .string()
    .trim()
    .min(1, "Student name is required.")
    .max(40, "Student name is too long."),
  x: z.coerce
    .number({
      invalid_type_error: "X position must be a number.",
    })
    .min(0, `X position must be between 0 and ${CANVAS_WIDTH}.`)
    .max(CANVAS_WIDTH, `X position must be between 0 and ${CANVAS_WIDTH}.`),
  y: z.coerce
    .number({
      invalid_type_error: "Y position must be a number.",
    })
    .min(0, `Y position must be between 0 and ${CANVAS_HEIGHT}.`)
    .max(CANVAS_HEIGHT, `Y position must be between 0 and ${CANVAS_HEIGHT}.`),
});

export type TDeskFormSchema = z.infer<typeof deskFormSchema>;
