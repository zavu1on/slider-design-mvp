import type { FC } from 'react';
import type { PublicUser } from '@/entities/profile';
import { ProfileHeader } from '@/entities/profile/ui/ProfileHeader';
import { ChangeLoginForm, ChangePasswordForm } from './lib';
import { UserInfo } from './ui';

type UserProfileProps = {
  user: PublicUser;
};

export const UserProfile: FC<UserProfileProps> = ({ user }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <ProfileHeader userName={user.login} />
      <main className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded shadow">
        <UserInfo user={user} />
        <div className="flex flex-col md:flex-row gap-8 mt-8">
          <div className="flex-1">
            <ChangeLoginForm currentLogin={user.login} />
          </div>
          <div className="flex-1">
            <ChangePasswordForm />
          </div>
        </div>
      </main>
    </div>
  );
};
