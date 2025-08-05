'use client';

import { type RefObject, useEffect } from 'react';
import type Moveable from 'react-moveable';
import type { DraggableRequestParam } from 'react-moveable';
import { useAlignActionStore } from '../store';

export const useAlignElementsHandler = (
  moveableRef: RefObject<Moveable<unknown> | null>
) => {
  const { action, clearAction } = useAlignActionStore();

  const arrangeHorizontalSpacing = () => {
    const groupRect = moveableRef.current!.getRect();
    const moveables = moveableRef.current!.getMoveables();
    let left = groupRect.left;

    if (moveables.length <= 1) {
      return;
    }
    const gap =
      (groupRect.width -
        groupRect.children!.reduce((prev, cur) => {
          return prev + cur.width;
        }, 0)) /
      (moveables.length - 1);

    moveables.sort((a, b) => {
      return a.state.left - b.state.left;
    });
    moveables.forEach((child) => {
      const rect = child.getRect();

      child.request<DraggableRequestParam>(
        'draggable',
        {
          x: left,
        },
        true
      );

      left += rect.width + gap;
    });

    moveableRef.current?.updateRect();
  };

  const arrangeVerticalSpacing = () => {
    const groupRect = moveableRef.current!.getRect();
    const moveables = moveableRef.current!.getMoveables();
    let top = groupRect.top;

    if (moveables.length <= 1) {
      return;
    }
    const gap =
      (groupRect.height -
        groupRect.children!.reduce((prev, cur) => {
          return prev + cur.height;
        }, 0)) /
      (moveables.length - 1);

    moveables.sort((a, b) => {
      return a.state.top - b.state.top;
    });
    moveables.forEach((child) => {
      const rect = child.getRect();

      child.request<DraggableRequestParam>(
        'draggable',
        {
          y: top,
        },
        true
      );

      top += rect.height + gap;
    });

    moveableRef.current?.updateRect();
  };

  const alignHorizontalCenter = () => {
    const rect = moveableRef.current!.getRect();
    const moveables = moveableRef.current!.getMoveables();

    if (moveables.length <= 1) {
      return;
    }
    moveables.forEach((child, i) => {
      child.request<DraggableRequestParam>(
        'draggable',
        {
          x: rect.left + rect.width / 2 - rect.children![i].width / 2,
        },
        true
      );
    });

    moveableRef.current?.updateRect();
  };

  const alignVerticalCenter = () => {
    const rect = moveableRef.current!.getRect();
    const moveables = moveableRef.current!.getMoveables();

    if (moveables.length <= 1) {
      return;
    }
    moveables.forEach((child, i) => {
      child.request<DraggableRequestParam>(
        'draggable',
        {
          y: rect.top + rect.height / 2 - rect.children![i].height / 2,
        },
        true
      );
    });

    moveableRef.current?.updateRect();
  };

  useEffect(() => {
    if (action) {
      switch (action) {
        case 'AlignHorizontalSpaceBetween':
          arrangeHorizontalSpacing();
          break;
        case 'AlignVerticalSpaceBetween':
          arrangeVerticalSpacing();
          break;
        case 'AlignCenterHorizontal':
          alignHorizontalCenter();
          break;
        case 'AlignCenterVertical':
          alignVerticalCenter();
          break;
      }
      clearAction();
    }
  }, [action]);
};
