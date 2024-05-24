import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import toast, { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Edu4Wb",
  description: "The “VET for Western Balkans” project aims to contribute to the improvement and modernization of VET systems in four partner countries in the Western Balkans: Albania, Bosnia and Herzegovina, Montenegro and Kosovo, and reinforcement of the links between VET and labour market.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
