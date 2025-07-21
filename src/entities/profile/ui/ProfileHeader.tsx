import type { FC } from 'react';
import Link from 'next/link';
import { LogoutButton } from '@/entities/auth/ui';

type ProfileHeaderProps = {
  userName: string;
};

export const ProfileHeader: FC<ProfileHeaderProps> = ({ userName }) => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">
        <Link href="/slides">Slider Designer</Link>
      </h1>
      <div className="flex items-center gap-4">
        <span>
          Привет,{' '}
          <Link
            href="/profile"
            className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
          >
            {userName}
          </Link>
        </span>
        <LogoutButton />
      </div>
    </header>
  );
};
