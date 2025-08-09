'use client';

import { useCallback, useEffect } from 'react';
import { useMemorizedSlideData } from '../store';

export const useUndoableHandler = () => {
  const { canUndo, canRedo, undo, redo } = useMemorizedSlideData();

  const undoRedoHandler = useCallback(
    (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes(target.tagName)) return;

      if (event.ctrlKey && ['z', 'я'].includes(event.key.toLowerCase())) {
        if (event.shiftKey && canRedo) {
          redo();
        } else if (canUndo) {
          undo();
        }
      }
    },
    [canRedo, canUndo, redo, undo]
  );

  useEffect(() => {
    window.addEventListener('keydown', undoRedoHandler);

    return () => window.removeEventListener('keydown', undoRedoHandler);
  }, [undoRedoHandler]);
};
