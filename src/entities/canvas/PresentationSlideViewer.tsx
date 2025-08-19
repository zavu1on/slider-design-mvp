'use client';

import { type FC, type RefObject, useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { cn } from '@/shared/lib';
import { useUpdateScale } from './hooks';
import type { PresentationSlide } from './schema';
import { useSlideStore } from './store';
import { CanvasElement, RenderElement } from './ui';

type PresentationSlideViewerProps = {
  slideId?: string;
  presentationSlide?: PresentationSlide;
  width?: number;
  height?: number;
  containerRef: RefObject<HTMLDivElement | null>;
  className?: string;
};

export const PresentationSlideViewer: FC<PresentationSlideViewerProps> = ({
  slideId = null,
  presentationSlide,
  width = 1280,
  height = 720,
  containerRef,
  className,
}) => {
  if (!slideId && !presentationSlide)
    throw new Error(
      'One of parameters is required: slideId or presentationSlide'
    );

  const slideColor = useSlideStore((state) =>
    slideId ? state.slides[slideId].color : presentationSlide?.color
  );
  const elementIds = useSlideStore(
    useShallow((state) => (slideId ? state.slides[slideId].elementIds : []))
  );

  const canvasRef = useRef<HTMLDivElement>(null);
  useUpdateScale(containerRef, canvasRef, width, height);

  return (
    <div
      ref={canvasRef}
      className={cn('relative overflow-hidden', className)}
      style={{
        background: slideColor,
      }}
    >
      {elementIds.map((id) => (
        <CanvasElement key={id} slideId={slideId} elementId={id} viewMode />
      ))}
      {presentationSlide?.elements.map((element) => (
        <RenderElement key={element.id} element={element} />
      ))}
    </div>
  );
};
