'use client';

import type { MoveableManagerInterface, Renderer } from 'react-moveable';

export const DimensionViewableAddon = {
  name: 'dimensionViewable',
  props: [],
  events: [],
  render(
    moveable: MoveableManagerInterface<unknown, unknown>,
    React: Renderer
  ) {
    const rect = moveable.getRect();

    return (
      <div
        key="dimension-viewer"
        className="moveable-dimension absolute bg-blue-400/90 text-white rounded px-2 py-1 text-sm whitespace-nowrap will-change-transform"
        style={{
          left: `${rect.width / 2}px`,
          top: `${rect.height + 20}px`,
          transform: `translate(-50%, 0px)`,
        }}
      >
        {Math.round(rect.offsetWidth)} x {Math.round(rect.offsetHeight)}
      </div>
    );
  },
};
