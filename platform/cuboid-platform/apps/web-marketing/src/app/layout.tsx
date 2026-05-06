import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cuboid — Institutional Economic Infrastructure',
  description: 'Trust infrastructure for the movement of value across Africa and beyond. Orchestration, settlement, and compliance built for institutions.',
  keywords: ['cross-border payments', 'African fintech', 'institutional payments', 'FX', 'remittance', 'treasury', 'compliance'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}