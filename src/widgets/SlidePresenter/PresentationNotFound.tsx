import type { FC } from 'react';
import Link from 'next/link';

export const PresentationNotFound: FC = () => (
  <div className="h-screen flex items-center justify-center bg-gray-100">
    <div className="mx-auto py-10 px-16 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Презентация не найдена</h2>
      <p className="text-gray-600">
        К сожалению, но презентация по этому URL не была найдена.
      </p>
      <p className="text-gray-600 mb-4">
        Пожалуйста, проверьте URL и попробуйте снова.
      </p>
      <Link href="/slides">К списку презентаций</Link>
    </div>
  </div>
);
