import { z } from "zod";

export const userSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .max(20, "Username is too long"),
  email: z
    .string()
    .email()
    .min(1, "Email is required")
    .max(255, "Email is too long"),
  password: z
    .string()
    .min(8, "Password is too short")
    .max(60, "Password is too long"),
});
