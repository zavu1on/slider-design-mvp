'use client';

import { type FC, useEffect, useRef } from 'react';
import { Canvas, type CanvasProps } from './Canvas';
import { useInitCanvas } from './hooks';

type UseCanvasArgs = {
  color?: string;
  width?: number;
  height?: number;
} & Omit<CanvasProps, 'ref'>;

type UseCanvas = (props: UseCanvasArgs) => FC;

export const useCanvas: UseCanvas = ({
  className,
  color = '#ffffff',
  width = 1280,
  height = 720,
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useInitCanvas(color, width, height, containerRef, canvasRef);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey) event.preventDefault();
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && (event.key === '+' || event.key === '-')) {
        event.preventDefault();
      }
    };
    document.addEventListener('wheel', handleWheel);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return function CanvasWrapper() {
    return (
      <div
        ref={containerRef}
        className="w-[50vw] h-[calc(50vw*0.5625)] overflow-hidden shadow"
      >
        <Canvas ref={canvasRef} className={className} />
      </div>
    );
  };
};
