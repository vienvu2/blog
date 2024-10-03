import type { Metadata } from "next";
import "./globals.scss";
import Header from "@/container/header";

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
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <title>ViênVũ{"'"}s Portfolio</title>
        <meta
          name="description"
          content="ViênVũ's Portfolio website and blog"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
