'use client';

import { type FC, useMemo } from 'react';
import { type CanvasElement, CanvasElementType } from '../schema';
import { GeometricViewer } from './GeometricViewer';
import { ImageViewer } from './ImageViewer';

export const RenderElement: FC<{
  element: CanvasElement;
}> = ({ element }) => {
  const content = useMemo(() => {
    switch (element.type) {
      case CanvasElementType.IMAGE:
        return <ImageViewer element={element} />;
      case CanvasElementType.FIGURE:
        return <GeometricViewer element={element} />;
      default:
        return <GeometricViewer element={element} />;
    }
  }, [element]);

  return (
    <div
      id={element.id}
      data-id={element.id}
      className="absolute selectable"
      style={{
        width: element.width,
        height: element.height,
        left: element.x,
        top: element.y,
        transform: `rotate(${element.rotation ?? 0}deg)`,
      }}
    >
      {content}
    </div>
  );
};
