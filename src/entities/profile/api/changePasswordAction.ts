'use server';

import { AuthError } from 'next-auth';
import { ValidationError } from 'yup';
import {
  getSessionOrLogin,
  hashPassword,
  verifyPassword,
} from '@/entities/auth';
import type { ActionBasicResponse } from '@/shared';
import { prisma } from '@/shared/lib';
import {
  type ChangePasswordFormSchema,
  changePasswordFormSchema,
} from '../schema';

export const changePasswordAction = async (
  data: ChangePasswordFormSchema
): Promise<ActionBasicResponse> => {
  try {
    const changePasswordForm = await changePasswordFormSchema.validate(data);
    const session = await getSessionOrLogin();
    const user = await prisma.user.findFirst({
      where: { id: session.user.body.id },
    });

    if (!user)
      return {
        success: false,
        error: 'Не удалось сменить пароль',
      };
    if (
      !(await verifyPassword(changePasswordForm.currentPassword, user.password))
    )
      return {
        success: false,
        error: 'Не удалось сменить пароль',
      };

    await prisma.user.update({
      where: { id: user.id },
      data: { password: await hashPassword(changePasswordForm.newPassword) },
    });

    return { success: true };
  } catch (error) {
    if (error instanceof ValidationError) {
      return {
        success: false,
        error: error.message,
      };
    }
    if (error instanceof AuthError) {
      return { success: false, error: 'Необходима повторная авторизация' };
    }

    return {
      success: false,
      error: 'Неизвестная ошибка',
    };
  }
};
