'use client';

import { type RefObject, useEffect } from 'react';
import { useCanvasSizesStore } from '../store';

export const useUpdateScale = (
  containerRef: RefObject<HTMLDivElement | null>,
  canvasRef: RefObject<HTMLDivElement | null>,
  width: number,
  height: number
) => {
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
};

export const useInitCanvas = (
  width: number,
  height: number,
  containerRef: RefObject<HTMLDivElement | null>,
  canvasRef: RefObject<HTMLDivElement | null>
) => {
  const { setSizes } = useCanvasSizesStore((state) => state);

  useEffect(() => {
    setSizes(width, height);
  }, [width, height]);

  useUpdateScale(containerRef, canvasRef, width, height);
};
