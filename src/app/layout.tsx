import type { Metadata } from 'next';
import localFont from 'next/font/local';
import clsx from 'clsx';
import { QueryProvider } from '@/app/_providers/QueryProvider';
import './globals.css';
import './styles/theme.css';

const pretendardJP = localFont({
  src: '../assets/fonts/PretendardJPVariable.woff2',
  display: 'swap',
  weight: '100 900',
  variable: '--font-pretendard-jp',
});

export const metadata: Metadata = {
  title: 'MarketBTI',
  description: '창업하기 위험한 상권을 진단해주는 서비스',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang='ko' className={clsx(pretendardJP.variable, 'antialiased')}>
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
