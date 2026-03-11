import type { Metadata } from "next";
import "./globals.css";
import "@/styles/scss/_typography.scss";

export const metadata: Metadata = {
  title: "KS IDEA",
  description: "The Growth Lab - 브랜드 성장 연구소",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* Futura PT - Adobe Typekit */}
        <link rel="stylesheet" href="https://use.typekit.net/xsz5gdr.css" />
        {/* SUIT Variable - CDN */}
        <link
          href="https://cdn.jsdelivr.net/gh/sun-typeface/SUIT@2/fonts/variable/woff2/SUIT-Variable.css"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
