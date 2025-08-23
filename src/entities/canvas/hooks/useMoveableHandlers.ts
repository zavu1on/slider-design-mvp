import { useCallback } from 'react';
import type { TargetElement } from '../schema';
import {
  selectSetCheckInput,
  selectSetWasDoubleClickEvent,
  selectUpdateCanvasElement,
  selectWasDoubleClickEvent,
  useCheckInputStore,
  useSlideStore,
} from '../store';
import { useCurrentPresentationSlide } from './useCurrentPresentationSlide';

const getClearValue = (valueInPixels: string, padding: number = 2): number =>
  Number(valueInPixels.slice(0, -padding));

export const useMoveableHandlers = () => {
  const updateCanvasElement = useSlideStore(selectUpdateCanvasElement);
  const currentPresentationSlide = useCurrentPresentationSlide();

  const wasDoubleClickEvent = useCheckInputStore(selectWasDoubleClickEvent);
  const setWasDoubleClickEvent = useCheckInputStore(
    selectSetWasDoubleClickEvent
  );
  const setCheckInput = useCheckInputStore(selectSetCheckInput);

  const dragHandler = useCallback(
    (target: TargetElement, left: number, top: number) => {
      target.style.left = `${left}px`;
      target.style.top = `${top}px`;
      target.style.cursor = 'move';
    },
    []
  );

  const dragEndHandler = useCallback(
    (target: TargetElement) => {
      const element = currentPresentationSlide!.elements[target.id];

      updateCanvasElement({
        ...element,
        x: getClearValue(target.style.left),
        y: getClearValue(target.style.top),
      });
    },
    [currentPresentationSlide, updateCanvasElement]
  );

  const resizeHandler = useCallback(
    (
      target: TargetElement,
      width: number,
      height: number,
      delta: number[],
      direction: number[]
    ) => {
      if (delta[0]) {
        const prevLeft = getClearValue(target.style.left);
        const prevWidth = getClearValue(target.style.width);

        target.style.width = `${width}px`;
        if (direction[0] === -1) {
          target.style.left = `${prevLeft + (prevWidth - width)}px`;
        }
      }
      if (delta[1]) {
        const prevTop = getClearValue(target.style.top);
        const prevHeight = getClearValue(target.style.height);

        target.style.height = `${height}px`;
        if (direction[1] === -1) {
          target.style.top = `${prevTop + (prevHeight - height)}px`;
        }
      }
    },
    []
  );

  const resizeEndHandler = useCallback(
    (target: TargetElement) => {
      const element = currentPresentationSlide!.elements[target.id];

      updateCanvasElement({
        ...element,
        x: getClearValue(target.style.left),
        y: getClearValue(target.style.top),
        width: getClearValue(target.style.width),
        height: getClearValue(target.style.height),
      });
    },
    [currentPresentationSlide, updateCanvasElement]
  );

  const rotateHandler = useCallback(
    (target: TargetElement, transform: string) => {
      target.style.transform = transform;
    },
    []
  );

  const rotateEndHandler = useCallback(
    (target: TargetElement) => {
      const element = currentPresentationSlide!.elements[target.id];

      updateCanvasElement({
        ...element,
        rotation: Number(target.style.transform.slice(7, -4)),
      });
    },
    [currentPresentationSlide, updateCanvasElement]
  );

  const roundHandler = useCallback(
    (target: TargetElement, borderRadius: string) => {
      target.style.borderRadius = borderRadius;
    },
    []
  );

  const roundEndHandler = useCallback(
    (target: TargetElement) => {
      const element = currentPresentationSlide!.elements[target.id];

      updateCanvasElement({
        ...element,
        borderRadius: target.style.borderRadius,
      });
    },
    [currentPresentationSlide, updateCanvasElement]
  );

  const clickHandler = useCallback(
    (elementId: string) => {
      if (!wasDoubleClickEvent) {
        setWasDoubleClickEvent(true);
        setTimeout(() => setWasDoubleClickEvent(false), 300);
      } else {
        setCheckInput(true, elementId);
      }
    },
    [setCheckInput, setWasDoubleClickEvent, wasDoubleClickEvent]
  );

  return {
    dragHandler,
    dragEndHandler,
    resizeHandler,
    resizeEndHandler,
    rotateHandler,
    rotateEndHandler,
    roundHandler,
    roundEndHandler,
    clickHandler,
  };
};
