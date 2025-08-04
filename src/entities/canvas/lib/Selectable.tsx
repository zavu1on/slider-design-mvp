'use client';

import { type FC, type RefObject, useRef } from 'react';
import type Moveable from 'react-moveable';
import Selecto from 'react-selecto';
import { useSelectableHandlers } from '../hooks';

type SelectableProps = {
  canvasRef: RefObject<HTMLDivElement | null>;
};

export const Selectable: FC<SelectableProps> = ({ canvasRef }) => {
  const moveableRef = useRef<Moveable>(null);
  const selectoRef = useRef<Selecto>(null);

  const { selectHandler, selectEndHandler, dragStartHandler } =
    useSelectableHandlers(moveableRef, canvasRef);

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
        onSelect={selectHandler}
        onSelectEnd={selectEndHandler}
        onDragStart={dragStartHandler}
      />
    </>
  );
};
