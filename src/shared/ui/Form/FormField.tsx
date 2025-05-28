'use client';

import { type ReactElement, type ReactNode, cloneElement } from 'react';
import { type Control, type FieldValues, type Path } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
  FormField as UIFormField,
} from '@/generated/shadcn/form';

export type FormChildrenProps<Values extends FieldValues> = {
  name: Path<Values>;
  label?: string;
  description?: string;
  control: Control<Values>;
  containerClassName?: string;

  // multi-select only
  onValueChange?: (value: string[]) => void;
  defaultValue?: string[];
};

type FormChildren<Values extends FieldValues> = ReactElement & {
  props: Omit<FormChildrenProps<Values>, 'control' | 'containerClassName'>;
};

type FormFieldProps<Values extends FieldValues> = {
  control: Control<Values>;
  children: FormChildren<Values>;
  className?: string;
};

export const FormField = <Values extends FieldValues = FieldValues>({
  control,
  children,
  className,
}: FormFieldProps<Values>): ReactNode => {
  if (!children.props?.name) throw Error('No "name" param!');

  return (
    <UIFormField
      control={control}
      name={children.props.name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{children.props.label}</FormLabel>
          <FormControl>
            {cloneElement(children, {
              onValueChange: field.onChange,
              defaultValue: field.value,
              ...children.props,
              ...field,
            })}
          </FormControl>
          <FormDescription>{children.props.description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
