import { z } from "zod";

export const envSchema = z.object({
  VITE_APP_NAME: z.string(),
  VITE_APP_DESCRIPTION: z.string(),
  VITE_BASE_URL: z.string().url(),
});

const env = envSchema.parse(import.meta.env);

export default env;
