import { Section } from "@/app/_components/section";
import { Icon } from "@/app/_components/icon";

const features = [
  {
    icon: "manufacturer-certified",
    title: "Manufacturer Certified",
    description:
      "Our technicians have been certified across all major manufacturers, including Bitmain, MicroBT, Canaan and Auradine, through hands-on training programs.",
  },
  {
    icon: "us-based",
    title: "US Based, On Shore Repairs",
    description:
      "We're one of the only onshore repair service providers built to support multi-manufacturer fleets at scale, with two locations across the United States.",
  },
];

export function FeaturesSection() {
  return (
    <Section background="white">
      <div className="grid gap-6 md:grid-cols-2">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex flex-col gap-6 border border-black/50 p-8 md:p-10"
          >
            <Icon name={feature.icon} size="2xl" />
            <div className="flex flex-col gap-2">
              <h3 className="heading5">{feature.title}</h3>
              <p className="text-body">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
