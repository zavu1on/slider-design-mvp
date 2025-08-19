'use client';

import { useCallback, useEffect } from 'react';
import {
  selectCanRedo,
  selectCanUndo,
  selectPastLength,
  selectRedo,
  selectUndo,
  useSlideStore,
} from '../store';

export const useUndoableHandler = () => {
  const canUndo = useSlideStore(selectCanUndo);
  const canRedo = useSlideStore(selectCanRedo);
  const pastLength = useSlideStore(selectPastLength);

  const undo = useSlideStore(selectUndo);
  const redo = useSlideStore(selectRedo);

  const undoRedoHandler = useCallback(
    (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (target.contentEditable === 'true') return;
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes(target.tagName)) return;

      if (event.ctrlKey && ['z', 'я'].includes(event.key.toLowerCase())) {
        if (event.shiftKey && canRedo) {
          redo();
        } else if (canUndo && pastLength > 2) {
          undo();
        }
      }
    },
    [canRedo, canUndo, pastLength, redo, undo]
  );

  useEffect(() => {
    window.addEventListener('keydown', undoRedoHandler);

    return () => window.removeEventListener('keydown', undoRedoHandler);
  }, [undoRedoHandler]);
};
