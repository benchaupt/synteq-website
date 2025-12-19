import { SelectHardware } from "@/app/(marketing)/hardware/_components/select-hardware";
import { AnimatedButton } from "@/app/_components/animated-button";
import { CallToAction } from "@/app/_components/call-to-action";
import { Footer } from "@/app/_components/footer";
import { Navigation } from "@/app/_components/navigation";
import { Statistics } from "@/app/_components/statistics";

export default function Home() {
  return (
    <>
      <div className="flex flex-col bg-white text-black">
        <Navigation />
        <div className="px-5 pb-32 max-w-[1600px] w-full mx-auto flex flex-col gap-10">
          <div className="pt-32 flex flex-row gap-10">
            <div className="flex flex-col gap-12 items-start justify-center flex-1 min-w-0">
              <div className="max-w-5xl">
                <h1 className="text-8xl">
                  Infrastructure Ready Hardware for AI Workloads
                </h1>
              </div>
              <AnimatedButton>
                Talk To Sales
              </AnimatedButton>
            </div>
            <div className="flex flex-col gap-4 items-end justify-center w-[600px]">
              <img src="/assets/hardware/Frame 10.png" alt="Isolation Mode" className="size-[600px]" height={559} width={553} />
            </div>
          </div>
          <Statistics />
        </div>
      </div>
      <SelectHardware />
      <CallToAction />
      <Footer />
    </>
  );
}
