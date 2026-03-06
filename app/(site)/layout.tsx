import "@/app/globals.css";
import { Footer } from "@/app/_components/footer";
import { Nav } from "@/app/_components/nav";
import { AdminBar } from "@/payload/components/AdminBar";
import { draftMode } from "next/headers";
import { getJobListings } from "@/lib/payload/job-listings";
import { getRecentPressReleases } from "@/lib/payload/press-releases";
import { getFeaturedSuccessStory } from "@/lib/payload/success-stories";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled } = await draftMode();

  const [jobs, prs, successStory] = await Promise.all([
    getJobListings().catch(() => []),
    getRecentPressReleases(2).catch(() => []),
    getFeaturedSuccessStory().catch(() => null),
  ]);

  const featuredJob = jobs[0]
    ? {
        name: jobs[0].name,
        slug: jobs[0].slug,
        department: jobs[0].department ?? undefined,
        workLocation: jobs[0].workLocation ?? undefined,
      }
    : null;

  // First PR for the About fallback
  const recentPR =
    prs[0] && prs[0].slug
      ? { title: prs[0].title, slug: prs[0].slug }
      : null;

  // 1-2 PRs for the Services dropdown
  const recentPRs = prs
    .filter((pr) => pr.slug)
    .slice(0, 1)
    .map((pr) => ({ title: pr.title, slug: pr.slug! }));

  // Featured success story for Resources dropdown
  const featuredSuccessStory =
    successStory && successStory.slug
      ? {
          title: successStory.title,
          slug: successStory.slug,
          client: successStory.client ?? "",
          clientLogo:
            typeof successStory.clientLogo === "object" &&
            successStory.clientLogo !== null
              ? (successStory.clientLogo as { url?: string }).url ?? null
              : null,
        }
      : null;

  return (
    <>
      <AdminBar
        adminBarProps={{
          preview: isEnabled,
        }}
      />
      <Nav
        featuredJob={featuredJob}
        recentPR={recentPR}
        recentPRs={recentPRs}
        featuredSuccessStory={featuredSuccessStory}
      />
      <main>{children}</main>
      <Footer />
    </>
  );
}
