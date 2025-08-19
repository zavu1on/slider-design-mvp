'use client';

import type { FC } from 'react';
import {
  selectHasUnsavedChanges,
  selectLastUpdatedAt,
  useSlideStore,
} from '@/entities/canvas';

export const LastUpdateLabel: FC = () => {
  const hasUnsavedChanges = useSlideStore(selectHasUnsavedChanges);
  const lastUpdatedAt = useSlideStore(selectLastUpdatedAt);

  return (
    <div className="flex flex-row justify-between text-sm mt-2">
      <div className="text-gray-500">
        Последнее обновление: {lastUpdatedAt?.toLocaleString()}
      </div>
      {hasUnsavedChanges && (
        <div className="text-red-500">Есть несохраненные изменения</div>
      )}
    </div>
  );
};
