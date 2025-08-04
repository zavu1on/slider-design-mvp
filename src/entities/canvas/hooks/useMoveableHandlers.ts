import { useCallback } from 'react';
import type { PresentationSlide, TargetElement } from '../schema';
import { useCanvasStore } from '../store';

const getClearValue = (valueInPixels: string, padding: number = 2): number =>
  Number(valueInPixels.slice(0, -padding));

export const useMoveableHandlers = (
  currentPresentationSlide: PresentationSlide | undefined
) => {
  const { currentSlideId, updateCanvasElement } = useCanvasStore();

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
      const element = currentPresentationSlide!.elements.find(
        (el) => el.id === target.id
      )!;
      updateCanvasElement(currentSlideId!, {
        ...element,
        x: getClearValue(target.style.left),
        y: getClearValue(target.style.top),
      });
    },
    [currentPresentationSlide, currentSlideId]
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
      const element = currentPresentationSlide!.elements.find(
        (el) => el.id === target.id
      )!;

      updateCanvasElement(currentSlideId!, {
        ...element,
        x: getClearValue(target.style.left),
        y: getClearValue(target.style.top),
        width: getClearValue(target.style.width),
        height: getClearValue(target.style.height),
      });
    },
    [currentPresentationSlide, currentSlideId]
  );

  const rotateHandler = useCallback(
    (target: TargetElement, transform: string) => {
      target.style.transform = transform;
    },
    []
  );

  const rotateEndHandler = useCallback(
    (target: TargetElement) => {
      const element = currentPresentationSlide!.elements.find(
        (el) => el.id === target.id
      )!;

      updateCanvasElement(currentSlideId!, {
        ...element,
        rotation: Number(target.style.transform.slice(7, -4)),
      });
    },
    [currentPresentationSlide, currentSlideId]
  );

  const roundHandler = useCallback(
    (target: TargetElement, borderRadius: string) => {
      target.style.borderRadius = borderRadius;
    },
    []
  );

  const roundEndHandler = useCallback(
    (target: TargetElement) => {
      const element = currentPresentationSlide!.elements.find(
        (el) => el.id === target.id
      )!;

      updateCanvasElement(currentSlideId!, {
        ...element,
        borderRadius: target.style.borderRadius,
      });
    },
    [currentPresentationSlide, currentSlideId]
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
  };
};
