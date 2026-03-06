import { notFound } from "next/navigation";
import { getJobListingBySlug, getJobListings } from "@/lib/payload/job-listings";
import { getApplyUrl } from "@/lib/rippling/careers";
import { Container } from "@/app/_components/container";
import { Button } from "@/app/_components/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { JobDescription } from "@/app/(site)/careers/[slug]/_components/job-description";
import { ShareButtons } from "@/app/_components/share-buttons";
import { CSSIcon } from "@/app/_components/icon";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobListingBySlug(slug);
  if (!job) return {};
  return {
    title: `${job.name} | Careers | Synteq Digital`,
    description: `Apply for ${job.name} at Synteq Digital. ${job.department ? `Department: ${job.department}.` : ""} ${job.workLocation || ""}`.trim(),
  };
}

export async function generateStaticParams() {
  const jobs = await getJobListings();
  return jobs.map((job) => ({ slug: job.slug as string }));
}

export default async function JobDetailPage({ params }: Props) {
  const { slug } = await params;
  const job = await getJobListingBySlug(slug);

  if (!job) notFound();

  const applyUrl = getApplyUrl(job.ripplingId as string);

  return (
    <Container>
      <div className="pt-32 pb-24 lg:pt-48 lg:pb-24">
        {/* Mobile header */}
        <div className="lg:hidden">
          <div className="mb-6 flex items-center justify-between">
            <Link
              href="/careers#open-roles"
              className="inline-flex items-center gap-2 text-body font-medium text-lava transition-colors hover:text-lava-70"
            >
              <ArrowLeft className="size-4" />
              Back to all roles
            </Link>
            <ShareButtons />
          </div>

          <div className="mb-8">
            {job.employmentType && (
              <span className="mb-3 inline-block rounded-sm bg-offwhite px-3 py-1.5 text-body-sm font-medium text-lava">
                {job.employmentType}
              </span>
            )}
            <h1 className="title mb-6">{job.name}</h1>
            <div className="flex gap-8">
              {job.workLocation && (
                <div>
                  <p className="text-sm text-lava mb-1">Location</p>
                  <p className="text-body-lg font-medium text-lava">
                    {job.workLocation}
                  </p>
                </div>
              )}
              <div>
                <p className="text-sm text-lava mb-1">Department</p>
                <p className="text-body-lg font-medium text-lava">
                  {job.department || "General"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-[320px_1fr]">
          {/* Left sidebar — sticky (desktop only) */}
          <aside className="hidden lg:block">
            <div className="sticky top-36 flex flex-col gap-8">
              <Link
                href="/careers#open-roles"
                className="group flex items-center gap-2 text-body font-medium text-lava transition-colors hover:text-lava-70"
              >
                <CSSIcon
                  name="arrow-up-right"
                  size="sm"
                  className="-scale-x-100 -scale-y-100 rotate-45 transition-transform group-hover:-translate-x-0.5"
                />
                All Open Roles
              </Link>

              <div className="flex flex-col gap-3">
                {job.employmentType && (
                  <span className="w-fit rounded-sm bg-offwhite px-3 py-1.5 text-body-sm font-medium text-lava">
                    {job.employmentType}
                  </span>
                )}
                <h2 className="heading2">{job.name}</h2>
              </div>

              <div className="flex flex-col gap-6">
                {job.workLocation && (
                  <div>
                    <p className="text-sm text-lava mb-1">Location</p>
                    <p className="text-body-lg font-medium text-lava">
                      {job.workLocation}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-lava mb-1">Department</p>
                  <p className="text-body-lg font-medium text-lava">
                    {job.department || "General"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button variant="primary" size="md" href={applyUrl}>
                  Apply Now
                </Button>
              </div>
              <ShareButtons />
            </div>
          </aside>

          {/* Main content */}
          <div className="lg:pt-4 pb-20 lg:pb-0">
            <JobDescription markdown={job.descriptionMarkdown as string} />

            {/* Bottom apply section */}
            <div className="mt-12 pt-8">
              <p className="text-lg font-semibold text-lava mb-4">Interested in this role?</p>
              <div className="flex items-center gap-4">
                <Button variant="primary" size="md" href={applyUrl}>
                  Apply Now
                </Button>
                {/* <ShareButtons /> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky mobile apply bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-cream bg-white/95 backdrop-blur-sm px-5 py-3 lg:hidden">
        <Button variant="primary" size="md" href={applyUrl} className="w-full">
          Apply Now
        </Button>
      </div>
    </Container>
  );
}
