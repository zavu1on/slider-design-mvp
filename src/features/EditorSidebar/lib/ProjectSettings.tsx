'use client';

import type { FC } from 'react';
import {
  selectCurrentPresentationSlideColor,
  selectUpdateCurrentPresentationSlideColor,
  useSlideStore,
} from '@/entities/canvas';
import { ColorPicker } from '@/shared/ui';

export const ProjectSettings: FC = () => {
  const currentPresentationSlideColor = useSlideStore(
    selectCurrentPresentationSlideColor
  );
  const updateCurrentPresentationSlideColor = useSlideStore(
    selectUpdateCurrentPresentationSlideColor
  );

  return (
    <div className="text-gray-400">
      <div className="font-bold mb-2">Изменить цвет фона</div>
      <ColorPicker
        color={currentPresentationSlideColor}
        onChange={(color) => updateCurrentPresentationSlideColor(color.hex)}
        disableAlpha={true}
      />
    </div>
  );
};
