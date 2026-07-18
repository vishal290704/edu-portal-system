import { z } from "zod";

export const createUserSchema = z.object({
  username: z
    .string()
    .trim()
    .min(4, "Username must be at least 4 characters.")
    .max(30, "Username cannot exceed 30 characters."),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(50, "Password cannot exceed 50 characters."),

  role: z.enum(["ADMIN", "TEACHER"], {
    message: "Invalid role selected.",
  }),
});

export const updateUserSchema = z.object({
  id: z
    .string()
    .min(1, "User ID is required."),

  username: z
    .string()
    .trim()
    .min(4, "Username must be at least 4 characters.")
    .max(30, "Username cannot exceed 30 characters."),

  role: z.enum(["ADMIN", "TEACHER"], {
    message: "Invalid role selected.",
  }),
});