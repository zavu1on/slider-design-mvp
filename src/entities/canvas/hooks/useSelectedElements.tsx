'use client';

import { useMemo } from 'react';
import type { CanvasElement } from '../schema';
import { useCurrentPresentationSlide } from './useCurrentPresentationSlide';
import { useSelectedTargets } from './useSelectedTargets';

export const useSelectedElements = (): CanvasElement[] => {
  const currentPresentationSlide = useCurrentPresentationSlide();
  const targets = useSelectedTargets();

  const selectedElements = useMemo(
    () =>
      currentPresentationSlide?.elements.filter((slide) =>
        targets.includes(`[data-id="${slide.id}"]`)
      ) ?? [],
    [currentPresentationSlide?.elements, targets]
  );

  return selectedElements;
};
