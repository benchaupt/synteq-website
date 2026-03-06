import Image from "next/image";
import { StyledHeading } from "@/app/_components/styled-heading";

const partners = [
  {
    name: "Bitmain",
    logo: "/assets/hardware/bitmain-logo.svg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    name: "DELV",
    logo: "/assets/hardware/delv-logo.svg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    name: "Lenovo",
    logo: "/assets/hardware/lenovo-logo.svg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

export function PartnersSection() {
  return (
    <div className="flex flex-col gap-12">
      <StyledHeading as="h2" className="heading1">
        Our Partners.
      </StyledHeading>

      <div className="flex flex-col gap-10">
        {partners.map((partner) => (
          <div
            key={partner.name}
            className="grid items-start gap-6 md:grid-cols-3"
          >
            <div className="md:col-span-1">
              <Image
                src={partner.logo}
                alt={partner.name}
                width={160}
                height={22}
                className="h-6 w-auto object-contain object-left"
              />
            </div>
            <p className="text-body md:col-span-2">
              {partner.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
