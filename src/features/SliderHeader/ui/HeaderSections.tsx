'use client';

import type { FC } from 'react';
import type { LucideProps } from 'lucide-react';
import { type AlignAction, useAlignActionStore } from '@/entities/canvas';

type HeaderGroup = {
  action: AlignAction;
  icon: FC<LucideProps>;
}[];

export type HeaderSection = {
  name: string;
  group: HeaderGroup;
};

export const HeaderSections: FC<{ sections: HeaderSection[] }> = ({
  sections,
}) => {
  const { setAction } = useAlignActionStore();

  return (
    <div className="flex flex-row justify-between items-center gap-12">
      {sections.map(({ name, group }) => (
        <div
          key={name}
          className="flex flex-row justify-between items-center gap-4"
        >
          {group.map(({ action, icon: Icon }) => (
            <Icon
              key={action}
              className="cursor-pointer"
              onClick={() => setAction(action)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
