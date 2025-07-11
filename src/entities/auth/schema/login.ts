import { type InferType, object, string } from 'yup';

export const loginFormSchema = object({
  email: string().required('Email обязателен'),
  password: string().required('Пароль обязателен'),
});

export type LoginFormSchema = InferType<typeof loginFormSchema>;
