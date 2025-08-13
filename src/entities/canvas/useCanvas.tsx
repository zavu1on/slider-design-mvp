'use client';

import { type FC, useRef } from 'react';
import { Canvas, type CanvasProps } from './Canvas';
import {
  useCalcContainerSize,
  useInitCanvas,
  usePreventWheelEvent,
} from './hooks';

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

  const { containerWidth, containerHeight } = useCalcContainerSize();
  useInitCanvas(width, height, containerRef, canvasRef);
  usePreventWheelEvent();

  return function CanvasWrapper() {
    return (
      <div
        ref={containerRef}
        className="overflow-hidden shadow"
        style={{ width: containerWidth, height: containerHeight }}
      >
        <Canvas ref={canvasRef} className={className} projectId={projectId} />
      </div>
    );
  };
};
