'use client';

import { type RefObject, useCallback, useEffect } from 'react';
import type Moveable from 'react-moveable';
import type { DraggableRequestParam } from 'react-moveable';
import { getTargetId } from '@/shared/lib';
import {
  selectAlignAction,
  selectBringToFrontCanvasElement,
  selectClearAlignAction,
  selectSendToBackCanvasElement,
  useAlignActionStore,
  useSlideStore,
} from '../store';
import { useSelectedTargets } from './useSelectedTargets';

export const useAlignElementsHandler = (
  moveableRef: RefObject<Moveable<unknown> | null>
) => {
  const action = useAlignActionStore(selectAlignAction);
  const clearAction = useAlignActionStore(selectClearAlignAction);

  const targets = useSelectedTargets();
  const bringToFrontCanvasElement = useSlideStore(
    selectBringToFrontCanvasElement
  );
  const sendToBackCanvasElement = useSlideStore(selectSendToBackCanvasElement);

  const arrangeHorizontalSpacing = useCallback(() => {
    const groupRect = moveableRef.current!.getRect();
    const moveables = moveableRef.current!.getMoveables();
    let left = groupRect.left;

    if (moveables.length <= 1) {
      return;
    }
    const gap =
      (groupRect.width -
        groupRect.children!.reduce((prev, cur) => prev + cur.width, 0)) /
      (moveables.length - 1);

    moveables.sort((a, b) => a.state.left - b.state.left);
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
  }, [moveableRef]);

  const arrangeVerticalSpacing = useCallback(() => {
    const groupRect = moveableRef.current!.getRect();
    const moveables = moveableRef.current!.getMoveables();
    let top = groupRect.top;

    if (moveables.length <= 1) {
      return;
    }
    const gap =
      (groupRect.height -
        groupRect.children!.reduce((prev, cur) => prev + cur.height, 0)) /
      (moveables.length - 1);

    moveables.sort((a, b) => a.state.top - b.state.top);
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
  }, [moveableRef]);

  const alignHorizontalCenter = useCallback(() => {
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
  }, [moveableRef]);

  const alignVerticalCenter = useCallback(() => {
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
  }, [moveableRef]);

  const bringToFront = useCallback(() => {
    for (const target of targets) {
      const targetId = getTargetId(target);
      if (targetId) bringToFrontCanvasElement(targetId);
    }
  }, [targets]);

  const sendToBack = useCallback(() => {
    for (const target of targets) {
      const targetId = getTargetId(target);
      if (targetId) sendToBackCanvasElement(targetId);
    }
  }, [targets]);

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
        case 'BringToFront':
          bringToFront();
          break;
        case 'SendToBack':
          sendToBack();
          break;
      }
      clearAction();
    }
  }, [
    action,
    arrangeHorizontalSpacing,
    arrangeVerticalSpacing,
    alignHorizontalCenter,
    alignVerticalCenter,
    clearAction,
    bringToFront,
    sendToBack,
  ]);
};
