import { StyledHeading } from "@/app/_components/styled-heading";

export function BrandTypographySection() {
  return (
    <div className="flex flex-col gap-10">
      <StyledHeading as="h2" className="heading1">
        {"Typography."}
      </StyledHeading>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Specimen */}
        <div>
          <span className="text-8xl md:text-9xl font-medium text-lava leading-none">
            Aa
          </span>
        </div>

        {/* Details */}
        <div className="flex flex-col gap-4">
          <h3 className="heading2">DM Sans</h3>
          <div className="flex gap-4">
            <span className="text-body text-lava/50">weights</span>
            <span className="text-body text-lava">Regular</span>
            <span className="text-body font-medium text-lava">Medium</span>
            <span className="text-body font-bold text-lava">Bold</span>
          </div>
        </div>
      </div>
    </div>
  );
}
