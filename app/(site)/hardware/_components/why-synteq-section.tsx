import { CSSIcon } from "@/app/_components/icon";
import { StyledHeading } from "@/app/_components/styled-heading";

const reasons = [
  {
    icon: "hardware/reason-1",
    title: "Reason 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    icon: "hardware/reason-2",
    title: "Reason 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    icon: "hardware/reason-3",
    title: "Reason 3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

export function WhySynteqSection() {
  return (
    <div className="flex flex-col gap-12">
      <StyledHeading as="h2" className="heading">
        Why Choose Synteq
      </StyledHeading>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
        {reasons.map((reason) => (
          <div key={reason.title} className="flex flex-col gap-2">
            <CSSIcon name={reason.icon} size="2xl" className="text-lava" />
            <h3 className="heading4">{reason.title}</h3>
            <p className="text-body leading-relaxed text-lava">
              {reason.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
