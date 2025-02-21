import './globals.css';
import { spaceMono } from '@/components/ui/font';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={`${spaceMono.variable}`}>
      <title>TIP CALCULATOR APP</title>
      <body>
        <header className='sr-only'>TIP CALCULATOR</header>
        {children}
      </body>
    </html>
  );
}
