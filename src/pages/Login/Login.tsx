import type { FC } from 'react';
import { preload } from 'react-dom';
import { LoginForm } from '@/features/LoginForm';

export const Login: FC = () => {
  preload('/eye-slash.svg', { as: 'image' });

  return (
    <main className="size-full flex items-center justify-center">
      <LoginForm />
    </main>
  );
};
