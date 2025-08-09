'use client';

import { type FC, useMemo } from 'react';
import { cn } from '@/shared/lib';
import { type CanvasElement, CanvasElementType } from '../schema';
import { GeometricViewer } from './GeometricViewer';
import { ImageViewer } from './ImageViewer';
import { TextViewer } from './TextViewer';

export const RenderElement: FC<{
  element: CanvasElement;
}> = ({ element }) => {
  const content = useMemo(() => {
    switch (element.type) {
      case CanvasElementType.IMAGE:
        return <ImageViewer element={element} />;
      case CanvasElementType.FIGURE:
        return <GeometricViewer element={element} />;
      case CanvasElementType.TEXT:
        return <TextViewer element={element} />;
      default:
        return <TextViewer element={element} />;
    }
  }, [element]);

  return (
    <div
      id={element.id}
      data-id={element.id}
      className={cn('absolute selectable')}
      style={{
        width: element.width,
        height: element.height,
        left: element.x,
        top: element.y,
        transform: `rotate(${element.rotation ?? 0}deg)`,
        borderRadius: element.borderRadius,
      }}
    >
      {content}
    </div>
  );
};
