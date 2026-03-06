"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/_components/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  items: FAQItem[];
  /** "centered" = centered title + bordered cards (default). "stacked" = left-aligned title + bottom-border items. */
  layout?: "centered" | "stacked";
}

export function FAQSection({
  title = "Frequently Asked Questions",
  subtitle,
  items,
  layout = "centered",
}: FAQSectionProps) {
  if (layout === "stacked") {
    return (
      <div className="flex flex-col gap-10 max-w-3xl">
        <div className="flex flex-col gap-4">
          <h2 className="heading">{title}</h2>
          {subtitle && (
            <p className="text-body-lg text-slate leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        <Accordion type="single" collapsible className="flex flex-col">
          {items.map((item, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="border-b border-lava/50 px-0"
            >
              <AccordionTrigger className="text-base md:text-lg text-lava font-medium">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-body">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-viewport px-5 md:px-8 py-16 md:py-24">
      <div className="max-w-3xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col gap-4 text-center">
          <h2 className="heading">{title}</h2>
          {subtitle && (
            <p className="text-body-lg text-slate leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        <Accordion type="single" collapsible className="flex flex-col gap-2">
          {items.map((item, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="border border-cream rounded-lg px-6"
            >
              <AccordionTrigger className="text-lg md:text-xl text-lava font-medium">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-body text-slate leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
