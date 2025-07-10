'use client';

import { type FC, use, useEffect, useRef, useState } from 'react';
import { type Canvas, FabricImage } from 'fabric';
import { useAddImageStore, useCanvasBackgroundStore } from '@/entities/slides';
import type { Slide } from '@/generated/prisma';
import { cn } from '@/shared/lib';
import { useInitCanvasAndDisableZoom } from './lib';

type SlideEditorProps = {
  slide: Promise<Slide | null>;
};

export const SlideEditor: FC<SlideEditorProps> = ({ slide }) => {
  const slideData = use(slide);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<Canvas | null>(null);

  const color = useCanvasBackgroundStore((state) => state.color);
  const { image, clear } = useAddImageStore();

  useInitCanvasAndDisableZoom(canvasRef, setCanvas);

  useEffect(() => {
    if (canvas) {
      canvas.set({
        backgroundColor: color,
      });
      canvas.renderAll();
    }
  }, [canvas, color]);

  useEffect(() => {
    const addImage = async () => {
      if (canvas && image) {
        const canvasImage = await FabricImage.fromURL(image.filePath);
        canvas.add(canvasImage);
        canvas.renderAll();

        clear();
      }
    };

    addImage();
  }, [canvas, image]);

  return (
    <div>
      <canvas ref={canvasRef} />
      <div
        className={cn('text-gray-500 text-sm mt-2', {
          hidden: !canvas,
        })}
      >
        Последнее обновление: {slideData?.updatedAt.toLocaleString()}
      </div>
    </div>
  );
};
