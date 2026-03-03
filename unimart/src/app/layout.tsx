// src/app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Unimart — Campus Marketplace',
  description: 'Buy and sell anything within your university campus. The student-only marketplace trusted by thousands of Nigerian students.',
  keywords: ['campus marketplace', 'student marketplace', 'university', 'buy sell', 'unimart'],
  openGraph: {
    title: 'Unimart — Campus Marketplace',
    description: 'The #1 marketplace for Nigerian university students',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
