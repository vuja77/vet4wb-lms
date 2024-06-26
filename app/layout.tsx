import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Edu4Wb",
  description:
  'The "VET for Western Balkans" project aims to contribute to the improvement and modernization of VET systems in four partner countries in the Western Balkans: Albania, Bosnia and Herzegovina, Montenegro and Kosovo, and reinforcement of the links between VET and labour market.',
};
import Nav from "./components/nav/nav";
import { getLang } from "@/utils/lang";
import { Suspense } from "react";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const langague = getLang();
  return (
    <html lang="en">
      <head></head>
      <body className={inter.className}>
        <Providers>
          <Suspense fallback={<div>Loading...</div>}>
            <Nav lang={langague} />
          </Suspense>
          {children}
        </Providers>
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
