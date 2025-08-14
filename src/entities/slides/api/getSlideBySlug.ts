import type { Slide } from '@/generated/prisma';
import { prisma } from '@/shared/lib';

export const getSlideBySlug = async (slug: string): Promise<Slide | null> => {
  return await prisma.slide.findFirst({ where: { slug } });
};

export const getSlideNameBySlug = async (
  slug: string
): Promise<string | undefined> => {
  return (await prisma.slide.findFirst({ where: { slug } }))?.name;
};
