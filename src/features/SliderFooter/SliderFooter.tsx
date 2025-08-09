'use client';

import type { FC, MouseEvent } from 'react';
import { CirclePlus, X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { useSlideData } from '@/entities/canvas';
import { cn } from '@/shared/lib';

export const SliderFooter: FC = () => {
  const {
    slideData,
    currentSlideId,
    addPresentationSlide,
    setCurrentSlideId,
    removePresentationSlide,
  } = useSlideData();

  const removeSideHandler = (
    event: MouseEvent<HTMLDivElement>,
    slideId: string
  ) => {
    if (slideData.length > 1) {
      event.stopPropagation();
      removePresentationSlide(slideId);
    }
  };

  return (
    <footer className="w-full pb-4 pr-4">
      <div className="flex flex-row items-center gap-2 w-full py-3 px-4 bg-gray-50 shadow">
        {slideData.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              'w-[160px] h-[90px] rounded-md cursor-pointer border relative shadow hover:shadow-gray-400 transition-all',
              {
                'shadow border-gray-300 shadow-gray-400':
                  slide.id === currentSlideId,
              }
            )}
            onClick={() => setCurrentSlideId(slide.id)}
          >
            <div className="text-sm text-gray-500 absolute right-1 bottom-0.5">
              {index + 1}
            </div>
            <div
              className={cn(
                'rounded-full border border-red-600 text-red-600 absolute top-0.5 right-0.5 p-1',
                {
                  'border-gray-400 text-gray-400 cursor-not-allowed':
                    slideData.length <= 1,
                }
              )}
              onClick={(event) => removeSideHandler(event, slide.id)}
            >
              <X className="w-4 h-4" />
            </div>
          </div>
        ))}
        <div
          className="w-[160px] h-[90px] rounded-md cursor-pointer border flex items-center justify-center shadow hover:shadow-gray-400 transition-all"
          onClick={() => addPresentationSlide(uuidv4())}
        >
          <CirclePlus className="w-8 h-8 text-gray-300" />
        </div>
      </div>
    </footer>
  );
};
