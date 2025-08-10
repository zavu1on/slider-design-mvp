'use client';

import { type FC, useMemo } from 'react';
import { Square, Type } from 'lucide-react';
import {
  type CanvasElement,
  useGetCurrentPresentationSlide,
  useMemorizedSlideData,
} from '@/entities/canvas';
import { useSelectedTargetsStore } from '@/entities/canvas/store';
import { Input } from '@/generated/shadcn/input';
import { SketchPicker } from '@/shared/ui';

export const ElementEditor: FC = () => {
  const currentPresentationSlide = useGetCurrentPresentationSlide();
  const { currentSlideId, updateCanvasElement } = useMemorizedSlideData();
  const { targets } = useSelectedTargetsStore();

  const selectedElements = useMemo(
    () =>
      currentPresentationSlide?.elements.filter((slide) =>
        targets.includes(`[data-id="${slide.id}"]`)
      ) ?? [],
    [currentPresentationSlide?.elements, targets]
  );

  const updateElement = (
    fields: Partial<
      Pick<CanvasElement, 'color' | 'backgroundColor' | 'styleString'>
    >
  ) => {
    if (selectedElements?.length && currentSlideId) {
      for (const element of selectedElements) {
        updateCanvasElement(currentSlideId, { ...element, ...fields });
      }
    }
  };

  const updateColor = (
    field:
      | {
          color: string;
        }
      | {
          backgroundColor: string;
        }
  ) => {
    let [fieldKey] = Object.entries(field)[0];
    let styleString = selectedElements[0]?.styleString;

    if (fieldKey === 'backgroundColor') fieldKey = 'background-color';
    if (!styleString) {
      updateElement(field);
      return;
    }

    styleString = styleString
      .split(';')
      .filter((style) => {
        const pair = style.split(':');
        if (pair.length !== 2) return style;

        const [key] = pair;
        if (key.trim() === fieldKey) return;

        return style;
      })
      .join(';');
    updateElement({ ...field, styleString });
  };

  const updateStyle = (styleString: string) => {
    const updateData: Partial<
      Pick<CanvasElement, 'color' | 'backgroundColor' | 'styleString'>
    > = {
      styleString,
    };

    for (const style of styleString.split(';')) {
      const pair = style.split(':');
      if (pair.length !== 2) continue;

      const [key, value] = pair;
      if (key.trim() === 'color') updateData.color = value.trim();
      if (key.trim() === 'background-color')
        updateData.backgroundColor = value.trim();
    }

    updateElement(updateData);
  };

  return (
    <div className="text-gray-400 h-full">
      <div className="font-bold">Отредактировать элемент</div>
      <div className="flex flex-row gap-4 mt-2">
        <div className="flex flex-row gap-2">
          <Type className="color-gray-800" />
          <SketchPicker
            disabled={!selectedElements.length}
            color={selectedElements[0]?.color ?? '#ffffff'}
            onChange={(color) => updateColor({ color })}
          />
        </div>
        <div className="flex flex-row gap-2">
          <Square className="color-gray-800" />
          <SketchPicker
            disabled={!selectedElements.length}
            color={selectedElements[0]?.backgroundColor ?? 'transparent'}
            onChange={(backgroundColor) =>
              updateColor({
                backgroundColor,
              })
            }
          />
        </div>
      </div>
      <div className="font-bold mt-6">CSS редактор</div>
      <div className="mt-2">
        <Input
          disabled={!selectedElements?.length}
          placeholder="color: red; font-size: 16px"
          value={selectedElements[0]?.styleString ?? ''}
          onChange={(event) => updateStyle(event.target.value)}
        />
      </div>
    </div>
  );
};
