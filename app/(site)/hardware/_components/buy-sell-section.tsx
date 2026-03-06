/* eslint-disable @next/next/no-img-element */
import { Button } from "@/app/_components/button";

const cards = [
  {
    icon: "/icons/hardware/buying-hardware.svg",
    title: "Buying hardware?",
    body: "Our team is also constantly scouring the secondary market for new deals and proprietary access to inventory that may never hit the public.",
  },
  {
    icon: "/icons/hardware/selling-hardware.svg",
    title: "Selling Hardware?",
    body: "Let us help with clearly defined processes and access to our network of buyers at the ready. Our team's been engaged on numerous liquidation mandates, and we have the experience to make the process smooth and stress-free.",
  },
];

export function BuySellSection() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {cards.map((card) => (
        <div
          key={card.title}
          className="flex flex-col gap-6 border border-lava/25 p-8 md:p-10"
        >
          <img src={card.icon} alt="" className="size-10" />
          <div className="flex flex-col gap-4 flex-1">
            <h3 className="heading4">{card.title}</h3>
            <p className="text-body leading-relaxed">{card.body}</p>
          </div>
          <div>
            <Button href="/contact" size="md">
              Contact Us
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
