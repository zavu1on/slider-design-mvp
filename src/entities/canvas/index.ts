export {
  useCanvasStore,
  useUserMaterialsStore,
  useAlignActionStore,
  useMemorizedSlideData,
  SlideDataProvider,
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
export { useGetCurrentPresentationSlide } from './hooks';
export { useCanvas } from './useCanvas';
export { PresentationSlideViewer } from './PresentationSlideViewer';
