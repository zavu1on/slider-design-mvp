import type { Session } from 'next-auth';
import type { Material } from '@/generated/prisma';
import { prisma } from '@/shared/lib';

export const getUserMaterials = async (
  session: Session
): Promise<Material[]> => {
  return await prisma.material.findMany({
    where: {
      ownerId: session.user.body.id,
    },
  });
};
