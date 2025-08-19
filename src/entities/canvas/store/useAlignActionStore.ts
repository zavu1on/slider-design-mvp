import { create } from 'zustand';
import { withSelectors } from '@/shared/lib';

export type AlignAction =
  | 'AlignCenterHorizontal'
  | 'AlignCenterVertical'
  | 'AlignHorizontalSpaceBetween'
  | 'AlignVerticalSpaceBetween'
  | 'BringToFront'
  | 'SendToBack';

type AlignActionStore = {
  action: AlignAction | null;
  setAction: (action: AlignAction) => void;
  clearAction: () => void;
};

export const useAlignActionStore = withSelectors(
  create<AlignActionStore>()((set) => ({
    action: null,
    setAction: (action) => set((state) => ({ ...state, action })),
    clearAction: () => set((state) => ({ ...state, action: null })),
  }))
);

export const selectAlignAction = useAlignActionStore.selectors.action;
export const selectClearAlignAction = useAlignActionStore.selectors.clearAction;
