'use client';

import { type FC, type RefObject, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import ReactMoveable from 'react-moveable';
import type Selecto from 'react-selecto';
import {
  useAlignElements,
  useDeleteItemHandler,
  useKeepRatio,
  useMoveableHandlers,
} from '../hooks';
import type { PresentationSlide } from '../schema';
import { useCanvasStore, useSelectedTargetsStore } from '../store';
import { DimensionViewableAddon } from '../ui';

type MoveableProps = {
  canvasRef: RefObject<HTMLDivElement | null>;
  currentPresentationSlide?: PresentationSlide;
};

export const Moveable: FC<MoveableProps> = ({
  canvasRef,
  currentPresentationSlide,
}) => {
  const [verticalGuidelines, setVerticalGuidelines] = useState<number[]>([]);
  const [horizontalGuidelines, setHorizontalGuidelines] = useState<number[]>(
    []
  );

  const { targets } = useSelectedTargetsStore();

  const moveableRef = useRef<ReactMoveable>(null);
  const selectoRef = useRef<Selecto>(null);
  const keepRatio = useKeepRatio(moveableRef);

  const { width, height } = useCanvasStore();
  const {
    dragHandler,
    dragEndHandler,
    resizeHandler,
    resizeEndHandler,
    rotateHandler,
    rotateEndHandler,
    roundHandler,
    roundEndHandler,
  } = useMoveableHandlers(currentPresentationSlide);

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

  useDeleteItemHandler(currentPresentationSlide?.id);
  useAlignElements(moveableRef);

  return (
    <ReactMoveable
      ref={moveableRef}
      target={targets}
      container={null}
      origin={false}
      edge={false}
      flushSync={flushSync}
      ables={[DimensionViewableAddon]}
      props={{
        dimensionViewable: true,
      }}
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
      // roundable
      roundable={true}
      roundClickable={true}
      isDisplayShadowRoundControls="horizontal"
      roundPadding={25}
      onRound={({ target, borderRadius }) => roundHandler(target, borderRadius)}
      onRoundEnd={({ target }) => roundEndHandler(target)}
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
      // groupable
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
          resizeHandler(ev.target, ev.width, ev.height, ev.delta, ev.direction);
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
      onRoundGroup={({ events }) => {
        events.forEach((ev) => roundHandler(ev.target, ev.borderRadius));
      }}
      onRoundGroupEnd={({ events }) => {
        events.forEach((ev) => roundEndHandler(ev.target));
      }}
    />
  );
};
