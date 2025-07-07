'use client';

import { FC } from 'react';
import { useCanvasBackgroundStore } from '@/entities/slides';
import { ColorPicker } from '@/shared/ui';

export const SettingsContent: FC = () => {
  const { color, setColor } = useCanvasBackgroundStore();

  return (
    <div className="text-gray-400">
      <div className="font-bold mb-2">Изменить цвет фона</div>
      <ColorPicker
        color={color}
        onChange={(color) => setColor(color.hex)}
        disableAlpha={true}
      />
    </div>
  );
};
