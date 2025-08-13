'use client';

import { type FC, useEffect, useState } from 'react';
import {
  AlignCenterHorizontal,
  AlignCenterVertical,
  AlignHorizontalSpaceBetween,
  AlignVerticalSpaceBetween,
  Bold,
  BringToFront,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Italic,
  SendToBack,
  Strikethrough,
  Underline,
} from 'lucide-react';
import { useAlignActionStore } from '@/entities/canvas';
import { useIsMobile, useRichTextStore } from '@/shared/lib';
import { type HeaderSection, HeaderSections } from './ui';

const HEADER_RIGHT: HeaderSection[] = [
  {
    name: 'Formatting',
    group: [
      {
        action: () => useRichTextStore.getState().toggleBold(),
        icon: Bold,
      },
      {
        action: () => useRichTextStore.getState().toggleItalic(),
        icon: Italic,
      },
      {
        action: () => useRichTextStore.getState().toggleUnderline(),
        icon: Underline,
      },
      {
        action: () => useRichTextStore.getState().toggleStrike(),
        icon: Strikethrough,
      },
    ],
  },
  {
    name: 'Heading',
    group: [
      {
        action: () => useRichTextStore.getState().toggleHeading(1),
        icon: Heading1,
      },
      {
        action: () => useRichTextStore.getState().toggleHeading(2),
        icon: Heading2,
      },
      {
        action: () => useRichTextStore.getState().toggleHeading(3),
        icon: Heading3,
      },
      {
        action: () => useRichTextStore.getState().toggleHeading(4),
        icon: Heading4,
      },
    ],
  },
];

const HEADER_LEFT: HeaderSection[] = [
  {
    name: 'Layers',
    group: [
      {
        action: () => useAlignActionStore.getState().setAction('BringToFront'),
        icon: BringToFront,
      },
      {
        action: () => useAlignActionStore.getState().setAction('SendToBack'),
        icon: SendToBack,
      },
    ],
  },
  {
    name: 'Alignment',
    group: [
      {
        action: () =>
          useAlignActionStore
            .getState()
            .setAction('AlignHorizontalSpaceBetween'),
        icon: AlignHorizontalSpaceBetween,
      },
      {
        action: () =>
          useAlignActionStore.getState().setAction('AlignVerticalSpaceBetween'),
        icon: AlignVerticalSpaceBetween,
      },
      {
        action: () =>
          useAlignActionStore.getState().setAction('AlignCenterHorizontal'),
        icon: AlignCenterVertical,
      },
      {
        action: () =>
          useAlignActionStore.getState().setAction('AlignCenterVertical'),
        icon: AlignCenterHorizontal,
      },
    ],
  },
];

export const SliderHeader: FC = () => {
  const isMobile = useIsMobile();
  const [maxWidth, setMaxWidth] = useState('100%');

  useEffect(() => {
    if (isMobile && maxWidth === '100%') {
      setMaxWidth('calc(100vw - 36px)');
    }
  }, [isMobile, maxWidth]);

  return (
    <header className="w-full pt-4 pr-2 md:pr-4">
      <div
        className="flex flex-col md:flex-row justify-between items-start md:items-center w-full py-3 md:py-4 px-4 md:px-8 bg-gray-50 shadow overflow-scroll"
        style={{ maxWidth }}
      >
        <HeaderSections sections={HEADER_RIGHT} />
        <HeaderSections sections={HEADER_LEFT} />
      </div>
    </header>
  );
};
