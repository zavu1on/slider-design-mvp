import { type Session } from 'next-auth';
import { redirect } from 'next/navigation';
import { auth } from './auth';

export const getSessionOrLogin = async (
  callbackUrl: string = ''
): Promise<Session> => {
  const session = await auth();
  if (!session) return redirect(`/login?callbackUrl=${callbackUrl}`);

  return session;
};
