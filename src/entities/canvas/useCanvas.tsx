'use client';

import { type FC, useRef } from 'react';
import { Canvas, type CanvasProps } from './Canvas';
import { useInitCanvas, usePreventWheelEvent } from './hooks';

type UseCanvasArgs = {
  projectId: string;
  width?: number;
  height?: number;
} & Omit<CanvasProps, 'ref'>;

type UseCanvas = (props: UseCanvasArgs) => FC;

export const useCanvas: UseCanvas = ({
  projectId,
  className,
  width = 1280,
  height = 720,
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useInitCanvas(width, height, containerRef, canvasRef);
  usePreventWheelEvent();

  return function CanvasWrapper() {
    return (
      <div
        ref={containerRef}
        className="w-[50vw] h-[calc(50vw*0.5625)] overflow-hidden shadow"
      >
        <Canvas ref={canvasRef} className={className} projectId={projectId} />
      </div>
    );
  };
};
