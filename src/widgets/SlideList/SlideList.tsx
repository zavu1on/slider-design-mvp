import type { FC } from 'react';
import { ProfileHeader, type PublicUser } from '@/entities/profile';
import type { Slide } from '@/generated/prisma';
import { AddSlideForm } from './lib';
import { SliderCard } from './ui';

type SlideListProps = {
  user: PublicUser;
  slides: Slide[];
};

export const SlideList: FC<SlideListProps> = ({ user, slides }) => {
  return (
    <main className="min-h-screen">
      <ProfileHeader userName={user.login} />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {slides.map((slide) => (
            <SliderCard key={slide.id} slide={slide} />
          ))}
          <AddSlideForm />
        </div>
      </div>
    </main>
  );
};
