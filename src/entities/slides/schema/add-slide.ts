import { type InferType, object, string } from 'yup';

export const addSlideFormSchema = object({
  name: string().required('Название проекта обязательно'),
});

export type AddSlideFormSchema = InferType<typeof addSlideFormSchema>;
