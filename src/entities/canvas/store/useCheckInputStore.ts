import { create } from 'zustand';
import { withSelectors } from '@/shared/lib';

type CheckInputStore = {
  checkInput: boolean;
  currentInputId: string | null;
  wasDoubleClickEvent: boolean;

  setCheckInput: (checkInput: boolean, currentInputId: string) => void;
  uncheckInput: () => void;
  setWasDoubleClickEvent: (wasDoubleClickEvent: boolean) => void;
};

export const useCheckInputStore = withSelectors(
  create<CheckInputStore>()((set) => ({
    checkInput: false,
    wasDoubleClickEvent: false,
    currentInputId: null,

    setCheckInput: (checkInput, currentInputId) =>
      set((state) => ({ ...state, checkInput, currentInputId })),
    uncheckInput: () =>
      set((state) => ({ ...state, checkInput: false, currentInputId: null })),
    setWasDoubleClickEvent: (wasDoubleClickEvent) =>
      set((state) => ({ ...state, wasDoubleClickEvent })),
  }))
);

export const selectCheckInput = useCheckInputStore.selectors.checkInput;
export const selectWasDoubleClickEvent =
  useCheckInputStore.selectors.wasDoubleClickEvent;
export const selectCurrentInputId = useCheckInputStore.selectors.currentInputId;

export const selectSetCheckInput = useCheckInputStore.selectors.setCheckInput;
export const selectUncheckInput = useCheckInputStore.selectors.uncheckInput;
export const selectSetWasDoubleClickEvent =
  useCheckInputStore.selectors.setWasDoubleClickEvent;
