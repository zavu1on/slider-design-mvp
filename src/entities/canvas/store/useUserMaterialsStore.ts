import { create } from 'zustand';
import type { Material } from '@/generated/prisma';

type UserMaterialsStore = {
  materials: Material[];
  setMaterials: (materials: Material[]) => void;
  addMaterial: (material: Material) => void;
};

export const useUserMaterialsStore = create<UserMaterialsStore>()((set) => ({
  materials: [],
  setMaterials: (materials) => set((state) => ({ ...state, materials })),
  addMaterial: (material) =>
    set((state) => ({
      ...state,
      materials: [...state.materials, material],
    })),
}));
