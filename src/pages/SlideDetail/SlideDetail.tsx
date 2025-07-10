import type { FC } from 'react';
import { SessionProvider } from 'next-auth/react';
import type { Material } from '@/generated/prisma';
import { SidebarProvider } from '@/generated/shadcn/sidebar';
import { SlideDetail as SlideDetailWidget } from '@/widgets/SlideDetail';

type SlideDetailProps = {
  id: string;
  name: string;
  materials: Material[];
};

export const SlideDetail: FC<SlideDetailProps> = (props) => (
  <SessionProvider>
    <SidebarProvider>
      <SlideDetailWidget {...props} />
    </SidebarProvider>
  </SessionProvider>
);
