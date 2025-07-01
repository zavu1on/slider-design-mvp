'use client';

import { type FC } from 'react';
import { signOut } from 'next-auth/react';
import { Button, ButtonProps } from '@/shared/ui';

export const LogoutButton: FC<ButtonProps> = (props) => {
  return (
    <Button
      variant="destructive"
      onClick={async () => {
        await signOut({
          redirectTo: '/login',
        });
      }}
      {...props}
    >
      Logout
    </Button>
  );
};
