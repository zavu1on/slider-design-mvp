'use client';

import type { FC } from 'react';
import {
  useCopyPasteHandler,
  useSaveHandler,
  useUndoableHandler,
} from '../hooks';

export const Hookable: FC<{ projectId: string }> = ({ projectId }) => {
  useUndoableHandler();
  useSaveHandler(projectId);
  useCopyPasteHandler();

  return null;
};
