import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email({ message: "Enter a valid email." }),
  password: z.string().min(10, "Password should be at least 10 characters."),
});

export type signInState = {
  zodErrors: {
    email?: string[] | undefined;
    password?: string[] | undefined;
  };
  serverMessage: string;
};
