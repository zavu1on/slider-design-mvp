import { FC } from 'react';
import { SessionProvider } from 'next-auth/react';
import { SidebarProvider } from '@/generated/shadcn/sidebar';
import { SlideDetail as SlideDetailWidget } from '@/widgets/SlideDetail';

type SlideDetailProps = {
  name: string;
  id: string;
};

export const SlideDetail: FC<SlideDetailProps> = ({ id, name }) => (
  <SessionProvider>
    <SidebarProvider>
      <SlideDetailWidget id={id} name={name} />
    </SidebarProvider>
  </SessionProvider>
);
