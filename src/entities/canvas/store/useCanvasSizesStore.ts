import { create } from 'zustand';
import { withSelectors } from '@/shared/lib';

type CanvasSizesStore = {
  width: number;
  height: number;

  setSizes: (width: number, height: number) => void;
};

export const useCanvasSizesStore = withSelectors(
  create<CanvasSizesStore>()((set) => ({
    width: 0,
    height: 0,

    setSizes: (width, height) => set((state) => ({ ...state, width, height })),
  }))
);

export const selectCanvasWidth = useCanvasSizesStore.selectors.width;
export const selectCanvasHeight = useCanvasSizesStore.selectors.height;
export const selectSetCanvasSizes = useCanvasSizesStore.selectors.setSizes;
