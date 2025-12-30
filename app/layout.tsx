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
  openGraph: {
    title: "Synteq AI",
    description: "Build the fastest, modern platform to power AI",
    images: [
      {
        url: "/assets/synteq-banner.png",
        width: 1200,
        height: 630,
        alt: "Synteq AI - The AI Cloud",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Synteq AI",
    description: "Build the fastest, modern platform to power AI",
    images: ["/assets/synteq-banner.png"],
  },
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
