import type { Session } from 'next-auth';
import { redirect } from 'next/navigation';
import { auth } from './auth';

export const getSessionOrLogin = async (
  callbackUrl: string = ''
): Promise<Session> | never => {
  const session = await auth();

  if (!callbackUrl) {
    try {
      callbackUrl = window.location.href;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {}
  }

  if (!session) return redirect(`/login?callbackUrl=${callbackUrl}`);

  return session;
};
