'use client';

import { useShallow } from 'zustand/react/shallow';
import { selectSelectedTargets, useSelectedTargetsStore } from '../store';

export const useSelectedTargets = (): string[] => {
  const targets = useSelectedTargetsStore(useShallow(selectSelectedTargets));
  return targets;
};
