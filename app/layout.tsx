import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://synteqdigital.com"),
  title: "Synteq Digital",
  description:
    "Enterprise hardware, HPC, and IT services — powering the infrastructure behind modern business.",
  openGraph: {
    title: "Synteq Digital",
    description:
      "Enterprise hardware, HPC, and IT services — powering the infrastructure behind modern business.",
    images: [
      {
        url: "/images/og/synteq-banner.png",
        width: 1200,
        height: 630,
        alt: "Synteq Digital",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Synteq Digital",
    description:
      "Enterprise hardware, HPC, and IT services — powering the infrastructure behind modern business.",
    images: ["/images/og/synteq-banner.png"],
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
