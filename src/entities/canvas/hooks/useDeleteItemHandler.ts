'use client';

import { useCallback, useEffect } from 'react';
import { getTargetId } from '@/shared/lib';
import { selectRemoveCanvasElement, useSlideStore } from '../store';
import { useSelectedTargets } from './useSelectedTargets';

export const useDeleteItemHandler = () => {
  const targets = useSelectedTargets();
  const removeCanvasElement = useSlideStore(selectRemoveCanvasElement);

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
    [removeCanvasElement, targets]
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeydown);

    return () => {
      document.removeEventListener('keydown', onKeydown);
    };
  }, [onKeydown]);
};
