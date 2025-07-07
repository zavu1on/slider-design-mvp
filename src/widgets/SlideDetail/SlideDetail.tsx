import { FC, Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { getSessionOrLogin } from '@/entities/auth';
import { getSlideById } from '@/entities/slides';
import { SlideEditor } from '@/features/SlideEditor';
import { EditorSidebar } from './lib';

type SlideDetailProps = {
  id: string;
  name: string;
};

export const SlideDetail: FC<SlideDetailProps> = async ({ id, name }) => {
  const session = await getSessionOrLogin();
  const slide = getSlideById(session, id);

  return (
    <>
      <EditorSidebar name={name} />
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
