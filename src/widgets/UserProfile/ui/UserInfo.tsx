import type { FC } from 'react';
import type { PublicUser } from '@/entities/profile';

type UserInfoProps = {
  user: PublicUser;
};

export const UserInfo: FC<UserInfoProps> = ({ user }) => (
  <section className="mb-6">
    <h2 className="text-lg font-semibold mb-2">Информация профиля</h2>
    <div className="space-y-1 text-gray-700">
      <div>
        <span className="font-medium">Логин:</span> {user.login}
      </div>
      <div>
        <span className="font-medium">Аккаунт создан:</span>{' '}
        {new Date(user.createdAt).toLocaleDateString()}
      </div>
    </div>
  </section>
);
