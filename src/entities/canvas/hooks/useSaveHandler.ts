'use client';

import { startTransition, useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { updateSlideData } from '@/entities/slides';
import { useMemorizedSlideData } from '../store';

export const useSaveHandler = (projectId: string) => {
  const { hasUnsavedChanges, slideData, markChangesAsSaved } =
    useMemorizedSlideData();

  const undoSaveHandler = useCallback(
    (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (target.contentEditable === 'true') return;
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes(target.tagName)) return;

      if (event.ctrlKey && ['s', 'ы'].includes(event.key.toLowerCase())) {
        const activeElement = document.activeElement as HTMLElement | null;
        activeElement?.blur();
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
    [projectId, slideData, markChangesAsSaved]
  );

  const beforeUnloadHandler = useCallback(
    (event: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        event.preventDefault();
        return event.returnValue;
      }
    },
    [hasUnsavedChanges]
  );

  useEffect(() => {
    window.addEventListener('keydown', undoSaveHandler);
    window.addEventListener('beforeunload', beforeUnloadHandler);

    return () => {
      window.removeEventListener('keydown', undoSaveHandler);
      window.removeEventListener('beforeunload', beforeUnloadHandler);
    };
  }, [undoSaveHandler, beforeUnloadHandler]);
};
