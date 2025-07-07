'use client';

import { Dispatch, RefObject, SetStateAction, useEffect } from 'react';
import { Canvas } from 'fabric';

export const useInitCanvas = (
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

      console.log(scaleFactor);

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
};
