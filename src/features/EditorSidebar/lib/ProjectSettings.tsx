'use client';

import type { FC } from 'react';
import { useCanvasStore } from '@/entities/canvas';
import { ColorPicker } from '@/shared/ui';

export const ProjectSettings: FC = () => {
  const { color, setColor } = useCanvasStore();

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
