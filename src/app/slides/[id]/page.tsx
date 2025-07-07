import { redirect } from 'next/navigation';
import { getSessionOrLogin } from '@/entities/auth';
import { getSlideNameById } from '@/entities/slides';
import { SlideDetail } from '@/pages/SlideDetail';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getSessionOrLogin(`/slides/${id}`);
  const slideName = await getSlideNameById(session, id);

  return {
    title: `Slide - ${slideName}`,
  };
}

export default async function SlideDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getSessionOrLogin(`/slides/${id}`);
  const slideName = await getSlideNameById(session, id);

  if (!slideName) redirect('/slides');

  return <SlideDetail id={id} name={slideName} />;
}
