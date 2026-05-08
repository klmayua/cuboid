import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ScrollToTop } from "@/components/ScrollToTop";

export const metadata: Metadata = {
  title: "CUBOID — Nigeria's verified exchange network",
  description:
    "Compare live FX rates, connect with verified brokers, reserve exchange deals instantly, and settle confidently.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#07111A",
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
