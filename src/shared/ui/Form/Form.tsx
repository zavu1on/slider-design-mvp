import { type FormHTMLAttributes, type ReactNode, type Ref } from 'react';
import { type FieldValues, type UseFormReturn } from 'react-hook-form';
import { Form as UIForm } from '@/generated/shadcn/form';

type FormProps<Values extends FieldValues> =
  FormHTMLAttributes<HTMLFormElement> & {
    form: UseFormReturn<Values>;
    ref?: Ref<HTMLFormElement>;
  };

export const Form = <Values extends FieldValues = FieldValues>({
  form,
  children,
  ref,
  ...props
}: FormProps<Values>): ReactNode => {
  return (
    <UIForm {...form}>
      <form ref={ref} {...props}>
        {children}
      </form>
    </UIForm>
  );
};
