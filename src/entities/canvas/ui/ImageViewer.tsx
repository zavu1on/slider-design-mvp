'use client';

import type { FC } from 'react';
import Image from 'next/image';
import type { CanvasElement } from '../schema';

export const ImageViewer: FC<{
  element: CanvasElement;
}> = ({ element }) => {
  return (
    <Image
      alt={element.id}
      src={location.origin + element.content}
      width={element.width}
      height={element.height}
      className="object-fill h-inherit"
    />
  );
};
