import { create } from 'zustand';

type CheckInputStore = {
  checkInput: boolean;
  currentInputId: string | null;
  wasDoubleClickEvent: boolean;

  setCheckInput: (checkInput: boolean, currentInputId: string) => void;
  uncheckInput: () => void;
  setWasDoubleClickEvent: (wasDoubleClickEvent: boolean) => void;
};

export const useCheckInputStore = create<CheckInputStore>()((set) => ({
  checkInput: false,
  wasDoubleClickEvent: false,
  currentInputId: null,

  setCheckInput: (checkInput, currentInputId) =>
    set((state) => ({ ...state, checkInput, currentInputId })),
  uncheckInput: () =>
    set((state) => ({ ...state, checkInput: false, currentInputId: null })),
  setWasDoubleClickEvent: (wasDoubleClickEvent) =>
    set((state) => ({ ...state, wasDoubleClickEvent })),
}));
