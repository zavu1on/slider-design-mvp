import type { FC } from 'react';
import type { CanvasElement } from '../schema';

export const TextViewer: FC<{
  element: CanvasElement;
}> = ({ element }) => {
  return (
    <div
      className="size-full flex items-center justify-center text-black text-3xl border-radius-inherit"
      style={{
        backgroundColor: element.backgroundColor,
        color: element.color,
      }}
    >
      {element.content}
    </div>
  );
};
