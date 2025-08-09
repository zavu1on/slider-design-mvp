'use client';

import { useEffect } from 'react';
import { useMemorizedSlideData, useSelectedTargetsStore } from '../store';

export const useDeleteItemHandler = () => {
  const { targets } = useSelectedTargetsStore();
  const { currentSlideId, removeCanvasElement } = useMemorizedSlideData();

  useEffect(() => {
    const onKeydown = (event: KeyboardEvent) => {
      if (!targets.length || !currentSlideId) return;

      if (event.key === 'Delete') {
        event.preventDefault();
        for (const target of targets) {
          const targetId = target.match(/data-id="([^"]*)"/);

          if (targetId && targetId[1]) {
            removeCanvasElement(currentSlideId, targetId[1]);
          }
        }
      }
    };

    document.addEventListener('keydown', onKeydown);

    return () => {
      document.removeEventListener('keydown', onKeydown);
    };
  }, [currentSlideId, targets]);
};
