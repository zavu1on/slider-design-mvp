import type { FC, Ref } from 'react';
import { cn } from '@/shared/lib';
import { useCanvasStore } from '../store';

export type CanvasProps = {
  ref: Ref<HTMLDivElement>;
  className?: string;
};

export const Canvas: FC<CanvasProps> = ({ ref, className }) => {
  const color = useCanvasStore((state) => state.color);

  return (
    <div
      className={cn('relative', className)}
      style={{ backgroundColor: color }}
      ref={ref}
    ></div>
  );
};
