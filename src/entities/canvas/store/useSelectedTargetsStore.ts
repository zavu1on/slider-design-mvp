import { create } from 'zustand';
import { withSelectors } from '@/shared/lib';

type SelectedTargetsStore = {
  targets: string[];
  setTargets: (targets: string[]) => void;
};

export const useSelectedTargetsStore = withSelectors(
  create<SelectedTargetsStore>()((set) => ({
    targets: [],
    setTargets: (targets) => set((state) => ({ ...state, targets })),
  }))
);

export const selectSelectedTargets = useSelectedTargetsStore.selectors.targets;
export const selectSetSelectedTargets =
  useSelectedTargetsStore.selectors.setTargets;
