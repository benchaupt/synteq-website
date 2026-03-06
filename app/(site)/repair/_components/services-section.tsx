import { CSSIcon } from "@/app/_components/icon";
import { Section } from "@/app/_components/section";
import { StyledHeading } from "@/app/_components/styled-heading";
import { cn } from "@/lib/utils";

const services = [
  {
    icon: "repair/subscription",
    title: "Premium Repair Subscriptions",
    description:
      "Guaranteed monthly repair capacity and predictable maintenance spending with fixed margin parts procurement and delivery.",
    comingSoon: false,
  },
  {
    icon: "repair/fleet-refresh",
    title: "Fleet Refresh Services",
    description:
      "All-inclusive service includes testing / diagnostics, cleaning, consolidation, repairs and sell-down.",
    comingSoon: false,
  },
  {
    icon: "repair/gpu-repair",
    title: "GPU Repair Services",
    description: "Coming soon...",
    comingSoon: true,
  },
];

export function ServicesSection() {
  return (
    <Section>
      <div className="flex flex-col gap-12">
        <StyledHeading as="h2" className="heading1">
          Our services.
        </StyledHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12 md:gap-x-16 md:gap-y-16">
          {services.map((service) => (
            <div key={service.title} className="flex flex-col gap-4">
              <CSSIcon
                name={service.icon}
                size="2xl"
                className={cn(service.comingSoon ? "text-slate" : "text-lava")}
              />
              <div className="flex flex-col gap-2">
                <h3
                  className={cn(
                    "heading5",
                    service.comingSoon && "text-slate",
                  )}
                >
                  {service.title}
                </h3>
                <p
                  className={cn(
                    "text-body",
                    service.comingSoon ? "text-slate-50" : "text-lava",
                  )}
                >
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
