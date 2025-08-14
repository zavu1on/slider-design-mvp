'use client';

import { useCallback, useEffect } from 'react';
import { getTargetId } from '@/shared/lib';
import { useMemorizedSlideData, useSelectedTargetsStore } from '../store';

export const useDeleteItemHandler = () => {
  const { targets } = useSelectedTargetsStore();
  const { removeCanvasElement } = useMemorizedSlideData();

  const onKeydown = useCallback(
    (event: KeyboardEvent) => {
      if (!targets.length) return;

      if (event.key === 'Delete') {
        event.preventDefault();

        for (const target of targets) {
          const targetId = getTargetId(target);
          if (targetId) removeCanvasElement(targetId);
        }
      }
    },
    [targets]
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeydown);

    return () => {
      document.removeEventListener('keydown', onKeydown);
    };
  }, [onKeydown]);
};
