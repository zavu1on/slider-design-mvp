'use client';

import { type FC, type ReactNode } from 'react';
import { Toaster } from '@/generated/shadcn/sonner';

export const ToastProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
};
