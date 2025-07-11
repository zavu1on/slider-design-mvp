import { type FC, type Ref, useMemo } from 'react';
import { cn } from '@/shared/lib';
import { useCanvasStore } from '../store';

export type CanvasProps = {
  ref: Ref<HTMLDivElement>;
  className?: string;
};

export const Canvas: FC<CanvasProps> = ({ ref, className }) => {
  const { color, slideData, currentSlideId } = useCanvasStore();
  const currentPresentationSlide = useMemo(
    () => slideData.find((slide) => slide.id === currentSlideId),
    [slideData, currentSlideId]
  );

  return (
    <div
      className={cn('relative', className)}
      style={{ backgroundColor: color }}
      ref={ref}
    >
      <pre>{JSON.stringify(currentPresentationSlide, null, 2)}</pre>
    </div>
  );
};
