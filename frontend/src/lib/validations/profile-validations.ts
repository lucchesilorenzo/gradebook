import { z } from "zod";

export const profileFormSchema = z.object({
  email: z.string().trim().email({
    message: "Invalid email address.",
  }),
  phone_number: z.string().trim().max(20, "Phone number is too long."),
  address: z.string().trim().max(40, "Address is too long."),
});

export type TProfileFormSchema = z.infer<typeof profileFormSchema>;
