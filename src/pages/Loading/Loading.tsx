import { type FC } from 'react';
import { Loader2 } from 'lucide-react';

export const Loading: FC = () => {
  return (
    <main className="flex size-full items-center justify-center">
      <Loader2 className="size-16 animate-spin" />
    </main>
  );
};
