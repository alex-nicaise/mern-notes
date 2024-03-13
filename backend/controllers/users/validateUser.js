const { z } = require("zod");

// Create zod Schema
const signInUpFormSchema = z.object({
  email: z.string().email({ message: "Enter a valid email." }),
  password: z.string().min(10, "Password should be at least 10 characters."),
});

// Validate fields with Zod Schema
const validateFields = (email, password) => {
  const validatedFields = signInUpFormSchema.safeParse({
    email: email,
    password: password,
  });

  if (!validatedFields.success) {
    throw new Error("Invalid fields!");
  }
};

module.exports = { validateFields };
