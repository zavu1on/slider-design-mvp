'use client';

import { type RefObject, useEffect, useState } from 'react';
import type Moveable from 'react-moveable';

export const useKeepRatio = (moveableRef: RefObject<Moveable | null>) => {
  const [keepRatio, setKeepRatio] = useState(false);

  const onKeydown = (event: KeyboardEvent) => {
    if (event.shiftKey) setKeepRatio(true);
  };

  const onKeyup = (event: KeyboardEvent) => {
    setKeepRatio((prev) => (event.shiftKey ? prev : false));
  };

  useEffect(() => {
    if (!moveableRef.current) return;

    document.addEventListener('keydown', onKeydown);
    document.addEventListener('keyup', onKeyup);

    return () => {
      document.removeEventListener('keydown', onKeydown);
      document.removeEventListener('keyup', onKeyup);
    };
  }, [moveableRef]);

  return keepRatio;
};
