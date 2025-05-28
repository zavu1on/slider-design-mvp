import { type FC } from 'react';
import { LoginForm } from '@/features/LoginForm';

export const Login: FC = () => {
  return (
    <main className="size-full flex items-center justify-center">
      <LoginForm />
    </main>
  );
};
