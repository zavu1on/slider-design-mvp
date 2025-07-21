import type { FC } from 'react';
import type { CanvasElement } from '../schema';

const generateBackgroundColor = (elementId: string): string => {
  const hash = Math.abs(
    elementId.split('').reduce((a, b) => {
      a = a + b.charCodeAt(0);
      return a;
    }, 0)
  );

  const hue = hash % 360;
  const saturation = 70 + (hash % 30);
  const lightness = 50 + (hash % 20);

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

export const GeometricViewer: FC<{
  element: CanvasElement;
}> = ({ element }) => {
  const background = generateBackgroundColor(element.id);

  return (
    <div
      className="size-full flex items-center justify-center text-white text-3xl"
      style={{ background }}
    >
      {element.content}
    </div>
  );
};
