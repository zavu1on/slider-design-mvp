'use client';

import { type RefObject, useCallback, useEffect } from 'react';
import type Moveable from 'react-moveable';
import type { OnDragStart, OnSelect, OnSelectEnd } from 'react-selecto';
import type Selecto from 'react-selecto';
import { useCheckInputStore, useSelectedTargetsStore } from '../store';

export const useSelectableHandlers = (
  moveableRef: RefObject<Moveable | null>,
  canvasRef: RefObject<HTMLDivElement | null>
) => {
  const { targets, setTargets } = useSelectedTargetsStore();
  const { uncheckInput } = useCheckInputStore();

  useEffect(() => {
    const onKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        uncheckInput();
      }
    };
    document.addEventListener('keydown', onKeydown);

    return () => {
      document.removeEventListener('keydown', onKeydown);
    };
  }, []);

  /**
   * The onSelectEnd event is triggered after any mouse click/drag inside the canvas,
   * during the movement of selected elements.
   */
  const selectHandler = useCallback(
    (event: OnSelect<Selecto>) => {
      if (event.isDragStartEnd) {
        event.inputEvent.preventDefault();
        moveableRef.current?.waitToChangeTarget().then(() => {
          moveableRef.current?.dragStart(event.inputEvent);
        });
      }

      /*
       * If a mouse click/drag occurs inside the canvas and there are already selected elements,
       * reset the selection or set the elements that came as a replacement.
       */
      const target = event.inputEvent.originalTarget;
      if (targets.length && canvasRef.current?.contains(target)) {
        uncheckInput();
        setTargets(event.selected.map((t) => `[data-id="${t.id}"]`));
        return;
      }
      /*
       * If the click/drag happened outside, do nothing.
       * This is intended for the top editing toolbar.
       */
      if (!event.selected.length) return;

      /*
       * If this is the first mouse click/drag inside the canvas (no elements selected),
       * set the elements.
       */
      setTargets(event.selected.map((t) => `[data-id="${t.id}"]`));
    },
    [moveableRef, canvasRef, targets]
  );

  /**
   * The onSelectEnd event is triggered after any mouse click/drag inside the canvas,
   * during the movement of selected elements.
   */
  const selectEndHandler = useCallback(
    (event: OnSelectEnd<Selecto>) => {
      if (event.isDragStartEnd) {
        event.inputEvent.preventDefault();
        moveableRef.current?.waitToChangeTarget().then(() => {
          moveableRef.current?.dragStart(event.inputEvent);
        });
      }

      /*
       * If a mouse click/drag occurs inside the canvas and there are already selected elements,
       * reset the selection or set the elements that came as a replacement.
       */
      const target = event.inputEvent.originalTarget;
      if (targets.length && canvasRef.current?.contains(target)) {
        uncheckInput();
        setTargets(event.selected.map((t) => `[data-id="${t.id}"]`));
        return;
      }

      /*
       * If the click/drag happened outside, do nothing.
       * This is intended for the top editing toolbar.
       */
      if (!event.selected.length) return;

      /*
       * If this is the first mouse click/drag inside the canvas (no elements selected),
       * set the elements.
       */
      setTargets(event.selected.map((t) => `[data-id="${t.id}"]`));
    },
    [canvasRef, moveableRef, targets]
  );

  const dragStartHandler = useCallback(
    (event: OnDragStart<Selecto>) => {
      const target = event.inputEvent.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        moveableRef.current?.isMoveableElement(target) ||
        targets.some((t) => t === `[data-id="${target.id}"]`)
      ) {
        event.stop();
      }
    },
    [moveableRef, targets]
  );

  return {
    selectHandler,
    selectEndHandler,
    dragStartHandler,
  };
};
