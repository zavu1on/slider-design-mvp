'use client';

import { useMemo } from 'react';
import type { PresentationSlide } from '../schema';
import { useCanvasStore } from '../store';

export const useGetCurrentPresentationSlide = ():
  | PresentationSlide
  | undefined => {
  const { slideData, currentSlideId } = useCanvasStore();

  const currentPresentationSlide = useMemo(
    () => slideData.find((slide) => slide.id === currentSlideId),
    [slideData, currentSlideId]
  );

  return currentPresentationSlide;
};
