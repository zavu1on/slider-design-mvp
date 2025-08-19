'use client';

import { type FC, type Ref, useRef } from 'react';
import React from 'react';
import type ReactMoveable from 'react-moveable';
import type Selecto from 'react-selecto';
import { useShallow } from 'zustand/react/shallow';
import { Hookable, Moveable, Selectable } from './lib';
import {
  selectCurrentPresentationSlideColor,
  selectCurrentSlideId,
  useSlideStore,
} from './store';
import { CanvasElement } from './ui';

export type CanvasProps = {
  ref: Ref<HTMLDivElement>;
  className?: string;
  projectId: string;
};

export const Canvas: FC<CanvasProps> = ({ ref, className, projectId }) => {
  const currentSlideId = useSlideStore(selectCurrentSlideId);
  const currentPresentationSlideColor = useSlideStore(
    selectCurrentPresentationSlideColor
  );
  const elementIds = useSlideStore(
    useShallow((state) =>
      state.currentSlideId ? state.slides[state.currentSlideId].elementIds : []
    )
  );

  const canvasRef = useRef<HTMLDivElement>(null);
  const moveableRef = useRef<ReactMoveable>(null);
  const selectoRef = useRef<Selecto>(null);

  return (
    <>
      <div
        className={className}
        style={{
          background: currentPresentationSlideColor,
        }}
        ref={(node) => {
          canvasRef.current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
      >
        {elementIds.map((id) => (
          <CanvasElement key={id} slideId={currentSlideId} elementId={id} />
        ))}
      </div>
      <Moveable
        canvasRef={canvasRef}
        moveableRef={moveableRef}
        selectoRef={selectoRef}
      />
      <Selectable
        canvasRef={canvasRef}
        moveableRef={moveableRef}
        selectoRef={selectoRef}
      />
      <Hookable projectId={projectId} />
    </>
  );
};
