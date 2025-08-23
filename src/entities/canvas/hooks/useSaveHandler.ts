'use client';

import { startTransition, useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { useShallow } from 'zustand/react/shallow';
import { updateSlideData } from '@/entities/slides';
import { reconstructSlideData } from '../schema';
import {
  selectCurrentSlideId,
  selectHasUnsavedChanges,
  selectMarkChangesAsSaved,
  selectSlideIds,
  selectSlides,
  useSlideStore,
} from '../store';

export const useSaveHandler = (projectId: string) => {
  const slideIds = useSlideStore(selectSlideIds);
  const slides = useSlideStore(useShallow(selectSlides));
  const currentSlideId = useSlideStore(selectCurrentSlideId);

  const hasUnsavedChanges = useSlideStore(selectHasUnsavedChanges);
  const markChangesAsSaved = useSlideStore(selectMarkChangesAsSaved);

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
          const resp = await updateSlideData(
            projectId,
            reconstructSlideData({
              slideIds,
              slides,
              currentSlideId,
            })
          );

          if (!resp.success) toast.error(resp.error);
          else if (resp.data) {
            toast.success('Данные успешно обновлены');
            markChangesAsSaved(resp.data.hash, resp.data.updatedAt);
          }
        });
      }
    },
    [projectId, slideIds, slides, currentSlideId, markChangesAsSaved]
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
