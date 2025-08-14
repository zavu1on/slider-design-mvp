'use client';

import { useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getTargetId } from '@/shared/lib';
import { type CanvasElement, canvasElementListSchema } from '../schema';
import { useMemorizedSlideData, useSelectedTargetsStore } from '../store';
import { useCurrentPresentationSlide } from './useCurrentPresentationSlide';

export const useCopyPasteHandler = () => {
  const { targets } = useSelectedTargetsStore();
  const currentSlide = useCurrentPresentationSlide();
  const { addCanvasElement, removeCanvasElement } = useMemorizedSlideData();

  const copyPasteHandler = useCallback(
    (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (target.contentEditable === 'true') return;
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes(target.tagName)) return;

      event.preventDefault();

      if (
        event.ctrlKey &&
        ['с', 'c', 'x', 'ч'].includes(event.key.toLowerCase())
      ) {
        const idList = targets.map((target) => getTargetId(target)!);
        const elements =
          currentSlide?.elements.filter((el) => idList.includes(el.id)) ?? [];
        localStorage.setItem('clipboard', JSON.stringify(elements));

        if (['x', 'ч'].includes(event.key.toLowerCase())) {
          idList.forEach((id) => removeCanvasElement(id));
        }
      } else if (
        event.ctrlKey &&
        ['v', 'м'].includes(event.key.toLowerCase())
      ) {
        const clipboard = localStorage.getItem('clipboard');
        if (!clipboard) return;

        const clipboardData = JSON.parse(clipboard) as CanvasElement[];
        const isValid = canvasElementListSchema.isValidSync(clipboardData, {
          abortEarly: false,
        });

        if (!isValid) return;
        clipboardData.forEach((el) => {
          addCanvasElement({ ...el, id: uuidv4(), x: el.x + 50, y: el.y + 50 });
        });
      }
    },
    [currentSlide, targets]
  );

  useEffect(() => {
    window.addEventListener('keydown', copyPasteHandler);

    return () => {
      window.removeEventListener('keydown', copyPasteHandler);
    };
  }, [copyPasteHandler]);
};
