import { z } from "zod";

export const userSchema = z.object({
  username: z
    .string()
    .min(3, "Username is too short")
    .max(20, "Username is too long"),
  email: z
    .string()
    .email()
    .min(6, "Email is too short")
    .max(255, "Email is too long"),
  password: z
    .string()
    .min(6, "Password is too short")
    .max(60, "Password is too long"),
});

export const loginSchema = userSchema.omit({ username: true });
