'use client';

import { type FC, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { deleteSlideAction } from '@/entities/slides';
import type { Slide } from '@/generated/prisma';
import { Card, LoadingButton } from '@/shared/ui';

type SliderCardProps = {
  slide: Slide;
};

export const SliderCard: FC<SliderCardProps> = ({ slide }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const deleteSlide = () => {
    startTransition(async () => {
      const resp = await deleteSlideAction(slide.id);
      if (!resp.success) toast.error(resp.error);
    });
  };

  return (
    <Card
      title=""
      className="cursor-pointer overflow-hidden shadow-lg hover:shadow-xl transition-shadow pt-0"
      onClick={() => router.push(`/slides/${slide.id}`)}
      footer={
        <LoadingButton loading={isPending} onClick={deleteSlide}>
          Удалить
        </LoadingButton>
      }
    >
      <Link href={`/slides/${slide.id}`}>
        <h3 className="font-bold text-lg truncate">{slide.name}</h3>
        <p className="text-gray-500 text-sm">
          {new Date(slide.updatedAt).toLocaleDateString()}
        </p>
      </Link>
    </Card>
  );
};
