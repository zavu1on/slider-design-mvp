'use client';

import type { FC } from 'react';
import {
  AlignCenterHorizontal,
  AlignCenterVertical,
  AlignHorizontalSpaceBetween,
  AlignVerticalSpaceBetween,
  BringToFront,
  SendToBack,
} from 'lucide-react';
import { type HeaderSection, HeaderSections } from './ui';

const HEADER_LEFT: HeaderSection[] = [
  {
    name: 'Layers',
    group: [
      {
        action: 'BringToFront',
        icon: BringToFront,
      },
      {
        action: 'SendToBack',
        icon: SendToBack,
      },
    ],
  },
  {
    name: 'Alignment',
    group: [
      {
        action: 'AlignHorizontalSpaceBetween',
        icon: AlignHorizontalSpaceBetween,
      },
      {
        action: 'AlignVerticalSpaceBetween',
        icon: AlignVerticalSpaceBetween,
      },
      {
        action: 'AlignCenterHorizontal',
        icon: AlignCenterVertical,
      },
      {
        action: 'AlignCenterVertical',
        icon: AlignCenterHorizontal,
      },
    ],
  },
];

export const SliderHeader: FC = () => {
  return (
    <header className="w-full pt-4 pr-4">
      <div className="flex flex-row justify-between items-center w-full py-4 px-8 bg-gray-50 shadow">
        <div>{/* MD editor */}</div>
        <HeaderSections sections={HEADER_LEFT} />
      </div>
    </header>
  );
};
