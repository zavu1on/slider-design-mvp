import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { ToastProvider } from '@/shared/providers';
import './globals.css';

const montserratFont = Montserrat({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'Slide Designer',
  description: 'Конструкций презентаций',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={montserratFont.className}>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
