import { FC } from 'react';
import Link from 'next/link';
import { type Slide } from '@/generated/prisma';
import { Card } from '@/generated/shadcn/card';

type SliderCardProps = {
  slide: Slide;
};

export const SliderCard: FC<SliderCardProps> = ({ slide }) => {
  return (
    <Card
      key={slide.id}
      className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
    >
      <Link href={`/slides/${slide.id}`}>
        <div className="p-4">
          <h3 className="font-bold text-lg truncate">{slide.name}</h3>
          <p className="text-gray-500 text-sm">
            {new Date(slide.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </Link>
    </Card>
  );
};
