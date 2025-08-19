import * as yup from 'yup';
import type { MemoryData } from '../store';

export enum CanvasElementType {
  TEXT,
  IMAGE,
  VIDEO,
  FIGURE,
}

export type CanvasElement = {
  id: string;
  type: CanvasElementType;
  content: string; // url, html or clip-path
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
  color: string;
  elements: CanvasElement[];
};

export type SlideData = PresentationSlide[];

export const canvasElementSchema = yup
  .object({
    id: yup.string().required('ID обязателен'),
    type: yup
      .number()
      .oneOf(
        Object.values(CanvasElementType).filter((v) => typeof v === 'number'),
        'Неверный тип элемента'
      )
      .required('Тип обязателен'),
    content: yup.string().required('Контент обязателен'),
    x: yup.number().required('Координата X обязательна'),
    y: yup.number().required('Координата Y обязательна'),
    width: yup
      .number()
      .positive('Ширина должна быть положительной')
      .required('Ширина обязательна'),
    height: yup
      .number()
      .positive('Высота должна быть положительной')
      .required('Высота обязательна'),
    color: yup.string().optional(),
    backgroundColor: yup.string().optional(),
    rotation: yup.number().optional(),
    borderRadius: yup.string().optional(),
    styleString: yup.string().optional(),
  })
  .required();

export const canvasElementListSchema = yup
  .array()
  .of(canvasElementSchema)
  .required('Элементы обязательны');

export const presentationSlideSchema = yup
  .object({
    id: yup.string().required('ID слайда обязателен'),
    elements: canvasElementListSchema,
  })
  .required();

export const slideDataSchema = yup
  .array()
  .of(presentationSlideSchema)
  .required('Слайды обязательны');

export const reconstructSlideData = (memoryData: MemoryData): SlideData => {
  return memoryData.slideIds.map((id) => {
    const slide = memoryData.slides[id];
    return {
      id,
      color: slide.color,
      elements: slide.elementIds.map((eid) => slide.elements[eid]),
    };
  });
};
