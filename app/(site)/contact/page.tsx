import { Suspense } from "react";
import { Section } from "@/app/_components/section";
import { LogoCarousel } from "@/app/_components/logo-carousel";
import { TestimonialCarousel } from "@/app/_components/testimonial-carousel";
import { ContactInfo } from "@/app/(site)/contact/_components/contact-info";
import { ContactForm } from "@/app/(site)/contact/_components/contact-form";

export const metadata = {
  title: "Contact | Synteq Digital",
  description:
    "Get in touch with Synteq Digital for enterprise hardware, HPC, and IT services.",
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

export default function ContactPage() {
  return (
    <>
      <Section background="slate-light-3" className="pt-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <ContactInfo />
          </div>
          <div className="bg-white p-8 md:p-10 flex flex-col">
            <Suspense>
              <ContactForm className="flex-1" />
            </Suspense>
          </div>
        </div>
      </Section>

      {/* Logo Carousel */}
      <Section>
        <LogoCarousel logos={brandLogos} />
      </Section>

      {/* Testimonials */}
      <Section innerClassName="mx-auto w-full max-w-viewport px-5 md:px-8 pt-0 pb-16 md:pt-0 md:pb-24">
        <TestimonialCarousel
          title="Why thousands of businesses chose Synteq Digital as their preferred partner"
          testimonials={testimonials}
        />
      </Section>
    </>
  );
}
