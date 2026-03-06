import { Section } from "@/app/_components/section";
import { Button } from "@/app/_components/button";

export function AcquisitionSection() {
  return (
    <Section background="white">
      <div className="grid gap-8 md:grid-cols-2 md:gap-16">
        <div className="flex flex-col gap-6">
          <p className="text-body leading-relaxed text-lava">
            Synteq Digital has expanded its service offerings with the
            acquisition of HMTech&apos;s repair services business. This
            strategic acquisition combines HMTech&apos;s expertise in computer
            hardware and ASIC repairs with Synteq&apos;s established position as
            a global leader in digital compute hardware, infrastructure and
            services.
          </p>
          <div className="hidden md:block">
            <Button href="/knowledge-hub" size="md">
              Read the press release
            </Button>
          </div>
        </div>
        <div>
          <p className="text-body leading-relaxed text-lava">
            With HMTech&apos;s leadership and team joining Synteq, we are
            strengthening our ability to deliver comprehensive lifecycle
            management for high-value compute hardware, build a premier technical
            services provider in the industry, and scale our data center
            footprint.
          </p>
        </div>
        <div className="md:hidden">
          <Button href="/knowledge-hub" size="md">
            Read the press release
          </Button>
        </div>
      </div>
    </Section>
  );
}
