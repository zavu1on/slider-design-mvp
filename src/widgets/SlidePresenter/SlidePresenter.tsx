'use client';

import { type FC, useCallback, useEffect, useRef, useState } from 'react';
import { PresentationSlideViewer, type SlideData } from '@/entities/canvas';
import type { Slide } from '@/generated/prisma';

type SlidePresenterProps = {
  slide: Slide;
};

export const SlidePresenter: FC<SlidePresenterProps> = ({ slide }) => {
  const slideData = JSON.parse(slide.data) as SlideData;

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState('100%');
  const [containerWidth, setContainerWidth] = useState('100%');

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const onKeydown = useCallback(
    (event: KeyboardEvent) => {
      if (
        (event.key === 'ArrowRight' || event.key === 'Space') &&
        currentSlideIndex < slideData.length - 1
      ) {
        setCurrentSlideIndex((prev) => prev + 1);
      } else if (event.key === 'ArrowLeft' && currentSlideIndex > 0) {
        setCurrentSlideIndex((prev) => prev - 1);
      }
    },
    [currentSlideIndex, slideData.length]
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeydown);

    return () => {
      document.removeEventListener('keydown', onKeydown);
    };
  }, [onKeydown]);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const calcHeight = (width * 9) / 16;
    const calcWidth = (height * 16) / 9;

    if (calcHeight <= height) {
      setContainerWidth(`${width}px`);
      setContainerHeight(`${calcHeight}px`);
    } else {
      setContainerWidth(`${calcWidth}px`);
      setContainerHeight(`${height}px`);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ height: containerHeight, width: containerWidth }}
    >
      <PresentationSlideViewer
        presentationSlide={slideData[currentSlideIndex]}
        containerRef={containerRef}
      />
    </div>
  );
};
