'use client';

import { type FC, type MouseEvent, useRef } from 'react';
import { X } from 'lucide-react';
import {
  type PresentationSlide,
  PresentationSlideViewer,
  useMemorizedSlideData,
} from '@/entities/canvas';
import { cn } from '@/shared/lib';

type SlideCardProps = {
  slide: PresentationSlide;
  index: number;
  slideDataLength: number;
};

export const SlideCard: FC<SlideCardProps> = ({
  slide,
  index,
  slideDataLength,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { currentSlideId, removePresentationSlide, setCurrentSlideId } =
    useMemorizedSlideData();

  const removeSideHandler = (
    event: MouseEvent<HTMLDivElement>,
    slideId: string
  ) => {
    if (slideDataLength > 1) {
      event.stopPropagation();
      removePresentationSlide(slideId);
    }
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        'min-w-[160px] max-w-[160px] min-h-[90px] max-h-[90px] rounded-md cursor-pointer border relative shadow hover:shadow-gray-400 transition-all',
        {
          'shadow border-gray-300 shadow-gray-400': slide.id === currentSlideId,
        }
      )}
      onClick={() => setCurrentSlideId(slide.id)}
    >
      <PresentationSlideViewer slide={slide} containerRef={cardRef} />
      <div className="text-sm text-gray-500 absolute right-1 bottom-0.5">
        {index + 1}
      </div>
      <div
        className={cn(
          'rounded-full border border-red-600 text-red-600 absolute top-0.5 right-0.5 p-1',
          {
            'border-gray-400 text-gray-400 cursor-not-allowed':
              slideDataLength <= 1,
          }
        )}
        onClick={(event) => removeSideHandler(event, slide.id)}
      >
        <X className="w-4 h-4" />
      </div>
    </div>
  );
};
