import type { FC } from 'react';
import { preload } from 'react-dom';
import { getSessionOrLogin } from '@/entities/auth';
import { getUserProfileOrLogin } from '@/entities/profile';
import { UserProfile } from '@/widgets/UserProfile';

export const Profile: FC = async () => {
  const session = await getSessionOrLogin();
  const user = await getUserProfileOrLogin(session, '/profile');

  preload('/eye-slash.svg', { as: 'image' });

  return <UserProfile user={user} />;
};
