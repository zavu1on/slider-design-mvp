export enum CanvasElementType {
  TEXT,
  IMAGE,
  VIDEO,
  FIGURE,
}

export type CanvasElement = {
  id: string;
  type: CanvasElementType;
  content: string; // url, text or clip-path
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
  backgroundColor?: string;
  rotation?: number;
  borderRadius?: string;
  styleString?: string;
};

export type PresentationSlide = {
  id: string;
  previewUrl?: string;
  elements: CanvasElement[];
};

export type SlideData = PresentationSlide[];
