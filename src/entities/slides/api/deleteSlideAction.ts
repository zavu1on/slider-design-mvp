'use server';

import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { getSessionOrThrowError } from '@/entities/auth';
import type { ActionBasicResponse } from '@/shared';
import { prisma } from '@/shared/lib';

export const deleteSlideAction = async (
  id: string
): Promise<ActionBasicResponse> => {
  try {
    const session = await getSessionOrThrowError();

    await prisma.slide.delete({
      where: {
        id,
        authorId: session.user.body.id,
      },
    });
    revalidatePath('/slides');

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { success: false, error: 'Необходима повторная авторизация' };
    }

    return {
      success: false,
      error: 'Не удалось обновить название проекта',
    };
  }
};
