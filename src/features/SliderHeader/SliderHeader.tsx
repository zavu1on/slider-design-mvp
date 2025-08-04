'use client';

import type { FC } from 'react';
import {
  AlignCenterHorizontal,
  AlignCenterVertical,
  AlignHorizontalSpaceBetween,
  AlignVerticalSpaceBetween,
} from 'lucide-react';
import { useAlignActionStore } from '@/entities/canvas';

export const SliderHeader: FC = () => {
  const setAction = useAlignActionStore((store) => store.setAction);

  return (
    <header className="w-full pt-4 pr-4">
      <div className="flex flex-row justify-between items-center w-full py-4 px-8 bg-gray-50 shadow">
        <div></div>
        <div className="flex flex-row justify-between items-center gap-4">
          <AlignHorizontalSpaceBetween
            className="cursor-pointer"
            onClick={() => setAction('AlignHorizontalSpaceBetween')}
          />
          <AlignVerticalSpaceBetween
            className="cursor-pointer"
            onClick={() => setAction('AlignVerticalSpaceBetween')}
          />
          <AlignCenterHorizontal
            className="cursor-pointer"
            onClick={() => setAction('AlignCenterVertical')}
          />
          <AlignCenterVertical
            className="cursor-pointer"
            onClick={() => setAction('AlignCenterHorizontal')}
          />
        </div>
      </div>
    </header>
  );
};
