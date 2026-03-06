import { Section } from "@/app/_components/section";

export function CrunchbitsBanner() {
  return (
    <Section background="slate-light-2" innerClassName="py-20 md:py-28">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-16">
        <p className="text-body text-lava max-w-2xl">
          Acquired by Synteq Digital in May 2025, Crunchbits now serves as the
          company&apos;s dedicated high performance computing (HPC) division.
        </p>
      </div>
    </Section>
  );
}
