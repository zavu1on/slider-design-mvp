import { getSlideBySlug, getSlideNameBySlug } from '@/entities/slides';
import { PresentationView } from '@/pages/PresentationView';
import { PresentationNotFound } from '@/widgets/SlidePresenter';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const title = await getSlideNameBySlug(slug);

  return {
    title,
  };
}

export default async function PresentationViewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const slide = await getSlideBySlug(slug);

  if (!slide) return <PresentationNotFound />;

  return <PresentationView slide={slide} />;
}
