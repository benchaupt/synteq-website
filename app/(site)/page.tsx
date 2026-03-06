import { Section } from "@/app/_components/section";
import { PageHeader } from "@/app/_components/page-header";
import { Button } from "@/app/_components/button";
import { StatsSection } from "@/app/_components/stats-section";
import { LogoCarousel } from "@/app/_components/logo-carousel";
import { TestimonialCarousel } from "@/app/_components/testimonial-carousel";
import { ServicesGrid } from "@/app/(site)/_components/services-grid";
import { VisionSection } from "@/app/(site)/_components/vision-section";
import { ValuesSection } from "@/app/(site)/_components/values-section";
import { FounderQuotesSection } from "@/app/(site)/_components/founder-quotes-section";
import { RecentBlogs } from "@/app/(site)/knowledge-hub/_components/recent-blogs-server";

const stats = [
  { value: "400,000", label: "Compute units sold since 2020" },
  { value: "30+", label: "Countries served" },
  { value: "99.99%", label: "Infrastructure uptime" },
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

const brandLogos = [
  { src: "/images/brands/Cleanspark.svg", alt: "CleanSpark" },
  { src: "/images/brands/Stronghold.png", alt: "Stronghold Digital Mining" },
  { src: "/images/brands/Cathedra.png", alt: "Cathedra" },
  { src: "/images/brands/Delv.svg", alt: "DELV" },
];

export default function LandingPage() {
  return (
    <>
      <PageHeader
        variant="lander"
        title="Your Trusted Source for Digital Computing Hardware & Data Center Infrastructure."
        body="Since 2016, the team behind Synteq has been supplying Bitcoin mining ASIC hardware, data center infrastructure solutions, and expert consulting services to individuals and institutions around the world. Our unwavering commitment to our clients and partners has made us the preferred vendor to 25 public companies, representing over $30b in total market capitalization."
        ctaText="Get Started"
        ctaHref="/contact"
        contentWidth="w-full md:w-[90%]"
        className="pt-[15vh]"
        height="min-h-[65vh]"
        image="/images/header-assets/circle-x-asset.svg"
        imageFade
        imageClassName="right-0 bottom-0 w-[250px] h-auto opacity-50 md:bottom-auto md:top-1/2 md:-translate-y-1/4 md:w-[500px] md:opacity-75 lg:w-[620px]"
      />

      {/* Section 2: Services Grid + Logo Carousel */}
      <Section innerClassName="flex flex-col py-16 md:py-16 gap-16 md:gap-20">
        <ServicesGrid />
        <div className="py-4 md:py-8">
          <LogoCarousel logos={brandLogos} />
        </div>
      </Section>

      <Section background="slate-light-2">
        <StatsSection
          // title="Our Proven Track Record Since 2020."
          stats={stats}
        />
      </Section>

      {/* Services CTA */}
      <Section>
        <div className="flex flex-col items-center text-center gap-8">
          <h2 className="heading1 max-w-4xl">
            Optimize your data center performance with our custom services and solutions
          </h2>
          <Button variant="primary" size="md" href="/contact">
            Discuss a project
          </Button>
        </div>
      </Section>

      {/* Vision */}
      <Section>
        <VisionSection />
      </Section>

      {/* Testimonials */}
      <Section>
        <TestimonialCarousel
          title="Why thousands of businesses chose Synteq Digital as their preferred partner"
          testimonials={testimonials}
        />
      </Section>

      {/* Values */}
      <Section background="slate-light-2">
        <ValuesSection />
      </Section>

      {/* Founder Quotes */}
      <Section>
        <FounderQuotesSection />
      </Section>

      {/* Recent Blogs */}
      <Section>
        <RecentBlogs />
      </Section>
    </>
  );
}
