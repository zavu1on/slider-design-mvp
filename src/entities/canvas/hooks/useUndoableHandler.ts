'use client';

import { useCallback, useEffect } from 'react';
import { useSlideData } from '../store';

export const useUndoableHandler = () => {
  const { canUndo, canRedo, undo, redo } = useSlideData();

  const undoRedoHandler = useCallback(
    (event: KeyboardEvent) => {
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
