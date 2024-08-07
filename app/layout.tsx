// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Le Plessis aux Lys",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#fdfdfd]">
      <body className={inter.className}>
        <div className="fixed w-screen top-0 z-50 bg-none bg-transparent"></div>
        <main> {children}</main>
      </body>
    </html>
  );
}
