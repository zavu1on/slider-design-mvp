'use client';

import { type FC, type RefObject, useEffect, useRef, useState } from 'react';
import Moveable from 'react-moveable';
import Selecto from 'react-selecto';
import type { PresentationSlide } from '../schema';
import { useCanvasStore, useSelectedTargetsStore } from '../store';
import { useKeepRatio } from './useKeepRatio';
import { useMoveableHandlers } from './useMoveableHandlers';

type MoveableAndSelectableProps = {
  canvasRef: RefObject<HTMLDivElement | null>;
  currentPresentationSlide?: PresentationSlide;
};

export const MoveableAndSelectable: FC<MoveableAndSelectableProps> = ({
  canvasRef,
  currentPresentationSlide,
}) => {
  const { width, height } = useCanvasStore();
  const {
    dragHandler,
    dragEndHandler,
    resizeHandler,
    resizeEndHandler,
    rotateHandler,
    rotateEndHandler,
  } = useMoveableHandlers(currentPresentationSlide);

  const [verticalGuidelines, setVerticalGuidelines] = useState<number[]>([]);
  const [horizontalGuidelines, setHorizontalGuidelines] = useState<number[]>(
    []
  );

  const { targets, setTargets } = useSelectedTargetsStore();
  const moveableRef = useRef<Moveable>(null);
  const selectoRef = useRef<Selecto>(null);
  const keepRatio = useKeepRatio(moveableRef);

  useEffect(() => {
    if (!canvasRef.current) return;

    setVerticalGuidelines([
      width * 0.985,
      width * 0.75,
      width * 0.5,
      width * 0.25,
      width * 0.015,
    ]);
    setHorizontalGuidelines([
      height * 0.97,
      height * 0.75,
      height * 0.5,
      height * 0.25,
      height * 0.03,
    ]);
  }, [canvasRef, width, height]);

  return (
    <>
      <Selecto
        ref={selectoRef}
        container={canvasRef.current}
        dragContainer={document.querySelector('main')}
        selectableTargets={['.selectable']}
        selectByClick={true}
        selectFromInside={false}
        continueSelect={false}
        toggleContinueSelect={['shift']}
        hitRate={0}
        ratio={0}
        keyContainer={window}
        onSelect={(event) => {
          if (event.isDragStartEnd) {
            return;
          }

          console.log(event.selected.map((t) => `[data-id="${t.id}"]`));

          setTargets(event.selected.map((t) => `[data-id="${t.id}"]`));
        }}
        onSelectEnd={(event) => {
          if (event.isDragStartEnd) {
            event.inputEvent.preventDefault();
            moveableRef.current?.waitToChangeTarget().then(() => {
              moveableRef.current?.dragStart(event.inputEvent);
            });
          }
          setTargets(event.selected.map((t) => `[data-id="${t.id}"]`));
        }}
        onDragStart={(event) => {
          const target = event.inputEvent.target as HTMLElement;
          if (
            moveableRef.current?.isMoveableElement(target) ||
            targets.some((t) => t === `[data-id="${target.id}"]`)
          ) {
            event.stop();
          }
        }}
      />

      <Moveable
        ref={moveableRef}
        target={targets}
        container={null}
        origin={false}
        edge={false}
        // draggable
        draggable={true}
        throttleDrag={0}
        onDrag={({ target, left, top }) => dragHandler(target, left, top)}
        onDragEnd={({ target }) => dragEndHandler(target)}
        keepRatio={keepRatio}
        // resizable
        resizable={true}
        throttleResize={0}
        onResize={({ target, width, height, delta, direction }) =>
          resizeHandler(target, width, height, delta, direction)
        }
        onResizeEnd={({ target }) => resizeEndHandler(target)}
        // rotatable
        rotatable={true}
        throttleRotate={1}
        onRotate={({ target, transform }) => rotateHandler(target, transform)}
        onRotateEnd={({ target }) => rotateEndHandler(target)}
        // pinchable
        pinchable={false} // todo add pinchable
        // snappable
        snappable={true}
        isDisplaySnapDigit={true}
        isDisplayInnerSnapDigit={false}
        snapThreshold={5}
        snapDirections={{ top: true, left: true, bottom: true, right: true }}
        verticalGuidelines={verticalGuidelines}
        horizontalGuidelines={horizontalGuidelines}
        elementGuidelines={['.selectable']}
        elementSnapDirections={{
          top: true,
          left: true,
          bottom: true,
          right: true,
          center: true,
          middle: true,
        }}
        /*
         * groupable
         */
        onDragGroup={({ events }) => {
          events.forEach((ev) => dragHandler(ev.target, ev.left, ev.top));
        }}
        onDragGroupEnd={({ events }) => {
          events.forEach((ev) => dragEndHandler(ev.target));
        }}
        onResizeGroupStart={({ setMin, setMax }) => {
          setMin([0, 0]);
          setMax([0, 0]);
        }}
        onResizeGroup={({ events }) => {
          events.forEach((ev) => {
            resizeHandler(
              ev.target,
              ev.width,
              ev.height,
              ev.delta,
              ev.direction
            );
          });
        }}
        onResizeGroupEnd={({ events }) => {
          events.forEach((ev) => resizeEndHandler(ev.target));
        }}
        onRotateGroup={({ events }) => {
          events.forEach((ev) => rotateHandler(ev.target, ev.transform));
        }}
        onRotateGroupEnd={({ events }) => {
          events.forEach((ev) => rotateEndHandler(ev.target));
        }}
        onClickGroup={(event) => {
          selectoRef.current?.clickTarget(event.inputEvent, event.inputTarget);
        }}
      />
    </>
  );
};
