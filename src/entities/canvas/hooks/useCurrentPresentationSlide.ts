'use client';

import { useShallow } from 'zustand/react/shallow';
import {
  type SlideInner,
  selectCurrentSlideId,
  selectSlides,
  useSlideStore,
} from '../store';

export const useCurrentPresentationSlide = (): SlideInner | undefined => {
  const slides = useSlideStore(useShallow(selectSlides));
  const currentSlideId = useSlideStore(selectCurrentSlideId);

  if (!currentSlideId) return;
  return slides[currentSlideId];
};
