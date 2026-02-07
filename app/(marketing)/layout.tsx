import { Footer } from "@/app/_components/footer";
import { ModelPrefetch } from "@/app/_components/model-prefetch";
import { Navigation } from "@/app/_components/navigation";
import { SmoothScroll } from "@/app/_components/smooth-scroll";
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
      <SmoothScroll />
      <ModelPrefetch />
      {/* Grid background with content frame */}
      <div className="fixed inset-0 pointer-events-none px-5 z-0">
        <div className="h-full w-full max-w-viewport mx-auto bg-grid bg-grid-frame" />
      </div>

      <AdminBar
        adminBarProps={{
          preview: isEnabled,
        }}
      />
      <Navigation />
      <main className="relative z-10">{children}</main>
      <Footer />
    </>
  );
}
