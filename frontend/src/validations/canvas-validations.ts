import { z } from "zod";

import { CANVAS_HEIGHT, CANVAS_WIDTH } from "@/lib/constants";

export const deskFormSchema = z.object({
  student_id: z
    .string()
    .trim()
    .min(1, "Student name is required.")
    .max(40, "Student name is too long."),
  desk_position_x: z.coerce
    .number({
      invalid_type_error: "X position must be a number.",
    })
    .min(5, `X position must be between 5 and ${CANVAS_WIDTH - 5}.`)
    .max(
      CANVAS_WIDTH - 5,
      `X position must be between 5 and ${CANVAS_WIDTH - 5}.`,
    ),
  desk_position_y: z.coerce
    .number({
      invalid_type_error: "Y position must be a number.",
    })
    .min(5, `Y position must be between 5 and ${CANVAS_HEIGHT - 5}.`)
    .max(
      CANVAS_HEIGHT - 5,
      `Y position must be between 5 and ${CANVAS_HEIGHT - 5}.`,
    ),
});

export type TDeskFormSchema = z.infer<typeof deskFormSchema>;
