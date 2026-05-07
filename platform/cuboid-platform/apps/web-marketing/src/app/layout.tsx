import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CUBOID — Institutional FX Infrastructure',
  description: 'Trust infrastructure for the movement of value across Africa.',
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