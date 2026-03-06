import Image from "next/image";
import { Button } from "@/app/_components/button";

export function CareersCTA() {
  return (
    <div className="border border-lava/25 flex flex-col md:flex-row overflow-hidden">
      {/* Left — text + CTA */}
      <div className="flex flex-col justify-center gap-6 p-8 md:p-12 md:w-1/2">
        <p className="text-xl md:text-2xl font-medium text-lava leading-snug max-w-md">
          Explore careers at Synteq Digital as we build the infrastructure that
          powers the future of computing.
        </p>
        <div>
          <Button variant="primary" size="md" href="/careers">
            Explore Careers
          </Button>
        </div>
      </div>

      {/* Right — image */}
      <div className="md:w-1/2 flex justify-end">
        <Image
          src="/images/team/track-day.webp"
          alt="Synteq Digital team"
          width={600}
          height={400}
          className="h-full w-auto object-cover"
        />
      </div>
    </div>
  );
}
