import type { Metadata } from "next";
import { Sidebar } from "@/components/Sidebar";
import { MainContent } from "@/components/MainContent";
import "./globals.css";

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
    <html lang="ja">
      <body className="m-0 flex min-h-screen">
        <Sidebar />
        <MainContent>{children}</MainContent>
      </body>
    </html>
  );
}
