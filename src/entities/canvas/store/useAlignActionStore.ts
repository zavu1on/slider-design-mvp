import { create } from 'zustand';

type AlignAction =
  | 'AlignCenterHorizontal'
  | 'AlignCenterVertical'
  | 'AlignHorizontalSpaceBetween'
  | 'AlignVerticalSpaceBetween';

type useAlignActionStore = {
  action: AlignAction | null;
  setAction: (action: AlignAction) => void;
  clearAction: () => void;
};

export const useAlignActionStore = create<useAlignActionStore>()((set) => ({
  action: null,
  setAction: (action) => set((state) => ({ ...state, action })),
  clearAction: () => set((state) => ({ ...state, action: null })),
}));
