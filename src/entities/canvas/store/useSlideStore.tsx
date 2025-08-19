import hash from 'object-hash';
import { create } from 'zustand';
import { withSelectors } from '@/shared/lib';
import {
  type CanvasElement,
  type SlideData,
  reconstructSlideData,
} from '../schema';

export type SlideInner = {
  color: string;
  elementIds: string[];
  elements: Record<string, CanvasElement>;
};

type Slides = Record<string, SlideInner>;

export type MemoryData = {
  slideIds: string[];
  slides: Slides;
  currentSlideId: string | null;
};

type SlideStore = {
  slideIds: string[];
  slides: Slides;
  currentSlideId: string | null;
  initialDataHash: string | null;
  lastUpdatedAt: Date | null;
  past: MemoryData[];
  future: MemoryData[];

  setSlideData: (slideData: SlideData, updatedDate: Date) => void;
  addPresentationSlide: (id: string) => void;
  updateCurrentPresentationSlideColor: (color: string) => void;
  removePresentationSlide: (id: string) => void;
  addCanvasElement: (element: CanvasElement) => void;
  removeCanvasElement: (elementId: string) => void;
  updateCanvasElement: (element: CanvasElement) => void;
  bringToFrontCanvasElement: (elementId: string) => void;
  sendToBackCanvasElement: (elementId: string) => void;
  setCurrentSlideId: (id: string) => void;
  markChangesAsSaved: (newHash: string, updatedAt: Date) => void;
  undo: () => void;
  redo: () => void;
};

const pickMemory = (
  state: Pick<SlideStore, 'slideIds' | 'slides' | 'currentSlideId'>
): MemoryData => ({
  slideIds: state.slideIds,
  slides: state.slides,
  currentSlideId: state.currentSlideId,
});

export const useSlideStore = withSelectors(
  create<SlideStore>()((set) => ({
    slideIds: [],
    slides: {},
    currentSlideId: null,
    initialDataHash: null,
    lastUpdatedAt: null,
    past: [],
    future: [],

    setSlideData: (slideData: SlideData, updatedDate: Date) => {
      set((state) => {
        const newSlideIds = slideData.map((s) => s.id);
        const newSlides = slideData.reduce<Slides>((acc, s) => {
          const newElementIds = s.elements.map((e) => e.id);
          const newElements = s.elements.reduce<Record<string, CanvasElement>>(
            (acc2, e) => {
              acc2[e.id] = e;
              return acc2;
            },
            {}
          );
          acc[s.id] = {
            color: s.color,
            elementIds: newElementIds,
            elements: newElements,
          };
          return acc;
        }, {});

        const newPresent: MemoryData = {
          slideIds: newSlideIds,
          slides: newSlides,
          currentSlideId: null,
        };
        return {
          ...newPresent,
          past: [...state.past, pickMemory(state)],
          future: [],
          lastUpdatedAt: updatedDate,
          initialDataHash: hash(slideData),
        };
      });
    },

    addPresentationSlide: (id: string) => {
      set((state) => {
        const newPresent: MemoryData = {
          slideIds: [...state.slideIds, id],
          slides: {
            ...state.slides,
            [id]: { color: '#ffffff', elementIds: [], elements: {} },
          },
          currentSlideId: id,
        };

        return {
          ...newPresent,
          past: [...state.past, pickMemory(state)],
          future: [],
        };
      });
    },

    updateCurrentPresentationSlideColor: (color: string) => {
      set((state) => {
        if (!state.currentSlideId) return state;
        const slideId = state.currentSlideId;
        const slide = state.slides[slideId];

        if (!slide) return state;
        const newPresent: MemoryData = {
          ...state,
          slides: {
            ...state.slides,
            [slideId]: { ...slide, color },
          },
        };

        return {
          ...newPresent,
          past: [...state.past, pickMemory(state)],
          future: [],
        };
      });
    },

    removePresentationSlide: (id: string) => {
      set((state) => {
        const index = state.slideIds.indexOf(id);

        if (index === -1) return state;
        let currentSlideId: string | null = state.currentSlideId;

        if (currentSlideId === id) {
          currentSlideId =
            state.slideIds[index - 1] ?? state.slideIds[index + 1] ?? null;
        }
        const newSlideIds = state.slideIds.filter((sid) => sid !== id);
        const newSlides = { ...state.slides };
        delete newSlides[id];

        const newPresent: MemoryData = {
          slideIds: newSlideIds,
          slides: newSlides,
          currentSlideId,
        };
        return {
          ...newPresent,
          past: [...state.past, pickMemory(state)],
          future: [],
        };
      });
    },

    addCanvasElement: (element: CanvasElement) => {
      set((state) => {
        if (!state.currentSlideId) return state;
        const slideId = state.currentSlideId;
        const slide = state.slides[slideId];

        if (!slide) return state;
        const newPresent: MemoryData = {
          ...state,
          slides: {
            ...state.slides,
            [slideId]: {
              ...slide,
              elementIds: [...slide.elementIds, element.id],
              elements: {
                ...slide.elements,
                [element.id]: element,
              },
            },
          },
        };

        return {
          ...newPresent,
          past: [...state.past, pickMemory(state)],
          future: [],
        };
      });
    },

    removeCanvasElement: (elementId: string) => {
      set((state) => {
        if (!state.currentSlideId) return state;
        const slideId = state.currentSlideId;
        const slide = state.slides[slideId];

        if (!slide) return state;
        const newElementIds = slide.elementIds.filter(
          (eid) => eid !== elementId
        );
        const newElements = { ...slide.elements };
        delete newElements[elementId];

        const newPresent: MemoryData = {
          ...state,
          slides: {
            ...state.slides,
            [slideId]: {
              ...slide,
              elementIds: newElementIds,
              elements: newElements,
            },
          },
        };
        return {
          ...newPresent,
          past: [...state.past, pickMemory(state)],
          future: [],
        };
      });
    },

    updateCanvasElement: (element: CanvasElement) => {
      set((state) => {
        if (!state.currentSlideId) return state;
        const slideId = state.currentSlideId;
        const slide = state.slides[slideId];

        if (!slide || !(element.id in slide.elements)) return state;
        const newPresent: MemoryData = {
          ...state,
          slides: {
            ...state.slides,
            [slideId]: {
              ...slide,
              elements: {
                ...slide.elements,
                [element.id]: element,
              },
            },
          },
        };

        return {
          ...newPresent,
          past: [...state.past, pickMemory(state)],
          future: [],
        };
      });
    },

    bringToFrontCanvasElement: (elementId: string) => {
      set((state) => {
        if (!state.currentSlideId) return state;
        const slideId = state.currentSlideId;
        const slide = state.slides[slideId];

        if (!slide) return state;
        const elementIndex = slide.elementIds.indexOf(elementId);

        if (elementIndex === -1) return state;
        const newElementIds = [...slide.elementIds];
        newElementIds.splice(elementIndex, 1);
        newElementIds.push(elementId);

        const newPresent: MemoryData = {
          ...state,
          slides: {
            ...state.slides,
            [slideId]: {
              ...slide,
              elementIds: newElementIds,
            },
          },
        };
        return {
          ...newPresent,
          past: [...state.past, pickMemory(state)],
          future: [],
        };
      });
    },

    sendToBackCanvasElement: (elementId: string) => {
      set((state) => {
        if (!state.currentSlideId) return state;
        const slideId = state.currentSlideId;
        const slide = state.slides[slideId];

        if (!slide) return state;
        const elementIndex = slide.elementIds.indexOf(elementId);

        if (elementIndex === -1) return state;
        const newElementIds = [...slide.elementIds];
        newElementIds.splice(elementIndex, 1);
        newElementIds.unshift(elementId);

        const newPresent: MemoryData = {
          ...state,
          slides: {
            ...state.slides,
            [slideId]: {
              ...slide,
              elementIds: newElementIds,
            },
          },
        };
        return {
          ...newPresent,
          past: [...state.past, pickMemory(state)],
          future: [],
        };
      });
    },

    setCurrentSlideId: (id: string) => {
      set((state) => {
        const newPresent: MemoryData = { ...state, currentSlideId: id };
        return {
          ...newPresent,
          past: [...state.past, pickMemory(state)],
          future: [],
        };
      });
    },

    markChangesAsSaved: (newHash: string, updatedAt: Date) => {
      set({
        initialDataHash: newHash,
        lastUpdatedAt: updatedAt,
      });
    },

    undo: () => {
      set((state) => {
        if (state.past.length === 0) return state;
        const previous = state.past[state.past.length - 1];
        const newPast = state.past.slice(0, -1);
        const currentMemory = pickMemory(state);

        return {
          ...previous,
          past: newPast,
          future: [...state.future, currentMemory],
          initialDataHash: state.initialDataHash,
          lastUpdatedAt: state.lastUpdatedAt,
        };
      });
    },

    redo: () => {
      set((state) => {
        if (state.future.length === 0) return state;
        const next = state.future[state.future.length - 1];
        const newFuture = state.future.slice(0, -1);
        const currentMemory = pickMemory(state);

        return {
          ...next,
          past: [...state.past, currentMemory],
          future: newFuture,
          initialDataHash: state.initialDataHash,
          lastUpdatedAt: state.lastUpdatedAt,
        };
      });
    },
  }))
);

export const selectSlideIds = useSlideStore.selectors.slideIds;
export const selectSlides = useSlideStore.selectors.slides;
export const selectCurrentSlideId = useSlideStore.selectors.currentSlideId;
export const selectHasUnsavedChanges = (state: SlideStore) =>
  hash(
    reconstructSlideData({
      slideIds: state.slideIds,
      slides: state.slides,
      currentSlideId: state.currentSlideId,
    })
  ) !== state.initialDataHash;
export const selectLastUpdatedAt = useSlideStore.selectors.lastUpdatedAt;
export const selectCanUndo = (state: SlideStore) => state.past.length > 0;
export const selectCanRedo = (state: SlideStore) => state.future.length > 0;
export const selectPastLength = (state: SlideStore) => state.past.length;
export const selectCurrentPresentationSlideColor = (state: SlideStore) =>
  state.currentSlideId ? state.slides[state.currentSlideId]?.color : '#ffffff';

export const selectSetSlideData = useSlideStore.selectors.setSlideData;
export const selectAddPresentationSlide =
  useSlideStore.selectors.addPresentationSlide;
export const selectUpdateCurrentPresentationSlideColor =
  useSlideStore.selectors.updateCurrentPresentationSlideColor;
export const selectRemovePresentationSlide =
  useSlideStore.selectors.removePresentationSlide;
export const selectAddCanvasElement = useSlideStore.selectors.addCanvasElement;
export const selectRemoveCanvasElement =
  useSlideStore.selectors.removeCanvasElement;
export const selectUpdateCanvasElement =
  useSlideStore.selectors.updateCanvasElement;
export const selectBringToFrontCanvasElement =
  useSlideStore.selectors.bringToFrontCanvasElement;
export const selectSendToBackCanvasElement =
  useSlideStore.selectors.sendToBackCanvasElement;
export const selectSetCurrentSlideId =
  useSlideStore.selectors.setCurrentSlideId;
export const selectMarkChangesAsSaved =
  useSlideStore.selectors.markChangesAsSaved;

export const selectUndo = useSlideStore.selectors.undo;
export const selectRedo = useSlideStore.selectors.redo;
