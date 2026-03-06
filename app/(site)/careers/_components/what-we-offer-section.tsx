import { StyledHeading } from "@/app/_components/styled-heading";

const benefits = [
  "Fully remote work for most roles.",
  "Equity through stock options or RSUs.",
  "Performance bonuses to reward impact.",
  "Comprehensive health benefits, including medical, dental, and vision.",
  "Retirement plans with 401(k) or RRSP matching.",
  "A culture rooted in trust and transparency that prioritizes wellness and balance and supports each other\u2019s growth.",
];

export function WhatWeOfferSection() {
  return (
    <section className="bg-slate-light-2">
      <div className="mx-auto w-full max-w-viewport px-5 md:px-8 pb-16 pt-8 md:pb-24 md:pt-12">
        <StyledHeading as="h2" className="heading1 mb-6 md:mb-10">
          What We Offer.
        </StyledHeading>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {benefits.map((benefit) => (
            <div
              key={benefit}
              className="border border-lava/50 p-4 md:p-6 flex items-center min-h-32"
            >
              <p className="text-body-lg text-lava">{benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
