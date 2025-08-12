'use client';

import { useMemo } from 'react';
import type { CanvasElement } from '../schema';
import { useSelectedTargetsStore } from '../store';
import { useCurrentPresentationSlide } from './useCurrentPresentationSlide';

export const useSelectedElements = (): CanvasElement[] => {
  const currentPresentationSlide = useCurrentPresentationSlide();
  const { targets } = useSelectedTargetsStore();

  const selectedElements = useMemo(
    () =>
      currentPresentationSlide?.elements.filter((slide) =>
        targets.includes(`[data-id="${slide.id}"]`)
      ) ?? [],
    [currentPresentationSlide?.elements, targets]
  );

  return selectedElements;
};
