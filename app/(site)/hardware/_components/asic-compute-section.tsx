import { Button } from "@/app/_components/button";

export function AsicComputeSection() {
  return (
    <div className="grid items-start gap-8 md:grid-cols-2">
      <h2 className="heading">ASIC Compute</h2>
      <div className="flex flex-col gap-4">
        <p className="text-body">
          For ASIC specific hardware, check out our pricing page for real time
          hardware pricing
        </p>
        <div>
          <Button href="/hardware/pricing" size="md">
            Live Pricing
          </Button>
        </div>
      </div>
    </div>
  );
}
