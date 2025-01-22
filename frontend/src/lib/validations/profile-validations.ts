import { z } from "zod";

export const profileFormSchema = z.object({
  email: z.string().trim().email({
    message: "Invalid email address.",
  }),
  phone_number: z.string().trim().max(20, "Phone number is too long."),
  address: z.string().trim().max(100, "Address is too long."),
});

export const profileUploadImageFormSchema = z.object({
  image: z.union([z.instanceof(File), z.string()]).nullable(),
});

// Types
export type TProfileFormSchema = z.infer<typeof profileFormSchema>;
export type TProfileUploadImageFormSchema = z.infer<
  typeof profileUploadImageFormSchema
>;
