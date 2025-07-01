'use server';

import { revalidatePath } from 'next/cache';
import { ValidationError } from 'yup';
import { getSessionOrThrowError } from '@/entities/auth';
import type { ActionBasicResponse } from '@/shared';
import { prisma } from '@/shared/lib';
import { ChangeLoginFormSchema, changeLoginFormSchema } from '../schema';

export const changeLoginAction = async (
  data: ChangeLoginFormSchema
): Promise<ActionBasicResponse> => {
  try {
    const changeLoginForm = await changeLoginFormSchema.validate(data);
    const session = await getSessionOrThrowError();

    await prisma.user.update({
      where: { id: session.user.body.id },
      data: {
        login: changeLoginForm.newLogin,
      },
    });

    revalidatePath('/profile');

    return {
      success: true,
    };
  } catch (error) {
    if (error instanceof ValidationError) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: false,
      error: 'Неизвестная ошибка',
    };
  }
};
