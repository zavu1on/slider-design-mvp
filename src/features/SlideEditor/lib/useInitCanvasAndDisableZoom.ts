'use client';

import {
  type Dispatch,
  type RefObject,
  type SetStateAction,
  useEffect,
} from 'react';
import { Canvas } from 'fabric';

export const useInitCanvasAndDisableZoom = (
  canvasRef: RefObject<HTMLCanvasElement | null>,
  setCanvas: Dispatch<SetStateAction<Canvas | null>>
) => {
  useEffect(() => {
    if (canvasRef.current) {
      const initCanvas = new Canvas(canvasRef.current, {
        backgroundColor: '#fff',
        width: 1280 / 2,
        height: 720 / 2,
      });
      const scaleFactor = window.devicePixelRatio || 1;

      initCanvas.setDimensions({
        width: (1280 * scaleFactor) / 1.5,
        height: (720 * scaleFactor) / 1.5,
      });
      initCanvas.setZoom(1 / scaleFactor);

      initCanvas.renderAll();
      setCanvas(initCanvas);

      return () => {
        initCanvas.dispose();
      };
    }
  }, [canvasRef, setCanvas]);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey) event.preventDefault();
    };
    document.addEventListener('wheel', handleWheel);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && (event.key === '+' || event.key === '-')) {
        event.preventDefault();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
};
