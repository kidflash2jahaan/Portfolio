import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jahaan Pardhanani — Portfolio",
  description:
    "Technologist, FRC Software Lead, classical pianist, songwriter, and live performer.",
  metadataBase: new URL("https://jahaan.dev"),
  openGraph: {
    title: "Jahaan Pardhanani",
    description:
      "Technologist, FRC Software Lead, classical pianist, songwriter, and live performer.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col selection:bg-ink selection:text-white">
        {children}
      </body>
    </html>
  );
}
