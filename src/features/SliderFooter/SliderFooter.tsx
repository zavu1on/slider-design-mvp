'use client';

import { type FC, type MouseEvent, useEffect, useState } from 'react';
import { CirclePlus, X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { useMemorizedSlideData } from '@/entities/canvas';
import { cn } from '@/shared/lib';

export const SliderFooter: FC = () => {
  const [maxWidth, setMaxWidth] = useState<string>('100%');
  const {
    slideData,
    currentSlideId,
    addPresentationSlide,
    setCurrentSlideId,
    removePresentationSlide,
  } = useMemorizedSlideData();

  const removeSideHandler = (
    event: MouseEvent<HTMLDivElement>,
    slideId: string
  ) => {
    if (slideData.length > 1) {
      event.stopPropagation();
      removePresentationSlide(slideId);
    }
  };

  useEffect(() => {
    const updateMaxWidth = () => {
      if (window.innerWidth <= 768) return;

      const sidebar = document.querySelector('.slider-container');
      const sidebarWidth = sidebar?.clientWidth || 284;
      const calculatedWidth = `calc(100vw - ${sidebarWidth}px - 16px)`;
      setMaxWidth(calculatedWidth);
    };

    updateMaxWidth();
    window.addEventListener('resize', updateMaxWidth);

    return () => window.removeEventListener('resize', updateMaxWidth);
  }, []);

  return (
    <footer
      className="w-full pb-4 pr-4"
      style={{
        maxWidth,
      }}
    >
      <div className="flex flex-row items-center gap-2 w-full py-3 px-4 bg-gray-50 shadow overflow-x-scroll">
        {slideData.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              'min-w-[160px] min-h-[90px] rounded-md cursor-pointer border relative shadow hover:shadow-gray-400 transition-all',
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
          className="min-w-[160px] min-h-[90px] rounded-md cursor-pointer border flex items-center justify-center shadow hover:shadow-gray-400 transition-all"
          onClick={() => addPresentationSlide(uuidv4())}
        >
          <CirclePlus className="w-8 h-8 text-gray-300" />
        </div>
      </div>
    </footer>
  );
};
