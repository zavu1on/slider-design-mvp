'use client';

import type { FC } from 'react';
import {
  useGetCurrentPresentationSlide,
  useMemorizedSlideData,
} from '@/entities/canvas';
import { ColorPicker } from '@/shared/ui';

export const ProjectSettings: FC = () => {
  const currentPresentationSlide = useGetCurrentPresentationSlide();
  const { updateCurrentPresentationSlideColor } = useMemorizedSlideData();

  return (
    <div className="text-gray-400">
      <div className="font-bold mb-2">Изменить цвет фона</div>
      <ColorPicker
        color={currentPresentationSlide?.color ?? '#ffffff'}
        onChange={(color) => updateCurrentPresentationSlideColor(color.hex)}
        disableAlpha={true}
      />
    </div>
  );
};
