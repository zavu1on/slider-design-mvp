'use client';

import { useEffect, useState } from 'react';

export const useCalcContainerSize = () => {
  const [containerHeight, setContainerHeight] = useState('100%');
  const [containerWidth, setContainerWidth] = useState('100%');

  const calcContainerSize = () => {
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const slider = document.querySelector('.slider-container');

    if (!header || !footer || !slider) return;

    const maxWidth = window.innerWidth - slider.clientWidth - 32;
    const maxHeight =
      window.innerHeight - header.clientHeight - footer.clientHeight - 64;

    const calcHeight = (maxWidth * 9) / 16;
    const calcWidth = (maxHeight * 16) / 9;

    if (calcHeight <= maxHeight) {
      setContainerWidth(`${maxWidth}px`);
      setContainerHeight(`${calcHeight}px`);
    } else {
      setContainerWidth(`${calcWidth}px`);
      setContainerHeight(`${maxHeight}px`);
    }
  };

  useEffect(() => {
    calcContainerSize();
    window.addEventListener('resize', calcContainerSize);
    return () => window.removeEventListener('resize', calcContainerSize);
  }, []);

  return { containerHeight, containerWidth };
};
