import { type RefObject, useEffect } from 'react';

export const useInitDragAndDropInput = (
  containerRef: RefObject<HTMLDivElement | null>,
  formGroupRef: RefObject<HTMLDivElement | null>,
  inputRef: RefObject<HTMLInputElement | null>,
  labelRef: RefObject<HTMLLabelElement | null>,
  sendImage: (file: File) => void
) => {
  const onLabelDragover = (event: DragEvent) => {
    event.preventDefault();
    formGroupRef.current?.classList.add('bg-slate-400');
    labelRef.current?.classList.add('text-slate-100');
  };
  const onLabelDragleave = () => {
    formGroupRef.current?.classList.remove('bg-slate-400');
    labelRef.current?.classList.remove('text-slate-100');
  };
  const onLabelDrop = (event: DragEvent) => {
    if (!inputRef.current) return;

    event.preventDefault();
    const files = event.dataTransfer?.files;
    inputRef.current.files = files ?? null;

    if (files?.length) sendImage(files[0]);
  };
  const onDragStart = () => {
    containerRef.current?.classList.remove('hidden');
  };
  const onDragEnd = () => {
    containerRef.current?.classList.add('hidden');
  };

  useEffect(() => {
    if (!inputRef.current || !formGroupRef.current) return;

    formGroupRef.current.addEventListener('dragover', onLabelDragover);
    formGroupRef.current.addEventListener('dragleave', onLabelDragleave);
    formGroupRef.current.addEventListener('drop', onLabelDrop);

    document.addEventListener('dragover', onDragStart);
    document.addEventListener('dragleave', onDragEnd);
    document.addEventListener('drop', onDragEnd);

    return () => {
      formGroupRef.current?.removeEventListener('dragover', onLabelDragover);
      formGroupRef.current?.removeEventListener('dragleave', onLabelDragleave);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      formGroupRef.current?.removeEventListener('drop', onLabelDrop);

      document.removeEventListener('dragover', onDragStart);
      document.removeEventListener('dragleave', onDragEnd);
      document.removeEventListener('drop', onDragEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputRef, formGroupRef]);
};
