import { CSSIcon } from "@/app/_components/icon";
import { Section } from "@/app/_components/section";
import { StyledHeading } from "@/app/_components/styled-heading";

const features = [
  {
    icon: "hpc/enterprise-hardware",
    title: "Enterprise Hardware",
    description:
      "All of the hardware powering your server and infrastructure are from trusted enterprise brands such as Supermicro, Juniper, APC, AMD, Intel, and more.",
  },
  {
    icon: "hpc/sla",
    title: "99.99% SLA",
    description:
      "With enterprise hardware, advanced datacenters, flywheel energy storage, and multihomed network upstreams, we offer a 99.99% uptime SLA on dedicated and GPU products.",
  },
  {
    icon: "hpc/anti-ddos",
    title: "Anti-DDoS",
    description:
      "Crunchbits' network is actively protected against DDoS attacks: detection, countermeasures, and automatic scrubbing for ease and peace of mind.",
  },
  {
    icon: "hpc/fiber-network",
    title: "Fiber Network",
    description:
      "With multiple upstream carriers, direct peering, and diverse physical fiber circuits to ensure redundancy, experience unmatched connectivity and uptime.",
  },
  {
    icon: "hpc/custom-solutions",
    title: "Custom Solutions",
    description:
      "Whether for personal use or business use, we have a custom solution that can handle whatever requirements your current project demands. Contact us to get something tailored to your needs and budget.",
  },
  {
    icon: "hpc/local-support",
    title: "Local Support",
    description:
      "While every service is unmanaged, we do still have on-site and full-time knowledgeable Crunchbits-only staff for any issues or concerns that might come up.",
  },
];

export function FeaturesSection() {
  return (
    <Section>
      <div className="flex flex-col gap-12">
        <StyledHeading as="h2" className="heading1">
          What sets us apart.
        </StyledHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12 md:gap-x-12 md:gap-y-16">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col gap-4">
              <CSSIcon name={feature.icon} size="2xl" className="text-lava" />
              <div className="flex flex-col gap-2">
                <h3 className="heading4">{feature.title}</h3>
                <p className="text-body leading-relaxed text-lava">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
