'use server';

import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { v4 as uuidv4 } from 'uuid';
import { ValidationError } from 'yup';
import { getSessionOrThrowError } from '@/entities/auth';
import type { SlideData } from '@/entities/canvas';
import type { ActionBasicResponse } from '@/shared';
import { prisma } from '@/shared/lib';
import { type AddSlideFormSchema, addSlideFormSchema } from '../schema';

const createInitialSlideData = (): SlideData => [
  {
    id: uuidv4(),
    previewUrl: '',
    elements: [],
  },
];

export const addSlideAction = async (
  data: AddSlideFormSchema
): Promise<ActionBasicResponse> => {
  try {
    const addSlideForm = await addSlideFormSchema.validate(data);
    const session = await getSessionOrThrowError();

    await prisma.slide.create({
      data: {
        name: addSlideForm.name,
        authorId: session.user.body.id,
        data: JSON.stringify(createInitialSlideData()),
      },
    });
    revalidatePath('/slides');

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
    if (error instanceof AuthError) {
      return { success: false, error: 'Необходима повторная авторизация' };
    }

    return {
      success: false,
      error: 'Неизвестная ошибка',
    };
  }
};
