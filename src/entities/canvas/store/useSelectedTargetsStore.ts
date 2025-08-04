import { create } from 'zustand';

type SelectedTargetsStore = {
  targets: string[];
  setTargets: (targets: string[]) => void;
};

export const useSelectedTargetsStore = create<SelectedTargetsStore>()(
  (set) => ({
    targets: [],
    setTargets: (targets) => set((state) => ({ ...state, targets })),
  })
);
