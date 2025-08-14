'use client';

import { type FC, useEffect, useState } from 'react';
import { CirclePlus } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { useMemorizedSlideData } from '@/entities/canvas';
import { SlideCard } from './ui';

export const SliderFooter: FC = () => {
  const [maxWidth, setMaxWidth] = useState<string>('100%');
  const { slideData, addPresentationSlide } = useMemorizedSlideData();

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
      className="w-full pb-4 pr-2 md:pr-4"
      style={{
        maxWidth,
      }}
    >
      <div className="flex flex-row items-center gap-2 w-full py-3 px-4 bg-gray-50 shadow overflow-x-scroll overflow-y-hidden">
        {slideData.map((slide, index) => (
          <SlideCard
            key={slide.id}
            slide={slide}
            index={index}
            slideDataLength={slideData.length}
          />
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
