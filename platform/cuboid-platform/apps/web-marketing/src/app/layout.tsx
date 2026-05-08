import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CUBOID — Verified African Exchange Network',
  description: 'Compare rates, find brokers, and reserve confidently. The trusted exchange marketplace for African currencies on WhatsApp, Telegram, web and mobile.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-bg_primary text-text_primary">{children}</body>
    </html>
  );
}
