'use client';

import { type FC, useMemo } from 'react';
import {
  AlignCenterHorizontal,
  AlignCenterVertical,
  AlignHorizontalSpaceBetween,
  AlignVerticalSpaceBetween,
  Square,
  Type,
} from 'lucide-react';
import {
  type CanvasElement,
  useAlignActionStore,
  useGetCurrentPresentationSlide,
} from '@/entities/canvas';
import { useSelectedTargetsStore, useSlideData } from '@/entities/canvas/store';
import { SketchPicker } from '@/shared/ui';

export const SliderHeader: FC = () => {
  const { setAction } = useAlignActionStore((store) => store);
  const currentPresentationSlide = useGetCurrentPresentationSlide();
  const { currentSlideId, updateCanvasElement } = useSlideData();
  const { targets } = useSelectedTargetsStore();

  const selectedElements = useMemo(
    () =>
      currentPresentationSlide?.elements.filter((slide) =>
        targets.includes(`[data-id="${slide.id}"]`)
      ) ?? [],
    [currentPresentationSlide?.elements, targets]
  );

  const updateColors = (
    color: Partial<Pick<CanvasElement, 'color' | 'backgroundColor'>>
  ) => {
    if (selectedElements?.length && currentSlideId) {
      for (const element of selectedElements) {
        updateCanvasElement(currentSlideId, { ...element, ...color });
      }
    }
  };

  return (
    <header className="w-full pt-4 pr-4">
      <div className="flex flex-row justify-between items-center w-full py-4 px-8 bg-gray-50 shadow">
        <div className="flex flex-row gap-4">
          <div className="flex flex-row gap-2">
            <Type className="color-gray-800" />
            <SketchPicker
              disabled={!selectedElements.length}
              color={selectedElements[0]?.color ?? '#ffffff'}
              onChange={(color) =>
                updateColors({
                  color,
                })
              }
            />
          </div>
          <div className="flex flex-row gap-2">
            <Square className="color-gray-800" />
            <SketchPicker
              disabled={!selectedElements.length}
              color={selectedElements[0]?.backgroundColor ?? 'transparent'}
              onChange={(color) =>
                updateColors({
                  backgroundColor: color,
                })
              }
            />
          </div>
        </div>
        <div className="flex flex-row justify-between items-center gap-4">
          <AlignHorizontalSpaceBetween
            className="cursor-pointer"
            onClick={() => setAction('AlignHorizontalSpaceBetween')}
          />
          <AlignVerticalSpaceBetween
            className="cursor-pointer"
            onClick={() => setAction('AlignVerticalSpaceBetween')}
          />
          <AlignCenterHorizontal
            className="cursor-pointer"
            onClick={() => setAction('AlignCenterVertical')}
          />
          <AlignCenterVertical
            className="cursor-pointer"
            onClick={() => setAction('AlignCenterHorizontal')}
          />
        </div>
      </div>
    </header>
  );
};
