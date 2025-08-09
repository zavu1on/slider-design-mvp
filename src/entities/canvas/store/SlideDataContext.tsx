'use client';

import {
  type FC,
  type PropsWithChildren,
  createContext,
  use,
  useMemo,
  useRef,
} from 'react';
import useUndoable from 'use-undoable';
import type { CanvasElement, SlideData } from '../schema';

type SlideDataContextValue = {
  slideData: SlideData;
  currentSlideId: string | null;
  setSlideData: (slideData: SlideData) => void;
  addPresentationSlide: (id: string) => void;
  removePresentationSlide: (id: string) => void;
  addCanvasElement: (slideId: string, element: CanvasElement) => void;
  removeCanvasElement: (slideId: string, elementId: string) => void;
  updateCanvasElement: (slideId: string, element: CanvasElement) => void;
  setCurrentSlideId: (id: string) => void;

  canUndo: boolean;
  canRedo: boolean;
  undo: () => void;
  redo: () => void;
};

const SlideDataContext = createContext<SlideDataContextValue | undefined>(
  undefined
);

export const SlideDataProvider: FC<PropsWithChildren> = ({ children }) => {
  const [memoryData, setMemoryData, { undo, redo, canUndo, canRedo }] =
    useUndoable<Pick<SlideDataContextValue, 'slideData' | 'currentSlideId'>>({
      slideData: [],
      currentSlideId: null,
    });

  const actionsRef = useRef({
    setSlideData: (slideData: SlideData) =>
      setMemoryData((prev) => ({ ...prev, slideData })),

    addPresentationSlide: (id: string) =>
      setMemoryData((prev) => ({
        ...prev,
        slideData: [...prev.slideData, { id, previewUrl: '', elements: [] }],
        currentSlideId: id,
      })),

    removePresentationSlide: (id: string) =>
      setMemoryData((prev) => {
        let currentSlideId: string | null = prev.currentSlideId;
        for (let i = 0; i < prev.slideData.length; i++) {
          if (prev.slideData[i].id === id) {
            currentSlideId =
              prev.slideData[i - 1]?.id ?? prev.slideData[i + 1]?.id ?? null;
            break;
          }
        }
        const slideData = prev.slideData.filter((slide) => slide.id !== id);
        return { slideData, currentSlideId };
      }),

    addCanvasElement: (slideId: string, element: CanvasElement) =>
      setMemoryData((prev) => ({
        ...prev,
        slideData: prev.slideData.map((slide) =>
          slide.id === slideId
            ? { ...slide, elements: [...slide.elements, element] }
            : slide
        ),
      })),

    removeCanvasElement: (slideId: string, elementId: string) =>
      setMemoryData((prev) => ({
        ...prev,
        slideData: prev.slideData.map((slide) =>
          slide.id === slideId
            ? {
                ...slide,
                elements: slide.elements.filter((el) => el.id !== elementId),
              }
            : slide
        ),
      })),

    updateCanvasElement: (slideId: string, element: CanvasElement) =>
      setMemoryData((prev) => ({
        ...prev,
        slideData: prev.slideData.map((slide) =>
          slide.id === slideId
            ? {
                ...slide,
                elements: slide.elements.map((el) =>
                  el.id === element.id ? element : el
                ),
              }
            : slide
        ),
      })),

    setCurrentSlideId: (id: string) =>
      setMemoryData((prev) => ({ ...prev, currentSlideId: id })),
  });

  const value = useMemo<SlideDataContextValue>(
    () => ({
      slideData: memoryData.slideData,
      currentSlideId: memoryData.currentSlideId,
      ...actionsRef.current,

      canUndo,
      canRedo,
      undo,
      redo,
    }),
    [memoryData, canUndo, canRedo, undo, redo]
  );

  return (
    <SlideDataContext.Provider value={value}>
      {children}
    </SlideDataContext.Provider>
  );
};

export const useMemorizedSlideData = (): SlideDataContextValue => {
  const slideDataContext = use(SlideDataContext);
  if (!slideDataContext) {
    throw new Error(
      'useMemorizedSlideData must be used within a SlideDataProvider'
    );
  }
  return slideDataContext;
};
