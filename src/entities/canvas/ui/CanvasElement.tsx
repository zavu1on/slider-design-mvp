'use client';

import { type FC, memo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useSlideStore } from '../store';
import { RenderElement } from './RenderElement';

type CanvasElementProps = {
  slideId: string | null;
  elementId: string;
  viewMode?: boolean;
};

export const CanvasElement: FC<CanvasElementProps> = memo(
  ({ slideId, elementId, viewMode }) => {
    const element = useSlideStore(
      useShallow(
        (state) => slideId && state.slides[slideId].elements[elementId]
      )
    );

    if (!element) return null;

    return <RenderElement element={element} viewMode={viewMode} />;
  }
);

CanvasElement.displayName = 'CanvasElement';
