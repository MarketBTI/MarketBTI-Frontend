import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import './theme.css';

const pretendardJP = localFont({
  src: '../assets/fonts/PretendardJPVariable.woff2',
  display: 'swap',
  weight: '100 900',
  variable: '--font-pretendard-jp',
});

export const metadata: Metadata = {
  title: 'MarketBTI',
  description: '창업하기 위험한 상권을 진단해주는 서비스',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang='ko' className={`${pretendardJP.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
