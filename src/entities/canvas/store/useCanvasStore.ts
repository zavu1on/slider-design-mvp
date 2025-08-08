import { create } from 'zustand';
import type { CanvasElement, SlideData } from '../schema';

type CanvasBackgroundStore = {
  color: string;
  width: number;
  height: number;
  slideData: SlideData;
  currentSlideId: string | null;

  setSizes: (width: number, height: number) => void;
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
  width: 0,
  height: 0,
  color: '#ffffff',
  slideData: [],
  currentSlideId: null,

  setSizes: (width, height) => set((state) => ({ ...state, width, height })),
  setColor: (color) => set((state) => ({ ...state, color })),
  setSlideData: (slideData) => set((state) => ({ ...state, slideData })),

  addPresentationSlide: (id) =>
    set((state) => ({
      ...state,
      slideData: [...state.slideData, { id, previewUrl: '', elements: [] }],
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

  setCurrentSlideId: (id) => set((state) => ({ ...state, currentSlideId: id })),
}));
