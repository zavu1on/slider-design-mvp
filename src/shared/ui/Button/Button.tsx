import { type ButtonHTMLAttributes, type FC } from 'react';
import * as UI from '@/generated/shadcn/button';
import { cn } from '@/shared/lib';

export const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className,
  ...props
}) => {
  return (
    <UI.Button className={cn('hover:cursor-pointer', className)} {...props} />
  );
};
