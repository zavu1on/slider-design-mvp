'use client';

import type { FC } from 'react';
import type { LucideProps } from 'lucide-react';

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
  return (
    <div className="flex flex-row justify-between items-center gap-12">
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
