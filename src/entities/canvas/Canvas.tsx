'use client';

import { type FC, type Ref, useEffect, useMemo, useRef } from 'react';
import React from 'react';
import { Moveable, Selectable } from './lib';
import { useCanvasStore, useSelectedTargetsStore } from './store';
import { RenderElement } from './ui';

export type CanvasProps = {
  ref: Ref<HTMLDivElement>;
  className?: string;
};

export const Canvas: FC<CanvasProps> = ({ ref, className }) => {
  const { color, slideData, currentSlideId } = useCanvasStore();
  const { setTargets } = useSelectedTargetsStore();

  const currentPresentationSlide = useMemo(
    () => slideData.find((slide) => slide.id === currentSlideId),
    [slideData, currentSlideId]
  );

  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKeydown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'a' && event.ctrlKey) {
        event.preventDefault();
        setTargets(
          currentPresentationSlide?.elements.map(
            (target) => `[data-id="${target.id}"]`
          ) ?? []
        );
      }
    };

    document.addEventListener('keydown', onKeydown);

    return () => {
      document.removeEventListener('keydown', onKeydown);
    };
  }, [currentPresentationSlide]);

  return (
    <>
      <div
        className={className}
        style={{ backgroundColor: color }}
        ref={(node) => {
          canvasRef.current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
      >
        {currentPresentationSlide?.elements.map((el) => (
          <RenderElement key={el.id} element={el} />
        ))}
      </div>
      <Moveable
        canvasRef={canvasRef}
        currentPresentationSlide={currentPresentationSlide}
      />
      <Selectable canvasRef={canvasRef} />
    </>
  );
};
