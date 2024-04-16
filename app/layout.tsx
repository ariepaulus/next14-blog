import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import { ThemeProvider } from '@/components/ThemeProvider';
import Chatbot from '@/components/Chatbot';

const roboto = Roboto({ weight: ['400', '700'], subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | Next14 Blog',
    default: 'Next14 Blog',
  },
  creator: 'Arie Verburgh',
  description: 'Portfolio of Arie Verburgh',
  applicationName: 'Next.js App Router/TypeScript',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' data-lt-installed='true' suppressHydrationWarning={true}>
      <body className={roboto.className} suppressHydrationWarning={true}>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className='mt-12'>{children}</main>
          <Chatbot />
        </ThemeProvider>
      </body>
    </html>
  );
}
