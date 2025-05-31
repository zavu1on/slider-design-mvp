import { type Session } from 'next-auth';
import { auth } from './auth';

export class SessionIsNullError extends Error {
  constructor() {
    super(AUTH_IS_REQUIRED);
  }
}
export const AUTH_IS_REQUIRED = 'Authentication is required';

export const getSessionOrThrowError = async (): Promise<Session> => {
  const session = await auth();
  if (!session) throw new SessionIsNullError();

  return session;
};
