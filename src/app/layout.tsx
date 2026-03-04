import type { Metadata } from "next";
import { Noto_Serif_JP, Cormorant_Garamond } from "next/font/google";
import { Sidebar } from "@/components/Sidebar";
import { MainContent } from "@/components/MainContent";
import "./globals.css";

const notoSerif = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-serif",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "Art for Well-being",
  description:
    "表現とケアとテクノロジーのこれから — よく生きていくために、自由な創作や表現を",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSerif.variable} ${cormorant.variable}`}>
      <body className="m-0 flex min-h-screen antialiased">
        <Sidebar />
        <MainContent>{children}</MainContent>
      </body>
    </html>
  );
}
