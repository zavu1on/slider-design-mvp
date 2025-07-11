import type { Session } from 'next-auth';
import { signOut } from '@/entities/auth';
import { prisma } from '@/shared/lib';
import type { PublicUser } from '../schema';

export const getUserProfile = async (
  session: Session
): Promise<PublicUser | null> => {
  return await prisma.user.findFirst({
    where: {
      id: session.user.body.id,
    },
    select: {
      id: true,
      login: true,
      createdAt: true,
    },
  });
};

export const getUserProfileOrLogin = async (
  session: Session,
  callbackUrl: string = ''
): Promise<PublicUser> | never => {
  const user = await getUserProfile(session);

  if (!user) {
    await signOut({
      redirectTo: `/login?callbackUrl=${callbackUrl}`,
    });
    throw Error('Can not redirect to login page');
  }

  return user;
};
