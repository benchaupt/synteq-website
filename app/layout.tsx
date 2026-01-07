import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://synteqai.berrybyte.workers.dev"),
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
        className={`${dmSans.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
