import { z } from "zod";

const signUpSchema = z.object({
  email: z.string().email({ message: "Enter a valid email." }),
  password: z.string().min(10, "Password should be at least 10 characters."),
  confirmPassword: z.string(),
});

const signUpSchemaRefined = signUpSchema.refine(
  (data) => data.password == data.confirmPassword,
  {
    message: "Passwords must match.",
    path: ["confirmPassword"],
  }
);

const signInSchema = signUpSchema.omit({ confirmPassword: true });

type dataType = {
  email: string;
  password: string;
  confirmPassword?: string;
};

export type zodErrorsType = {
  email?: string[] | undefined;
  password?: string[] | undefined;
  confirmPassword?: string[] | undefined;
};

// Validate input fields
const validateFields = (
  schema: typeof signUpSchemaRefined | typeof signInSchema,
  data: dataType
) => {
  const validFields = schema.safeParse(data);

  if (!validFields.success) {
    // return errors
    return validFields.error.flatten().fieldErrors;
  }

  return {};
};

// Set zod errrors based on input validation
export const validateForms = (type: string, data: dataType) => {
  let errors: zodErrorsType = {};

  // check type
  if (type === "signUp") {
    errors = validateFields(signUpSchemaRefined, data);
  }

  if (type === "signIn") {
    errors = validateFields(signInSchema, data);
  }

  return { errors };
};
