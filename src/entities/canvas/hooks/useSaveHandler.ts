'use client';

import { startTransition, useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { updateSlideData } from '@/entities/slides';
import { useMemorizedSlideData } from '../store';

export const useSaveHandler = (projectId: string) => {
  const { slideData, markChangesAsSaved } = useMemorizedSlideData();

  const undoSaveHandler = useCallback(
    (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes(target.tagName)) return;

      if (event.ctrlKey && ['s', 'ы'].includes(event.key.toLowerCase())) {
        event.preventDefault();
        startTransition(async () => {
          const resp = await updateSlideData(projectId, slideData);

          if (!resp.success) toast.error(resp.error);
          else if (resp.data) {
            toast.success('Данные успешно обновлены');
            markChangesAsSaved(resp.data.hash, resp.data.updatedAt);
          }
        });
      }
    },
    [projectId, slideData]
  );

  useEffect(() => {
    window.addEventListener('keydown', undoSaveHandler);

    return () => window.removeEventListener('keydown', undoSaveHandler);
  }, [undoSaveHandler]);
};
