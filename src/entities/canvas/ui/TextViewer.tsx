'use client';

import type { FC, FocusEvent } from 'react';
import { cn } from '@/shared/lib';
import type { CanvasElement } from '../schema';
import { useCanvasStore, useCheckInputStore } from '../store';

export const TextViewer: FC<{ element: CanvasElement }> = ({ element }) => {
  const { currentInputId } = useCheckInputStore();
  const { currentSlideId, updateCanvasElement } = useCanvasStore();

  const handleBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
    if (e.target.value !== element.content) {
      updateCanvasElement(currentSlideId!, {
        ...element,
        content: e.target.value,
      });
    }
  };

  return (
    <div
      id={element.id}
      className={cn(
        {
          'pointer-events-all': element.id === currentInputId,
        },
        'size-full flex items-center justify-center text-black text-3xl border-radius-inherit'
      )}
      style={{
        backgroundColor: element.backgroundColor,
        color: element.color,
      }}
    >
      <textarea
        className={cn(
          {
            'border-1 border-blue-600': element.id === currentInputId,
            'pointer-events-none': element.id !== currentInputId,
          },
          'w-full h-full p-2 resize-none overflow-hidden whitespace-nowrap text-ellipsis'
        )}
        defaultValue={element.content}
        onBlur={handleBlur}
        disabled={element.id !== currentInputId}
      />
    </div>
  );
};
