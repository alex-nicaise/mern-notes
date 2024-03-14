import { z } from "zod";

export const signUpSchema = z
  .object({
    email: z.string().email({ message: "Enter a valid email." }),
    password: z.string().min(10, "Password should be at least 10 characters."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password == data.confirmPassword, {
    message: "Passwords must match.",
    path: ["confirmPassword"],
  });

export type zodErrorsType = {
  email?: string[] | undefined;
  password?: string[] | undefined;
  confirmPassword?: string[] | undefined;
};
