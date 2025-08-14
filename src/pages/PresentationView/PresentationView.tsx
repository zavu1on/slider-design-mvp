import type { FC } from 'react';
import type { Slide } from '@/generated/prisma';
import { SlidePresenter } from '@/widgets/SlidePresenter';

type PresentationViewProps = {
  slide: Slide;
};

export const PresentationView: FC<PresentationViewProps> = ({ slide }) => {
  return (
    <main className="w-full h-full flex align-center justify-center">
      <SlidePresenter slide={slide} />
    </main>
  );
};
