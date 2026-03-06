import { Section } from "@/app/_components/section";
import { SuccessStoryCard } from "@/app/_components/success-story-card";
import { StyledHeading } from "@/app/_components/styled-heading";
import { Button } from "@/app/_components/button";
import { LogoCarousel } from "@/app/_components/logo-carousel";
import { TestimonialCarousel } from "@/app/_components/testimonial-carousel";
import { RecentPressReleases } from "@/app/(site)/knowledge-hub/_components/recent-press-releases";
import { RecentBlogs } from "@/app/(site)/knowledge-hub/_components/recent-blogs-server";
import { getTopSuccessStories } from "@/lib/payload/success-stories";

export const metadata = {
  title: "Knowledge Hub | Synteq Digital",
  description: "Blogs, success stories, and press releases from Synteq Digital.",
};

const brandLogos = [
  { src: "/images/brands/Cleanspark.svg", alt: "CleanSpark" },
  { src: "/images/brands/Stronghold.png", alt: "Stronghold Digital Mining" },
  { src: "/images/brands/Cathedra.png", alt: "Cathedra" },
  { src: "/images/brands/Delv.svg", alt: "DELV" },
];

const testimonials = [
  {
    name: "James McAvity",
    role: "CEO",
    company: "Cormint",
    logo: (
      <span className="text-2xl font-bold tracking-tight text-lava">cormint</span>
    ),
    text: "Cormint has purchased over 40,000 used miners through different brokers and sellers since 2017. Machines that were sold to Cormint by Synteq ranked #1 in terms of longevity, achieving the lowest failure rate.",
  },
  {
    name: "James McAvity",
    role: "CEO",
    company: "Cormint",
    logo: (
      <span className="text-2xl font-bold tracking-tight text-lava">cormint</span>
    ),
    text: "Cormint has purchased over 40,000 used miners through different brokers and sellers since 2017. Machines that were sold to Cormint by Synteq ranked #1 in terms of longevity, achieving the lowest failure rate.",
  },
  {
    name: "James McAvity",
    role: "CEO",
    company: "Cormint",
    logo: (
      <span className="text-2xl font-bold tracking-tight text-lava">cormint</span>
    ),
    text: "Cormint has purchased over 40,000 used miners through different brokers and sellers since 2017. Machines that were sold to Cormint by Synteq ranked #1 in terms of longevity, achieving the lowest failure rate.",
  },
];

export default async function KnowledgeHubPage() {
  const topStories = await getTopSuccessStories(3);

  return (
    <>
      {/* Small ancillary header */}
      <Section className="pt-28 md:pt-32" innerClassName="pb-8 md:pb-12">
        <div className="flex flex-col gap-12 md:gap-8">
          <div className="flex flex-col gap-2">
            <span className="subheading">Resources</span>
            <StyledHeading as="h1" className="heading">
              {"Knowledge Hub."}
            </StyledHeading>
            <p className="body max-w-4xl">
            We strive to elevate the industry through empowerment and education. Whether you&apos;re new, or already a key player in the industry, we&apos;re here to provide you with the latest insights and resources.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/knowledge-hub/blogs" variant="primary" size="md">Blogs</Button>
            <Button href="/knowledge-hub/success-stories" variant="primary" size="md">Success Stories</Button>
            <Button href="/knowledge-hub/press-releases" variant="primary" size="md">Press Releases</Button>
          </div>
        </div>
      </Section>

      {/* Success Stories */}
      {topStories.length > 0 && (
        <Section id="success-stories" className="scroll-mt-20">
          <div className="flex flex-col gap-6 md:gap-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <StyledHeading as="h2" className="heading1">
                Success Stories.
              </StyledHeading>
              <Button href="/knowledge-hub/success-stories" variant="primary" size="md">
                View All
              </Button>
            </div>
            <div className="flex flex-col gap-10">
              {topStories.map((story) => (
                <SuccessStoryCard key={story.id} story={story} />
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* Logo Carousel */}
      <Section>
        <LogoCarousel logos={brandLogos} />
      </Section>

      {/* Recent Press Releases */}
      <Section id="press-releases" className="scroll-mt-20">
        <RecentPressReleases />
      </Section>

      {/* Recent Blogs */}
      <Section id="blogs" className="scroll-mt-20">
        <RecentBlogs />
      </Section>

      {/* Testimonials */}
      <Section>
        <TestimonialCarousel
          title="Why thousands of businesses chose Synteq Digital as their preferred partner"
          testimonials={testimonials}
        />
      </Section>
    </>
  );
}
