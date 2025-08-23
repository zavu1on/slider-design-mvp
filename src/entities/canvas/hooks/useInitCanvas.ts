'use client';

import { type RefObject, useCallback, useEffect } from 'react';
import { selectSetCanvasSizes, useCanvasSizesStore } from '../store';

export const useUpdateScale = (
  containerRef: RefObject<HTMLDivElement | null>,
  canvasRef: RefObject<HTMLDivElement | null>,
  width: number,
  height: number
) => {
  const updateScale = useCallback(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasRef.current, containerRef.current, height, width]);

  useEffect(() => {
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [updateScale]);
};

export const useInitCanvas = (
  width: number,
  height: number,
  containerRef: RefObject<HTMLDivElement | null>,
  canvasRef: RefObject<HTMLDivElement | null>
) => {
  const setSizes = useCanvasSizesStore(selectSetCanvasSizes);

  useEffect(() => {
    setSizes(width, height);
  }, [width, height, setSizes]);

  useUpdateScale(containerRef, canvasRef, width, height);
};
