import { create } from 'zustand';
import type { CanvasElement, SlideData } from '../schema';

type CanvasBackgroundStore = {
  color: string;
  slideData: SlideData;
  currentSlideId: string | null;

  setColor: (color: string) => void;
  setSlideData: (slideData: SlideData) => void;

  addPresentationSlide: (id: string) => void;
  removePresentationSlide: (id: string) => void;

  addCanvasElement: (slideId: string, element: CanvasElement) => void;
  removeCanvasElement: (slideId: string, elementId: string) => void;
  updateCanvasElement: (slideId: string, element: CanvasElement) => void;

  setCurrentSlideId: (id: string) => void;
};

export const useCanvasStore = create<CanvasBackgroundStore>()((set) => ({
  color: '#ffffff',
  slideData: [],
  currentSlideId: null,

  setColor: (color) => set((state) => ({ ...state, color })),
  setSlideData: (slideData) => set((state) => ({ ...state, slideData })),

  addPresentationSlide: (id) =>
    set((state) => ({
      ...state,
      slideData: [...state.slideData, { id, elements: [] }],
    })),
  removePresentationSlide: (id) =>
    set((state) => ({
      ...state,
      slideData: state.slideData.filter((slide) => slide.id !== id),
    })),

  addCanvasElement: (slideId, element) =>
    set((state) => ({
      ...state,
      slideData: state.slideData.map((slide) => {
        if (slide.id === slideId) {
          return {
            ...slide,
            elements: [...slide.elements, element],
          };
        }
        return slide;
      }),
    })),
  removeCanvasElement: (slideId, elementId) =>
    set((state) => ({
      ...state,
      slideData: state.slideData.map((slide) => {
        if (slide.id === slideId) {
          return {
            ...slide,
            elements: slide.elements.filter(
              (element) => element.id !== elementId
            ),
          };
        }
        return slide;
      }),
    })),
  updateCanvasElement: (slideId, element) =>
    set((state) => ({
      ...state,
      slideData: state.slideData.map((slide) => {
        if (slide.id === slideId) {
          return {
            ...slide,
            elements: slide.elements.map((el) => {
              if (el.id === element.id) {
                return element;
              }
              return el;
            }),
          };
        }
        return slide;
      }),
    })),

  setCurrentSlideId: (id: string) =>
    set((state) => ({ ...state, currentSlideId: id })),
}));
