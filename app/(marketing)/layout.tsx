import { Footer } from "@/app/_components/footer";
import { Navigation } from "@/app/_components/navigation";
import { AdminBar } from '@/payload/components/AdminBar';
import { draftMode } from 'next/headers';

export default async function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled } = await draftMode()

  return (
    <>
      <AdminBar
        adminBarProps={{
          preview: isEnabled,
        }}
      />
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  );
}
