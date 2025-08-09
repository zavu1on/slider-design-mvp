'use client';

import { type FC, type Ref, useRef } from 'react';
import React from 'react';
import type ReactMoveable from 'react-moveable';
import type Selecto from 'react-selecto';
import {
  useGetCurrentPresentationSlide,
  useSaveHandler,
  useUndoableHandler,
} from './hooks';
import { Moveable, Selectable } from './lib';
import { useCanvasStore } from './store';
import { RenderElement } from './ui';

export type CanvasProps = {
  ref: Ref<HTMLDivElement>;
  className?: string;
  projectId: string;
};

export const Canvas: FC<CanvasProps> = ({ ref, className, projectId }) => {
  const { color } = useCanvasStore();
  const currentPresentationSlide = useGetCurrentPresentationSlide();

  const canvasRef = useRef<HTMLDivElement>(null);
  const moveableRef = useRef<ReactMoveable>(null);
  const selectoRef = useRef<Selecto>(null);

  useUndoableHandler();
  useSaveHandler(projectId);

  return (
    <>
      <div
        className={className}
        style={{ backgroundColor: color }}
        ref={(node) => {
          canvasRef.current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
      >
        {currentPresentationSlide?.elements.map((el) => (
          <RenderElement key={el.id} element={el} />
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
    </>
  );
};
