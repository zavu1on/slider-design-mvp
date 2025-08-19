'use client';

import type { FC, MouseEvent } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { selectHasUnsavedChanges, useSlideStore } from '@/entities/canvas';
import { Button } from '@/shared/ui';

export const LobbyLink: FC = () => {
  const hasUnsavedChanges = useSlideStore(selectHasUnsavedChanges);

  const linkClickHandler = (event: MouseEvent<HTMLAnchorElement>) => {
    if (hasUnsavedChanges) {
      event.preventDefault();
      toast.error('Сохраните данные перед выходом');
    }
  };

  return (
    <Link href="/slides" onClick={linkClickHandler}>
      <Button className="w-full hover:underline">К списку проектов</Button>
    </Link>
  );
};
