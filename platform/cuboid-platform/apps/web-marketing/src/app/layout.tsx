import type { Metadata } from "next";
import "./globals.css";
import { ScrollToTop } from "@/components/ScrollToTop";

export const metadata: Metadata = {
  title: "CUBOID — Africa's verified exchange network",
  description:
    "Compare live rates, connect with verified brokers, reserve exchange deals instantly, and settle confidently — all from WhatsApp.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-bg text-text_primary">
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
