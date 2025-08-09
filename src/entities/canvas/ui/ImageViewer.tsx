'use client';

import type { FC } from 'react';
import Image from 'next/image';
import { stringToStyle } from '@/shared/lib';
import type { CanvasElement } from '../schema';

export const ImageViewer: FC<{
  element: CanvasElement;
}> = ({ element }) => {
  return (
    <Image
      alt={element.id}
      src={element.content}
      width={element.width}
      height={element.height}
      className="object-fill h-inherit border-radius-inherit"
      style={stringToStyle(element.styleString)}
    />
  );
};
