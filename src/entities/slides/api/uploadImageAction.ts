'use server';

import fs from 'fs/promises';
import { AuthError } from 'next-auth';
import { headers } from 'next/headers';
import path from 'path';
import sharp from 'sharp';
import { getSessionOrThrowError } from '@/entities/auth';
import { type Material, MaterialType } from '@/generated/prisma';
import type { ActionBasicResponse } from '@/shared';
import { prisma } from '@/shared/lib';

type UploadImageActionState = ActionBasicResponse & {
  image?: Material;
};

export const uploadImageAction = async (
  formData: FormData
): Promise<UploadImageActionState> => {
  const file = formData.get('image') as File | null;
  if (!file || !file.size)
    return { success: false, error: 'Изображение не было прикреплено' };

  try {
    const session = await getSessionOrThrowError();
    const buffer = Buffer.from(await file.arrayBuffer());

    const timestamp = Date.now();
    const ext = file.name.split('.').pop();
    const filename = `${file.name}-${timestamp}.${ext}`;

    const metadata = await sharp(buffer).metadata();
    const { width, height } = metadata;

    const uploadDir = path.join(process.cwd(), 'public', 'upload');
    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(path.join(uploadDir, filename), buffer);

    const headersList = await headers();
    const host = headersList.get('host');
    const protocol = headersList.get('x-forwarded-proto') || 'http';

    if (!host) {
      throw new Error('Unable to determine host');
    }

    const baseUrl = new URL(`${protocol}://${host}`);
    const url = new URL(`/upload/${filename}`, baseUrl).toString();

    const image = await prisma.material.create({
      data: {
        filePath: url,
        type: MaterialType.IMAGE,
        ownerId: session.user.body.id,
        width,
        height,
      },
    });

    return {
      success: true,
      image,
    };
  } catch (error) {
    if (error instanceof AuthError) {
      return { success: false, error: 'Необходима повторная авторизация' };
    }
  }

  return {
    success: false,
    error: 'Ошибка сервера',
  };
};
