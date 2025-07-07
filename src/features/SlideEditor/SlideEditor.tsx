'use client';

import { FC, use, useEffect, useRef, useState } from 'react';
import { Canvas } from 'fabric';
import { useCanvasBackgroundStore } from '@/entities/slides';
import { Slide } from '@/generated/prisma';
import { cn } from '@/shared/lib';
import { useInitCanvas } from './lib';

type SlideEditorProps = {
  slide: Promise<Slide | null>;
};

export const SlideEditor: FC<SlideEditorProps> = ({ slide }) => {
  const slideData = use(slide);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<Canvas | null>(null);

  const color = useCanvasBackgroundStore((state) => state.color);

  useInitCanvas(canvasRef, setCanvas);

  useEffect(() => {
    if (canvas) {
      canvas.set({
        backgroundColor: color,
      });
      canvas.renderAll();
    }
  }, [canvas, color]);

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
