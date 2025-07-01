import { FC } from 'react';
import { getSessionOrLogin } from '@/entities/auth';
import { getUserProfileOrLogin } from '@/entities/profile';
import { UserProfile } from '@/widgets/UserProfile';

export const Profile: FC = async () => {
  const session = await getSessionOrLogin();
  const user = await getUserProfileOrLogin(session, '/profile');

  return <UserProfile user={user} />;
};
