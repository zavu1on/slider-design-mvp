'use client';

import { ButtonHTMLAttributes, type FC, type Ref } from 'react';
import { useFormStatus } from 'react-dom';
import { LoadingButton } from './LoadingButton';

type FormButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  ref?: Ref<HTMLButtonElement>;
};

export const FormButton: FC<FormButtonProps> = (props) => {
  const { pending } = useFormStatus();

  return <LoadingButton loading={pending} {...props} />;
};
