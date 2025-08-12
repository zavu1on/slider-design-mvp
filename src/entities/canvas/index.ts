export {
  useCanvasSizesStore,
  useUserMaterialsStore,
  useAlignActionStore,
  useMemorizedSlideData,
  SlideDataProvider,
  type AlignAction,
} from './store';
export {
  canvasElementSchema,
  presentationSlideSchema,
  slideDataSchema,
  CanvasElementType,
  type CanvasElement,
  type PresentationSlide,
  type SlideData,
  type GeometricFigure,
} from './schema';
export { useCurrentPresentationSlide, useSelectedElements } from './hooks';
export { useCanvas } from './useCanvas';
export { PresentationSlideViewer } from './PresentationSlideViewer';
