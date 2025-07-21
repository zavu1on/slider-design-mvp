'use client';

import { type FC, type Ref, useMemo, useRef } from 'react';
import React from 'react';
import { useCanvasStore } from '../store';
import { RenderElement } from '../ui';
import { MoveableAndSelectable } from './MoveableAndSelectable';

export type CanvasProps = {
  ref: Ref<HTMLDivElement>;
  className?: string;
};

export const Canvas: FC<CanvasProps> = ({ ref, className }) => {
  const { color, slideData, currentSlideId } = useCanvasStore();
  const currentPresentationSlide = useMemo(
    () => slideData.find((slide) => slide.id === currentSlideId),
    [slideData, currentSlideId]
  );

  const canvasRef = useRef<HTMLDivElement>(null);

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
      <MoveableAndSelectable
        canvasRef={canvasRef}
        currentPresentationSlide={currentPresentationSlide}
      />
    </>
  );
};
