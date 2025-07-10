import { create } from 'zustand';
import type { Material } from '@/generated/prisma';

type AddImageStore = {
  image: Material | null;
  addNewImage: (image: Material) => void;
  clear: () => void;
};

export const useAddImageStore = create<AddImageStore>()((set) => ({
  image: null,
  addNewImage: (image) => set({ image }),
  clear: () => set({ image: null }),
}));
