import { create } from 'zustand';

type CanvasSizesStore = {
  width: number;
  height: number;

  setSizes: (width: number, height: number) => void;
};

export const useCanvasSizesStore = create<CanvasSizesStore>()((set) => ({
  width: 0,
  height: 0,

  setSizes: (width, height) => set((state) => ({ ...state, width, height })),
}));
