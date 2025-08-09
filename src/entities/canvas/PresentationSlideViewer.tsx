'use client';

import { type FC, type RefObject, useEffect, useRef } from 'react';
import { cn } from '@/shared/lib';
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

  const updateScale = () => {
    if (!containerRef.current || !canvasRef.current) return;

    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;

    const targetRatio = width / height;
    const containerRatio = containerWidth / containerHeight;

    let scaledWidth = containerWidth;
    let scaledHeight = containerHeight;

    if (containerRatio > targetRatio) {
      scaledHeight = containerHeight;
      scaledWidth = scaledHeight * targetRatio;
    } else {
      scaledWidth = containerWidth;
      scaledHeight = scaledWidth / targetRatio;
    }

    const newScale = scaledWidth / width;

    canvasRef.current.style.transform = `scale(${newScale})`;
    canvasRef.current.style.transformOrigin = 'top left';
    canvasRef.current.style.width = `${width}px`;
    canvasRef.current.style.height = `${height}px`;
  };

  useEffect(() => {
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [canvasRef.current, containerRef.current]);

  return (
    <div ref={canvasRef} className={cn('relative overflow-hidden', className)}>
      {slide?.elements.map((el) => (
        <RenderElement key={el.id} element={el} viewMode />
      ))}
    </div>
  );
};
