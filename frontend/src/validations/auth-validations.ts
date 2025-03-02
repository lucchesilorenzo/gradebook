import { z } from "zod";

export const logInFormSchema = z.object({
  email: z
    .string()
    .trim()
    .email({
      message: "Invalid email address.",
    })
    .max(30, "Email is too long."),
  password: z
    .string()
    .trim()
    .min(1, "Password is required.")
    .max(30, "Password is too long."),
});

export type TLogInFormSchema = z.infer<typeof logInFormSchema>;
