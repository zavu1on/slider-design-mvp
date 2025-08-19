'use client';

import type { FC, ReactNode } from 'react';
import { RichTextEditor, cn, stringToStyle } from '@/shared/lib';
import type { CanvasElement } from '../schema';
import {
  selectCurrentInputId,
  selectUpdateCanvasElement,
  useCheckInputStore,
  useSlideStore,
} from '../store';

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
  const currentInputId = useCheckInputStore(selectCurrentInputId);
  const updateCanvasElement = useSlideStore(selectUpdateCanvasElement);

  const handleBlur = (html: string) => {
    if (html !== element.content) {
      updateCanvasElement({
        ...element,
        content: html,
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
      <RichTextEditor
        initialContent={element.content}
        className="w-full h-full bg-transparent overflow-hidden whitespace-nowrap text-ellipsis"
        onBlur={handleBlur}
      />
    </TextViewerBasic>
  );
};

export const ReadonlyTextViewer: FC<{ element: CanvasElement }> = ({
  element,
}) => (
  <TextViewerBasic element={element} withoutId>
    <div
      className="w-full h-full p-2 overflow-hidden whitespace-nowrap text-ellipsis tiptap"
      dangerouslySetInnerHTML={{ __html: element.content }}
    ></div>
  </TextViewerBasic>
);
