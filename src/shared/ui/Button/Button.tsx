import type { ComponentProps, FC } from 'react';
import * as UI from '@/generated/shadcn/button';
import { cn } from '@/shared/lib';

export type ButtonProps = ComponentProps<typeof UI.Button>;

export const Button: FC<ButtonProps> = ({ className, ...props }) => {
  return (
    <UI.Button className={cn('hover:cursor-pointer', className)} {...props} />
  );
};
