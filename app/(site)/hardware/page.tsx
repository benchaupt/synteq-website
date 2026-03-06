import { Section } from "@/app/_components/section";
import { PageHeader } from "@/app/_components/page-header";
import { CTASection } from "@/app/_components/cta-section";
import { LogoCarousel } from "@/app/_components/logo-carousel";
import { StatsSection } from "@/app/_components/stats-section";
import { TestimonialCarousel } from "@/app/_components/testimonial-carousel";
import { FAQSection } from "@/app/_components/faq-section";
import { BuySellSection } from "./_components/buy-sell-section";
import { PartnersSection } from "./_components/partners-section";
import { WhySynteqSection } from "./_components/why-synteq-section";
import { AcquisitionSection } from "./_components/acquisition-section";
import { AsicComputeSection } from "./_components/asic-compute-section";
import { ProcessSection } from "./_components/process-section";
import { HardwareTeamSection } from "./_components/team-section";
import { SuccessStoryCard } from "@/app/_components/success-story-card";
import { getFeaturedSuccessStory } from "@/lib/payload/success-stories";

export const metadata = {
  title: "Hardware | Synteq Digital",
  description:
    "A leading global distributor of ASIC and GPU hardware. Buy and sell enterprise-grade hardware with Synteq Digital.",
};

const logos = [
  { src: "/images/brands/Cleanspark.svg", alt: "CleanSpark" },
  { src: "/images/brands/Stronghold.png", alt: "Stronghold Digital Mining" },
  { src: "/images/brands/Cathedra.png", alt: "Cathedra" },
  { src: "/images/brands/Delv.svg", alt: "DELV" },
];

const stats = [
  { value: "17%", label: "of all new hashrate" },
  { value: "400,000", label: "ASICs sold" },
  { value: "1.4", label: "MW of ASICs sold" },
];

const testimonials = [
  {
    name: "James McAvity",
    role: "CEO",
    company: "Cormint",
    logo: (
      <span className="text-xl font-bold tracking-tight text-lava">
        cormint
      </span>
    ),
    text: "Cormint has purchased over 40,000 used miners through different brokers and sellers since 2017. Machines that were sold to Cormint by Synteq ranked #1 in terms of longevity, achieving the lowest failure rate.",
  },
  {
    name: "James McAvity",
    role: "CEO",
    company: "Cormint",
    logo: (
      <span className="text-xl font-bold tracking-tight text-lava">
        cormint
      </span>
    ),
    text: "Cormint has purchased over 40,000 used miners through different brokers and sellers since 2017. Machines that were sold to Cormint by Synteq ranked #1 in terms of longevity, achieving the lowest failure rate.",
  },
];

const faqItems = [
  {
    question: "How will I know where my units are once they ship?",
    answer:
      "We provide full tracking information for all shipments. You'll receive regular updates on the status and location of your hardware from the moment it leaves our facility until it arrives at your door.",
  },
  {
    question: "How are repairs and RMA handled?",
    answer:
      "Our dedicated support team handles all repairs and RMA requests. We coordinate the entire process from diagnostics to repair or replacement, ensuring minimal downtime for your operations.",
  },
  {
    question: "What kind of warranty does Synteq offer?",
    answer:
      "For new equipment, we offer the manufacturer's warranty. For used batches, they will either have the remaining manufacturer's warranty, or we can typically negotiate an amount of extra units to include for parts.",
  },
  {
    question:
      "If I choose shipping through Synteq's logistics provider, will my units be insured?",
    answer:
      "Yes, all shipments through our logistics partners include full insurance coverage. We ensure your investment is protected throughout the entire shipping process.",
  },
  {
    question: "Can I cancel my order?",
    answer:
      "Cancellation policies vary depending on the stage of your order. Please contact our team as soon as possible if you need to make changes, and we'll work with you to find the best solution.",
  },
];

export default async function HardwarePage() {
  const featuredStory = await getFeaturedSuccessStory();
  return (
    <>
      {/* Hero */}
      <PageHeader
        label="Hardware"
        title="A leading global distributor of ASIC and GPU hardware"
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        contentWidth="w-full md:w-4/5"
        height="min-h-[65vh]"
        className="pt-[15vh]"
        image="/images/header-assets/circle-x-asset.svg"
        imageFade
        imageClassName="right-0 top-1/5 w-[250px] h-auto md:top-1/4 md:w-[620px]"
      />

      {/* Logo Carousel */}
      <Section>
        <LogoCarousel logos={logos} />
      </Section>

      {/* Stats + Buy/Sell — continuous offwhite block */}
      <Section background="offwhite" innerClassName="mx-auto w-full max-w-viewport px-5 md:px-8 py-16 md:py-24 flex flex-col gap-16">
        <StatsSection
          title="Our Proven Track Record Since 2020."
          stats={stats}
        />
      </Section>
      <Section>
        <BuySellSection />
      </Section>

      {/* Partners */}
      <Section>
        <PartnersSection />
      </Section>

      {/* Why Choose Synteq */}
      <Section>
        <WhySynteqSection />
      </Section>

      {/* Hardware Acquisition */}
      <Section>
        <AcquisitionSection />
      </Section>

      {/* ASIC Compute */}
      <Section>
        <AsicComputeSection />
      </Section>

      {/* Testimonials */}
      <Section>
        <TestimonialCarousel
          title="Why thousands of businesses chose Synteq Digital as their preferred partner"
          testimonials={testimonials}
        />
      </Section>

      {/* Team */}
      <Section>
        <HardwareTeamSection />
      </Section>

      {/* Featured Success Story */}
      {featuredStory && (
        <Section>
          <SuccessStoryCard story={featuredStory} />
        </Section>
      )}

      {/* FAQ */}
      <Section background="silver">
        <FAQSection items={faqItems} layout="stacked" />
      </Section>

      {/* CTA */}
      <CTASection
        heading={
          <>
            Looking to buy or sell parts?
            <br />
            Contact Us!
          </>
        }
        buttonText="Contact Us"
        buttonHref="/contact"
        background="silver"
        backgroundImage="/images/dotted-circle-bg.svg"
        contentWidth="max-w-3xl"
      />
    </>
  );
}
