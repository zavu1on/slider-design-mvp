'use client';

import type { FC, RefObject } from 'react';
import type Moveable from 'react-moveable';
import Selecto from 'react-selecto';
import { useSelectableHandlers } from '../hooks';

type SelectableProps = {
  canvasRef: RefObject<HTMLDivElement | null>;
  moveableRef: RefObject<Moveable | null>;
  selectoRef: RefObject<Selecto | null>;
};

export const Selectable: FC<SelectableProps> = ({
  canvasRef,
  moveableRef,
  selectoRef,
}) => {
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
