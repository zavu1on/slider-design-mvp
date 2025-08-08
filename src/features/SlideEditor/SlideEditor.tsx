'use client';

import { type FC, memo, use, useEffect } from 'react';
import {
  CanvasElementType,
  type SlideData,
  useCanvas,
  useCanvasStore,
} from '@/entities/canvas';
import type { Slide } from '@/generated/prisma';

type SlideEditorProps = {
  slide: Promise<Slide | null>;
};

const SLIDE_DATA: SlideData = [
  {
    id: 'slide-1',
    elements: [
      {
        id: 'image-1',
        type: CanvasElementType.TEXT,
        content: 'image-1',
        x: 20,
        y: 20,
        width: 400,
        height: 300,
      },
      {
        id: 'image-2',
        type: CanvasElementType.TEXT,
        content: 'image-2',
        x: 450,
        y: 20,
        width: 400,
        height: 300,
      },
      {
        id: 'image-3',
        type: CanvasElementType.TEXT,
        content: 'image-3',
        x: 20,
        y: 350,
        width: 400,
        height: 300,
      },
    ],
  },
];

export const SlideEditor: FC<SlideEditorProps> = ({ slide }) => {
  const slideData = use(slide);
  const CanvasElement = useCanvas({});
  const { setSlideData, setCurrentSlideId } = useCanvasStore();

  const Canvas = memo(() => {
    return <CanvasElement />;
  });
  Canvas.displayName = 'Canvas';

  useEffect(() => {
    if (slideData) {
      console.log('INIT STATE');

      setSlideData(SLIDE_DATA);
      setCurrentSlideId(SLIDE_DATA[0].id);
    }
  }, [slideData]);

  return (
    <div>
      <Canvas />
      <div className={'text-gray-500 text-sm mt-2'}>
        Последнее обновление: {slideData?.updatedAt.toLocaleString()}
      </div>
    </div>
  );
};
