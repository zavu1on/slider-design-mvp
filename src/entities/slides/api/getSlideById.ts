import type { Session } from 'next-auth';
import type { Slide } from '@/generated/prisma';
import { prisma } from '@/shared/lib';

export const getSlideById = async (
  session: Session,
  id: string
): Promise<Slide | null> => {
  return await prisma.slide.findFirst({
    where: {
      id,
      authorId: session.user.body.id,
    },
  });
};

export const getSlideNameById = async (
  session: Session,
  id: string
): Promise<string | undefined> => {
  return (
    await prisma.slide.findFirst({
      where: {
        id,
        authorId: session.user.body.id,
      },
      select: {
        name: true,
      },
    })
  )?.name;
};
