import { type FC, Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { getSessionOrLogin } from '@/entities/auth';
import { getSlideById } from '@/entities/slides';
import { EditorSidebar } from '@/features/EditorSidebar';
import { SlideEditor } from '@/features/SlideEditor';
import { SliderHeader } from '@/features/SliderHeader';
import type { Material } from '@/generated/prisma';

type SlideDetailProps = {
  projectId: string;
  name: string;
  materials: Material[];
};

export const SlideDetail: FC<SlideDetailProps> = async ({
  projectId,
  name,
  materials,
}) => {
  const session = await getSessionOrLogin();
  const slide = getSlideById(session, projectId);

  return (
    <>
      <EditorSidebar projectId={projectId} name={name} materials={materials} />
      <main className="w-screen h-screen flex flex-col bg-slate-200">
        <SliderHeader />
        <div className="size-full flex justify-center items-center">
          <Suspense
            fallback={
              <Loader2 className="text-gray-600 size-16 animate-spin" />
            }
          >
            <SlideEditor slide={slide} />
          </Suspense>
        </div>
      </main>
    </>
  );
};
