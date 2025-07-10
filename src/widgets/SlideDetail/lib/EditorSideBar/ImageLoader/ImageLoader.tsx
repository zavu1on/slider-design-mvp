'use client';

import { type FC, useRef, useTransition } from 'react';
import Image from 'next/image';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { toast } from 'sonner';
import {
  uploadImageAction,
  useAddImageStore,
  useUserMaterialsStore,
} from '@/entities/slides';
import { LoadingButton } from '@/shared/ui';
import { useInitDragAndDropInput } from './useInitDragAndDropInput';

export const ImageLoader: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const formGroupRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);

  const [isPending, startTransition] = useTransition();

  const addNewImage = useAddImageStore((store) => store.addNewImage);
  const { materials, addMaterial } = useUserMaterialsStore((store) => store);

  const sendImage = (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    startTransition(async () => {
      const result = await uploadImageAction(formData);

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      if (result.image?.filePath) {
        addNewImage(result.image);
        addMaterial(result.image);
      }
    });
  };

  useInitDragAndDropInput(
    containerRef,
    formGroupRef,
    inputRef,
    labelRef,
    sendImage
  );

  return (
    <div className="text-gray-400">
      <div className="font-bold">Загрузить изображение</div>
      <form>
        <div className="hidden mt-2" ref={containerRef}>
          <div
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg flex justify-center items-center cursor-pointer transition-colors"
            ref={formGroupRef}
          >
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              ref={inputRef}
              onChange={(event) => {
                if (event.target.files?.length)
                  sendImage(event.target.files[0]);
              }}
            />
            <label
              htmlFor="image-upload"
              className="text-gray-500 font-medium text-lg transition-colors"
              ref={labelRef}
            >
              Перетащите изображение сюда или нажмите, чтобы загрузить
            </label>
          </div>
        </div>
        <LoadingButton
          loading={isPending}
          type="button"
          className="w-full mt-2"
          onClick={() => inputRef.current?.click()}
        >
          Загрузить
        </LoadingButton>
        <div className="text-gray-400 text-xs">
          * либо перетащите изображение
        </div>
      </form>

      <div className="font-bold mt-6">Мои материалы</div>
      {materials.length ? (
        <ResponsiveMasonry
          className="mt-2"
          columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
          // gutterBreakpoints={{ 350: '12px', 750: '16px', 900: '24px' }}
        >
          <Masonry>
            {materials.map((image) => (
              <Image
                loading="lazy"
                key={image.id}
                src={image.filePath}
                alt={image.filePath}
                width={image.width ?? undefined}
                height={image.height ?? undefined}
                className="cursor-pointer"
                onClick={() => addNewImage(image)}
              />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      ) : (
        <div className="text-gray-400 text-xs mt-1">
          загруженных материалов пока нет
        </div>
      )}
    </div>
  );
};
