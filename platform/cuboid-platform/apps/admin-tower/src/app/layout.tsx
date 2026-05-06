import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cuboid — Control Tower',
  description: 'Internal operations and control center',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}