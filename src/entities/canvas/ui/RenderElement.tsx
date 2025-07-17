import type { FC } from 'react';
import type { CanvasElement } from '../schema';

type CanvasElementProps = {
  el: CanvasElement;
};

export const RenderElement: FC<CanvasElementProps> = ({ el }) => {
  const background = `hsl(${Math.random() * 360}, 50%, 30%)`;

  return (
    <>
      <div
        id={el.id}
        className="absolute selectable"
        style={{
          background,
          width: el.width,
          height: el.height,
          left: el.x,
          top: el.y,
          transform: `rotate(${el.rotation ?? 0}deg)`,
        }}
      >
        <div className="size-full flex items-center justify-center text-white text-3xl">
          {el.id}
        </div>
      </div>
    </>
  );
};
