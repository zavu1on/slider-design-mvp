import { type FC, Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { getSessionOrLogin } from '@/entities/auth';
import { getSlideById } from '@/entities/slides';
import { EditorSidebar } from '@/features/EditorSidebar';
import { SlideEditor } from '@/features/SlideEditor';
import type { Material } from '@/generated/prisma';

type SlideDetailProps = {
  id: string;
  name: string;
  materials: Material[];
};

export const SlideDetail: FC<SlideDetailProps> = async ({
  id,
  name,
  materials,
}) => {
  const session = await getSessionOrLogin();
  const slide = getSlideById(session, id);

  return (
    <>
      <EditorSidebar id={id} name={name} materials={materials} />
      <main className="w-screen h-screen bg-slate-200 p-8">
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
