'use client';

import { type FC, useMemo } from 'react';
import { cn } from '@/shared/lib';
import { type CanvasElement, CanvasElementType } from '../schema';
import { GeometricViewer } from './GeometricViewer';
import { ImageViewer } from './ImageViewer';
import { ReadonlyTextViewer, TextViewer } from './TextViewer';

type RenderElementProps = {
  element: CanvasElement;
  viewMode?: boolean;
};

export const RenderElement: FC<RenderElementProps> = ({
  element,
  viewMode = false,
}) => {
  const content = useMemo(() => {
    switch (element.type) {
      case CanvasElementType.IMAGE:
        return <ImageViewer element={element} />;
      case CanvasElementType.FIGURE:
        return <GeometricViewer element={element} />;
      case CanvasElementType.TEXT:
        return viewMode ? (
          <ReadonlyTextViewer element={element} />
        ) : (
          <TextViewer element={element} />
        );
      default:
        return <TextViewer element={element} />;
    }
  }, [element, viewMode]);

  return (
    <div
      id={viewMode ? undefined : element.id}
      data-id={viewMode ? undefined : element.id}
      className={cn('absolute', {
        selectable: !viewMode,
      })}
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
