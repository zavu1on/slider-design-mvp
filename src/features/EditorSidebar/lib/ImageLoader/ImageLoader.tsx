'use client';

import { type FC, useRef, useTransition } from 'react';
import Image from 'next/image';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { toast } from 'sonner';
import {
  CanvasElementType,
  useCanvasStore,
  useMemorizedSlideData,
  useUserMaterialsStore,
} from '@/entities/canvas';
import { uploadImageAction } from '@/entities/slides';
import type { Material } from '@/generated/prisma';
import { LoadingButton } from '@/shared/ui';
import { useInitDragAndDropInput } from './useInitDragAndDropInput';

export const ImageLoader: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const formGroupRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);

  const [isPending, startTransition] = useTransition();

  const { width, height } = useCanvasStore();
  const { currentSlideId, addCanvasElement } = useMemorizedSlideData();
  const { materials, addMaterial } = useUserMaterialsStore((store) => store);

  const addNewImage = (image: Material) => {
    if (!currentSlideId) return;

    image.width = image.width || 0;
    image.height = image.height || 0;

    addCanvasElement(currentSlideId, {
      id: image.id,
      type: CanvasElementType.IMAGE,
      content: image.filePath,
      x: width / 2 - image.width / 2,
      y: height / 2 - image.height / 2,
      width: image.width,
      height: image.height,
    });
  };

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
        result.image.width = result.image.width || 0;
        result.image.height = result.image.height || 0;

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
        <div className="text-xs">* либо перетащите изображение</div>
      </form>
      <div className="font-bold mt-6">Мои материалы</div>
      {materials.length ? (
        <ResponsiveMasonry
          className="mt-2"
          columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
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
