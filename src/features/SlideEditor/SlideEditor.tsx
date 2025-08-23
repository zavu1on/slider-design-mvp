'use client';

import { type FC, memo, use, useEffect } from 'react';
import {
  type SlideData,
  selectSetCurrentSlideId,
  selectSetSlideData,
  useCanvas,
  useSlideStore,
} from '@/entities/canvas';
import type { Slide } from '@/generated/prisma';
import { LastUpdateLabel } from './ui';

type SlideEditorProps = {
  slide: Promise<Slide | null>;
};

export const SlideEditor: FC<SlideEditorProps> = ({ slide }) => {
  const slideData = use(slide);
  const CanvasElement = useCanvas({
    projectId: slideData!.id,
  });

  const setSlideData = useSlideStore(selectSetSlideData);
  const setCurrentSlideId = useSlideStore(selectSetCurrentSlideId);

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
  }, [setCurrentSlideId, setSlideData, slideData]);

  return (
    <div>
      <Canvas />
      <LastUpdateLabel />
    </div>
  );
};
