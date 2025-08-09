'use client';

import { useMemo } from 'react';
import type { PresentationSlide } from '../schema';
import { useMemorizedSlideData } from '../store';

export const useGetCurrentPresentationSlide = ():
  | PresentationSlide
  | undefined => {
  const { slideData, currentSlideId } = useMemorizedSlideData();

  const currentPresentationSlide = useMemo(
    () => slideData.find((slide) => slide.id === currentSlideId),
    [slideData, currentSlideId]
  );

  return currentPresentationSlide;
};
