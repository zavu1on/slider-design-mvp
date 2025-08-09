'use client';

import type { FC, FocusEvent, ReactNode } from 'react';
import { cn, stringToStyle } from '@/shared/lib';
import type { CanvasElement } from '../schema';
import { useCheckInputStore, useMemorizedSlideData } from '../store';

const TextViewerBasic: FC<{
  element: CanvasElement;
  className?: string;
  children: ReactNode;
  withoutId?: boolean;
}> = ({ element, className, children, withoutId = false }) => (
  <div
    id={withoutId ? undefined : element.id}
    className={cn(
      'size-full flex items-center justify-center text-black text-3xl border-radius-inherit',
      className
    )}
    style={{
      backgroundColor: element.backgroundColor,
      color: element.color,
      ...stringToStyle(element.styleString),
    }}
  >
    {children}
  </div>
);

export const TextViewer: FC<{ element: CanvasElement }> = ({ element }) => {
  const { currentInputId } = useCheckInputStore();
  const { currentSlideId, updateCanvasElement } = useMemorizedSlideData();

  const handleBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
    if (e.target.value !== element.content) {
      updateCanvasElement(currentSlideId!, {
        ...element,
        content: e.target.value,
      });
    }
  };

  return (
    <TextViewerBasic
      className={cn({
        'pointer-events-all': element.id === currentInputId,
      })}
      element={element}
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
    </TextViewerBasic>
  );
};

export const ReadonlyTextViewer: FC<{ element: CanvasElement }> = ({
  element,
}) => (
  <TextViewerBasic element={element} withoutId>
    <div className="w-full h-full p-2 overflow-hidden whitespace-nowrap text-ellipsis">
      {element.content}
    </div>
  </TextViewerBasic>
);
