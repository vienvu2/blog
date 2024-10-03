import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "ViênVũ's Portfolio",
  description: "ViênVũ's Portfolio website and blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
