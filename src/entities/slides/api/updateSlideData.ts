'use server';

import { AuthError } from 'next-auth';
import hash from 'object-hash';
import { ValidationError } from 'yup';
import { getSessionOrThrowError } from '@/entities/auth';
import { type SlideData, slideDataSchema } from '@/entities/canvas';
import type { ActionBasicResponse } from '@/shared';
import { prisma } from '@/shared/lib';

type UpdateSlideDataResponse = ActionBasicResponse<{
  hash: string;
  updatedAt: Date;
}>;

export const updateSlideData = async (
  projectId: string,
  slideData: SlideData
): Promise<UpdateSlideDataResponse> => {
  try {
    const slideDataForm = await slideDataSchema.validate(slideData);
    const session = await getSessionOrThrowError();

    const updatedAt = new Date();
    const slideDataHash = hash(slideDataForm);

    await prisma.slide.update({
      where: {
        id: projectId,
        authorId: session.user.body.id,
      },
      data: {
        data: JSON.stringify(slideDataForm),
        updatedAt,
      },
    });

    return {
      success: true,
      data: {
        hash: slideDataHash,
        updatedAt,
      },
    };
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
      error: 'Не удалось обновить данные',
    };
  }
};
