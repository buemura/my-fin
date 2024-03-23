import { z } from "zod";

export type UserType = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
};

export type UserAuthType = {
  accessToken: string;
  user: UserType;
};

export const userSigninSchema = z.object({
  email: z.string().email({
    message: "Email must be a valid email",
  }),
  password: z.string().min(8, {
    message: "Password must contain at least 8 characters",
  }),
});

export type UserSigninSchema = z.infer<typeof userSigninSchema>;

export const userSignupSchema = z.object({
  name: z.string().min(3, {
    message: "Name must not be empty",
  }),
  email: z.string().email({
    message: "Email must be a valid email",
  }),
  password: z.string().min(8, {
    message: "Password must contain at least 8 characters",
  }),
});

export type UserSignupSchema = z.infer<typeof userSignupSchema>;
