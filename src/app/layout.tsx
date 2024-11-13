import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'TL;DR: Reddit Thread Summarizer',
  description: 'Summarize lengthy Reddit threads in seconds',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={``}>{children}</body>
    </html>
  );
}
