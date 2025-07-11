'use server';

import { AuthError } from 'next-auth';
import { getSessionOrThrowError } from '@/entities/auth';
import type { ActionBasicResponse } from '@/shared';
import { prisma } from '@/shared/lib';

export const updateSlideName = async (
  slideId: string,
  name: string
): Promise<ActionBasicResponse> => {
  try {
    const session = await getSessionOrThrowError();
    name = name.trim();
    if (!name) throw new Error();

    await prisma.slide.update({
      where: {
        id: slideId,
        authorId: session.user.body.id,
      },
      data: {
        name,
      },
    });

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
