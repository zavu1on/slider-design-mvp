import { type InputHTMLAttributes, type ReactNode } from 'react';
import { type FieldValues } from 'react-hook-form';
import { Input as UIInput } from '@/generated/shadcn/input';
import { type FormChildrenProps, FormField } from '../Form';

type InputProps<Values extends FieldValues> = FormChildrenProps<Values> &
  InputHTMLAttributes<HTMLInputElement>;

export const Input = <Values extends FieldValues = FieldValues>({
  control,
  containerClassName,
  ...props
}: InputProps<Values>): ReactNode => {
  return (
    <FormField control={control} className={containerClassName}>
      <UIInput {...props} />
    </FormField>
  );
};
