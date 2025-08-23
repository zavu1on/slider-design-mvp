import type { FC } from 'react';
import { getSessionOrLogin } from '@/entities/auth';
import { getUserProfileOrLogin } from '@/entities/profile';
import { getUserSlides } from '@/entities/slides';
import { SlideList as SlideListWidget } from '@/widgets/SlideList';

export const SlideList: FC = async () => {
  const session = await getSessionOrLogin();

  const user = await getUserProfileOrLogin(session, '/slides');
  const slides = await getUserSlides(session);

  return <SlideListWidget user={user} slides={slides} />;
};
