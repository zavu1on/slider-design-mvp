export enum CanvasElementType {
  TEXT,
  IMAGE,
  VIDEO,
  FIGURE,
}

export type CanvasElement = {
  id: string;
  type: CanvasElementType;
  content: string; // url or text
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
};

export type PresentationSlide = {
  id: string;
  previewUrl: string;
  elements: CanvasElement[];
};

export type SlideData = PresentationSlide[];
