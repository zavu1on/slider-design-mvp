'use client';

import { type FC, useState, useTransition } from 'react';
import { toast } from 'sonner';
import { updateSlideName } from '@/entities/slides';

type ProjectNameInputProps = {
  projectId: string;
  initialName: string;
};

export const ProjectNameInput: FC<ProjectNameInputProps> = ({
  projectId,
  initialName,
}) => {
  const [mode, setMode] = useState<'view' | 'edit'>('view');
  const [name, setName] = useState(initialName);
  const [isPending, startTransition] = useTransition();

  const onLostFocus = () => {
    const finalName = name.trim() || 'Новый проект';
    setName(finalName);
    document.title = `Slide - ${finalName}`;

    setMode('view');

    startTransition(async () => {
      const resp = await updateSlideName(projectId, name);

      if (resp.error) toast.error(resp.error);
    });
  };

  if (mode === 'view')
    return (
      <span
        className="cursor-pointer truncate"
        onDoubleClick={() => setMode('edit')}
      >
        {name}
      </span>
    );
  return (
    <input
      disabled={isPending}
      value={name}
      onChange={(event) => setName(event.target.value)}
      onBlur={onLostFocus}
      className="w-full border-b py-1 disabled:cursor-not-allowed disabled:opacity-50"
    />
  );
};
