import { Section } from "@/app/_components/section";
import { Button } from "@/app/_components/button";

export default function NotFound() {
  return (
    <Section className="pt-24 md:pt-32" innerClassName="flex flex-col items-center justify-center text-center py-32">
      <h1 className="text-6xl md:text-8xl font-bold text-lava">404</h1>
      <p className="text-body-lg text-slate mt-4 mb-8">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Button href="/" size="lg">
        Back to Home
      </Button>
    </Section>
  );
}
