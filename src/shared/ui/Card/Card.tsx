import { type FC, type ReactNode } from 'react';
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  Card as CardSkeleton,
  CardTitle,
} from '@/generated/shadcn/card';

type CardProps = {
  children: ReactNode;
  title: string;
  description?: string;
  footer?: ReactNode;
  className?: string;

  style?: Partial<{
    header: string;
    title: string;
    description: string;
    content: string;
    footer: string;
  }>;
};

export const Card: FC<CardProps> = ({
  children,
  title,
  description,
  footer,
  className,
  style,
}) => {
  return (
    <CardSkeleton className={className}>
      <CardHeader className={style?.header}>
        <CardTitle className={style?.title}>{title}</CardTitle>
        <CardDescription className={style?.description}>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className={style?.content}>{children}</CardContent>
      <CardFooter className={style?.footer}>{footer}</CardFooter>
    </CardSkeleton>
  );
};
