'use client';

import { type FC, type RefObject, useRef } from 'react';
import { cn } from '@/shared/lib';
import { useUpdateScale } from './hooks';
import type { PresentationSlide } from './schema';
import { RenderElement } from './ui';

type PresentationSlideViewerProps = {
  slide: PresentationSlide;
  width?: number;
  height?: number;
  containerRef: RefObject<HTMLDivElement | null>;
  className?: string;
};

export const PresentationSlideViewer: FC<PresentationSlideViewerProps> = ({
  slide,
  width = 1280,
  height = 720,
  containerRef,
  className,
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useUpdateScale(containerRef, canvasRef, width, height);

  return (
    <div
      ref={canvasRef}
      className={cn('relative overflow-hidden', className)}
      style={{
        background: slide.color,
      }}
    >
      {slide?.elements.map((el) => (
        <RenderElement key={el.id} element={el} viewMode />
      ))}
    </div>
  );
};
