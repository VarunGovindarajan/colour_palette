import { Inter } from 'next/font/google';
import Providers from '@/components/Providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Color Hunt Clone',
  description: 'A clone of the Color Hunt website built with Next.js.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}