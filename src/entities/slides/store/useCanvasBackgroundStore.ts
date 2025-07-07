import { create } from 'zustand';

type CanvasBackgroundStore = {
  color: string;
  setColor: (color: string) => void;
};

export const useCanvasBackgroundStore = create<CanvasBackgroundStore>()(
  (set) => ({
    color: '#ffffff',
    setColor: (color: string) => set((state) => ({ ...state, color })),
  })
);
