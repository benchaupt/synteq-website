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

interface HardwareFAQSectionProps {
  title?: string;
  items: FAQItem[];
}

export function HardwareFAQSection({
  title = "Frequently Asked Questions",
  items,
}: HardwareFAQSectionProps) {
  return (
    <div className="grid items-start gap-10 md:grid-cols-[1fr_2fr]">
      <h2 className="heading">{title}</h2>

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
