'use client';

import { type FC, use } from 'react';
import { useCanvas } from '@/entities/canvas';
import type { Slide } from '@/generated/prisma';

type SlideEditorProps = {
  slide: Promise<Slide | null>;
};

export const SlideEditor: FC<SlideEditorProps> = ({ slide }) => {
  const slideData = use(slide);
  const Canvas = useCanvas({});

  return (
    <div>
      <Canvas />
      <div className={'text-gray-500 text-sm mt-2'}>
        Последнее обновление: {slideData?.updatedAt.toLocaleString()}
      </div>
    </div>
  );
};
