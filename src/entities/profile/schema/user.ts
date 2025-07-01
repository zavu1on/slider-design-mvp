import { type InferType, object, ref, string } from 'yup';
import { User } from '@/generated/prisma';

export type PublicUser = Omit<User, 'password'>;

export const changeLoginFormSchema = object({
  currentLogin: string().required('Текущий логин обязателен'),
  newLogin: string()
    .notOneOf([ref('currentLogin')], 'Новый логин не может совпадать с текущим')
    .required('Новый логин обязателен')
    .min(3, 'Логин должен содержать минимум 3 символа')
    .max(20, 'Логин не должен превышать 20 символов'),
});
export type ChangeLoginFormSchema = InferType<typeof changeLoginFormSchema>;

export const changePasswordFormSchema = object({
  currentPassword: string().required('Текущий пароль обязателен'),
  newPassword: string()
    .required('Новый пароль обязателен')
    .notOneOf(
      [ref('currentPassword')],
      'Новый пароль не может совпадать с текущим'
    )
    .min(4, 'Пароль должен содержать минимум 4 символа')
    .max(50, 'Пароль не должен превышать 50 символов'),
  repeatNewPassword: string()
    .oneOf([ref('newPassword')], 'Пароли не совпадают')
    .required('Повторите новый пароль'),
});
export type ChangePasswordFormSchema = InferType<
  typeof changePasswordFormSchema
>;
