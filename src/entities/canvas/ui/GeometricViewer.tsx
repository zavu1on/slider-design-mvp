import type { FC } from 'react';
import { stringToStyle } from '@/shared/lib';
import type { CanvasElement } from '../schema';

export const GeometricViewer: FC<{
  element: CanvasElement;
}> = ({ element }) => {
  return (
    <div
      className="size-full border-radius-inherit bg-gray-800"
      style={{
        clipPath: element.content,
        backgroundColor: element.backgroundColor,
        borderRadius: element.borderRadius,
        ...stringToStyle(element.styleString),
      }}
    ></div>
  );
};
