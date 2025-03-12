import { z } from "zod";

import { CANVAS_HEIGHT, CANVAS_WIDTH } from "@/lib/constants";

export const deskFormSchema = z.object({
  student_id: z.string().min(1, "Student name is required."),
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

export const drawingToolsFormSchema = z.object({
  name: z.string().min(1, "Tool name is required."),
  color: z.string().min(1, "Color is required."),
  size: z.coerce
    .number({
      invalid_type_error: "Size must be a number.",
    })
    .min(1, "Size must be between 1 and 20.")
    .max(20, "Size must be between 1 and 20."),
});

export type TDeskFormSchema = z.infer<typeof deskFormSchema>;
export type TDrawingToolsFormSchema = z.infer<typeof drawingToolsFormSchema>;
