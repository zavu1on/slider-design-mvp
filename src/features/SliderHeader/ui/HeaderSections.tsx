'use client';

import type { FC } from 'react';
import type { LucideProps } from 'lucide-react';
import { cn, useIsMobile } from '@/shared/lib';

type HeaderGroup = {
  action: () => void;
  icon: FC<LucideProps>;
}[];

export type HeaderSection = {
  name: string;
  group: HeaderGroup;
};

export const HeaderSections: FC<{ sections: HeaderSection[] }> = ({
  sections,
}) => {
  const isMobile = useIsMobile();

  return (
    <div
      className={cn('flex flex-row justify-between items-center gap-12', {
        'w-full': isMobile,
      })}
    >
      {sections.map(({ name, group }) => (
        <div
          key={name}
          className="flex flex-row justify-between items-center gap-4"
        >
          {group.map(({ action, icon: Icon }) => (
            <Icon
              key={Icon.displayName}
              className="cursor-pointer"
              onClick={action}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
