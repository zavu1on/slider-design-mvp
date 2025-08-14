'use client';

import { type FC, type MouseEvent, useTransition } from 'react';
import { Copy } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { deleteSlideAction } from '@/entities/slides';
import type { Slide } from '@/generated/prisma';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/generated/shadcn/hover-card';
import { Button, Card, LoadingButton } from '@/shared/ui';

type SliderCardProps = {
  slide: Slide;
};

export const SliderCard: FC<SliderCardProps> = ({ slide }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const deleteSlide = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    startTransition(async () => {
      const resp = await deleteSlideAction(slide.id);
      if (!resp.success) toast.error(resp.error);
    });
  };

  const copyPublicUrl = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    try {
      await navigator.clipboard.writeText(
        window.location.origin + `/view/${slide.slug}`
      );

      toast.success('Ссылка скопирована в буфер обмена');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Не удалось скопировать ссылку');
    }
  };

  return (
    <Card
      title=""
      className="cursor-pointer overflow-hidden shadow-lg hover:shadow-xl transition-shadow pt-0"
      onClick={() => router.push(`/slides/${slide.id}`)}
      footer={
        <div className="w-full flex items-end justify-between">
          <LoadingButton loading={isPending} onClick={deleteSlide}>
            Удалить
          </LoadingButton>
          <HoverCard>
            <HoverCardTrigger>
              <Button onClick={copyPublicUrl}>
                <Copy />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent>
              Скопируйте ссылку для публичного доступа к презентации
            </HoverCardContent>
          </HoverCard>
        </div>
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
