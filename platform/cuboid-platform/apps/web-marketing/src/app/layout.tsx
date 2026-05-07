import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CUBOID — Institutional FX Infrastructure',
  description: 'Premium institutional financial infrastructure for Africa.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-obsidian text-platinum">{children}</body>
    </html>
  );
}