import { SelectHardware } from "@/app/(marketing)/hardware/_components/select-hardware";
import { AnimatedButton } from "@/app/_components/animated-button";
import { AnimatedCard } from "@/app/_components/animated-card";
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
      {/* product compare */}
      <div className="py-32 bg-white text-black">
        <div className="max-w-[1600px] w-full mx-auto px-5 flex flex-col gap-10">
          <div className="grid grid-cols-4 gap-16 p-12">
            <h2 className="text-6xl">Compare Products</h2>
            <AnimatedCard className="min-w-[300px]" disableScale disableTextColor isOnLight>
              <div className="flex flex-col gap-10 items-center justify-center">
                <img src="/assets/hardware/Group 20.png" className="object-contain" />
                <h3 className="text-xl transition-all duration-400">Nvidia H100</h3>
              </div>
            </AnimatedCard>
            <AnimatedCard className="min-w-[300px]" disableScale disableTextColor isOnLight>
              <div className="flex flex-col gap-10 items-center justify-center">
                <img src="/assets/hardware/Group 20.png" className="object-contain" />
                <h3 className="text-xl transition-all duration-400">Nvidia H100</h3>
              </div>
            </AnimatedCard>
            <AnimatedCard className="min-w-[300px]" disableScale disableTextColor isOnLight>
              <div className="flex flex-col gap-10 items-center justify-center">
                <img src="/assets/hardware/Group 20.png" className="object-contain" />
                <h3 className="text-xl transition-all duration-400">Nvidia H100</h3>
              </div>
            </AnimatedCard>
          </div>
          <div className="grid grid-cols-4 gap-16 bg-accent p-12">
            <div className="flex flex-col gap-4 items-start">
              <h2 className="text-3xl">Equipment</h2>
              <AnimatedButton size={"wide"}>Talk To Sales</AnimatedButton>
            </div>
            <div className="flex flex-col gap-4 items-start">
              <h2 className="text-3xl">Nvidia H100</h2>
              <p className="text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="flex flex-col gap-4 items-start">
              <h2 className="text-3xl">Nvidia H100</h2>
              <p className="text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="flex flex-col gap-4 items-start">
              <h2 className="text-3xl">Nvidia H100</h2>
              <p className="text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-16 p-6">
            <div className="flex flex-col gap-4 items-start text-light-foreground">
              <h2 className="text-2xl">GPU</h2>
            </div>
            <div className="flex flex-col gap-4 items-start">
              <p className="text-2xl">H200</p>
            </div>
            <div className="flex flex-col gap-4 items-start">
              <p className="text-2xl">H200</p>
            </div>
            <div className="flex flex-col gap-4 items-start">
              <p className="text-2xl">H200</p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-16 p-6">
            <div className="flex flex-col gap-4 items-start text-light-foreground">
              <h2 className="text-2xl">GPUs/Server</h2>
            </div>
            <div className="flex flex-col gap-4 items-start">
              <p className="text-2xl">8</p>
            </div>
            <div className="flex flex-col gap-4 items-start">
              <p className="text-2xl">8</p>
            </div>
            <div className="flex flex-col gap-4 items-start">
              <p className="text-2xl">8</p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-16 p-6">
            <div className="flex flex-col gap-4 items-start text-light-foreground">
              <h2 className="text-2xl">vCPUs</h2>
            </div>
            <div className="flex flex-col gap-4 items-start">
              <p className="text-2xl">2x Intex Xeo Platinum 6960P</p>
            </div>
            <div className="flex flex-col gap-4 items-start">
              <p className="text-2xl">2x Intex Xeo Platinum 6960P</p>
            </div>
            <div className="flex flex-col gap-4 items-start">
              <p className="text-2xl">2x Intex Xeo Platinum 6960P</p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-16 p-6">
            <div className="flex flex-col gap-4 items-start text-light-foreground">
              <h2 className="text-2xl">vRAM</h2>
            </div>
            <div className="flex flex-col gap-4 items-start">
              <p className="text-2xl">80GB HBM3</p>
            </div>
            <div className="flex flex-col gap-4 items-start">
              <p className="text-2xl">80GB HBM3</p>
            </div>
            <div className="flex flex-col gap-4 items-start">
              <p className="text-2xl">80GB HBM3</p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-16 p-6">
            <div className="flex flex-col gap-4 items-start text-light-foreground">
              <h2 className="text-2xl">RAM</h2>
            </div>
            <div className="flex flex-col gap-4 items-start">
              <p className="text-2xl">192GB</p>
            </div>
            <div className="flex flex-col gap-4 items-start">
              <p className="text-2xl">192GB</p>
            </div>
            <div className="flex flex-col gap-4 items-start">
              <p className="text-2xl">192GB</p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-16 p-6">
            <div className="flex flex-col gap-4 items-start text-light-foreground">
              <h2 className="text-2xl">Storage</h2>
            </div>
            <div className="flex flex-col gap-4 items-start">
              <p className="text-2xl">3072GB</p>
            </div>
            <div className="flex flex-col gap-4 items-start">
              <p className="text-2xl">3072GB</p>
            </div>
            <div className="flex flex-col gap-4 items-start">
              <p className="text-2xl">3072GB</p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-16 p-6">
            <div className="flex flex-col gap-4 items-start text-light-foreground">
              <h2 className="text-2xl">Bandwidth</h2>
            </div>
            <div className="flex flex-col gap-4 items-start">
              <p className="text-2xl">30.72TB</p>
            </div>
            <div className="flex flex-col gap-4 items-start">
              <p className="text-2xl">30.72TB</p>
            </div>
            <div className="flex flex-col gap-4 items-start">
              <p className="text-2xl">30.72TB</p>
            </div>
          </div>

        </div>

      </div>
      <CallToAction />
      <Footer />
    </>
  );
}
