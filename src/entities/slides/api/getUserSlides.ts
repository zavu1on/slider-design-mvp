import type { Session } from 'next-auth';
import type { Slide } from '@/generated/prisma';
import { prisma } from '@/shared/lib';

export const getUserSlides = async (session: Session): Promise<Slide[]> => {
  return await prisma.slide.findMany({
    where: {
      authorId: session.user.body.id,
    },
    orderBy: [{ updatedAt: 'desc' }],
  });
};
