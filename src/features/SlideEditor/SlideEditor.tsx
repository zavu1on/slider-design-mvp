'use client';

import { type FC, memo, use, useEffect } from 'react';
import {
  type SlideData,
  useCanvas,
  useMemorizedSlideData,
} from '@/entities/canvas';
import type { Slide } from '@/generated/prisma';

type SlideEditorProps = {
  slide: Promise<Slide | null>;
};

export const SlideEditor: FC<SlideEditorProps> = ({ slide }) => {
  const slideData = use(slide);
  const CanvasElement = useCanvas({
    projectId: slideData!.id,
  });
  const { hasUnsavedChanges, lastUpdatedAt, setSlideData, setCurrentSlideId } =
    useMemorizedSlideData();

  const Canvas = memo(() => {
    return <CanvasElement />;
  });
  Canvas.displayName = 'Canvas';

  useEffect(() => {
    if (slideData) {
      const slideDataObj = JSON.parse(slideData.data) as SlideData;
      setSlideData(slideDataObj, slideData.updatedAt);
      setCurrentSlideId(slideDataObj[0].id);
    }
  }, [slideData]);

  return (
    <div>
      <Canvas />
      <div className="flex flex-row justify-between text-sm mt-2">
        <div className="text-gray-500">
          Последнее обновление: {lastUpdatedAt?.toLocaleString()}
        </div>
        {hasUnsavedChanges && (
          <div className="text-red-500">Есть несохраненные изменения</div>
        )}
      </div>
    </div>
  );
};
