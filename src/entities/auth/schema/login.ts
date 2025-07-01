import { type InferType, object, string } from 'yup';

export const loginFormSchema = object({
  email: string().required(),
  password: string().required(),
});

export type LoginFormSchema = InferType<typeof loginFormSchema>;
