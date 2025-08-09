import { create } from 'zustand';

type CanvasBackgroundStore = {
  color: string;
  width: number;
  height: number;

  setSizes: (width: number, height: number) => void;
  setColor: (color: string) => void;
};

export const useCanvasStore = create<CanvasBackgroundStore>()((set) => ({
  width: 0,
  height: 0,
  color: '#ffffff',

  setSizes: (width, height) => set((state) => ({ ...state, width, height })),
  setColor: (color) => set((state) => ({ ...state, color })),
}));
