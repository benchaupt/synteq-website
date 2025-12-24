import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const sequalSans = localFont({
  src: "../public/fonts/sequel-sans-roman-disp.ttf",
  variable: "--font-sequal-sans",
  display: "swap",
});

const sequalSansBook = localFont({
  src: "../public/fonts/sequel-sans-book-disp.otf",
  variable: "--font-sequal-sans-book",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Synteq AI",
  description: "Build the fastest, modern platform to power AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${jetbrainsMono.variable} ${sequalSans.variable} ${sequalSansBook.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
