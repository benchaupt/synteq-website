import "@/app/globals.css";
import { Footer } from "@/app/_components/footer";
import { Nav } from "@/app/_components/nav";
import { AdminBar } from "@/payload/components/AdminBar";
import { draftMode } from "next/headers";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled } = await draftMode();

  return (
    <>
      <AdminBar
        adminBarProps={{
          preview: isEnabled,
        }}
      />
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  );
}
