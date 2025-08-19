import { create } from 'zustand';
import type { Material } from '@/generated/prisma';
import { withSelectors } from '@/shared/lib';

type UserMaterialsStore = {
  materials: Material[];
  setMaterials: (materials: Material[]) => void;
  addMaterial: (material: Material) => void;
};

export const useUserMaterialsStore = withSelectors(
  create<UserMaterialsStore>()((set) => ({
    materials: [],
    setMaterials: (materials) => set((state) => ({ ...state, materials })),
    addMaterial: (material) =>
      set((state) => ({
        ...state,
        materials: [...state.materials, material],
      })),
  }))
);

export const selectUserMaterials = useUserMaterialsStore.selectors.materials;
export const selectSetUserMaterials =
  useUserMaterialsStore.selectors.setMaterials;
export const selectAddUserMaterial =
  useUserMaterialsStore.selectors.addMaterial;
