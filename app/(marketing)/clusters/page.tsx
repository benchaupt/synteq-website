"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SelectHardware } from "@/app/(marketing)/clusters/_components/select-hardware";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/app/_components/accordion";
import { AnimatedButton } from "@/app/_components/animated-button";
import { AnimatedCard } from "@/app/_components/animated-card";
import { ComparisonModal } from "@/app/_components/comparison-modal";
import CallToActionNew from "@/app/_components/call-to-action-new";
import { StatsSection } from "@/app/_components/stats-section";
import { CloudDynamic } from "@/app/(marketing)/animations/cloud-dynamic";
import { hardware } from "@/lib/hardware-data";
import Link from "next/link";
import { Suspense } from "react";

const stats = [
  { value: "~40%", label: "Lower inference costs" },
  { value: "2x", label: "More predictable performance" },
  { value: "99.99%", label: "Uptime SLA availability" },
  { value: "24/7", label: "Expert support" },
];

const faqs = [
  {
    question: "How does Synteq AI differ from other cloud providers?",
    answer: "We're built specifically for AI workloads. Unlike generic cloud providers, every feature is optimized for model training and inference, from our GPU-optimized infrastructure to our per-token pricing model. No cloud expertise required."
  },
  {
    question: "What models can I deploy?",
    answer: "We support 255+ production-ready models including GPT-4, Claude, Llama, Mistral, and more. You can also bring your own models + we support any HuggingFace model, custom architectures, and fine-tuned variants."
  },
  {
    question: "How is pricing calculated?",
    answer: "Simple per-token pricing with no hidden fees. Input tokens are charged at $X per million, output tokens at $Y per million. Volume discounts apply automatically. Enterprise plans include reserved capacity and custom pricing."
  },
  {
    question: "What about data privacy and security?",
    answer: "Your data never trains our models. We're SOC 2 Type II certified, GDPR compliant, and offer private VPC deployments. All data is encrypted in transit and at rest. We support SSO, audit logs, and custom data retention policies."
  },
  {
    question: "Can I scale from prototype to production?",
    answer: "Absolutely. Start with our free tier, scale to millions of requests per day without any infrastructure changes. Auto-scaling is built-in, and we handle everything from load balancing to failover automatically."
  },
  {
    question: "Do you offer support and SLAs?",
    answer: "Free tier includes community support. Paid plans include email support with 24-hour response times. Enterprise plans get dedicated Slack channels, phone support, and 99.99% uptime SLAs with financial credits."
  },
];

function HardwareInner() {
  const searchParams = useSearchParams();
  const compareRef = useRef<HTMLDivElement>(null);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [selectedHardwareId, setSelectedHardwareId] = useState<string | null>(null);
  // IDs of hardware being compared (2-3 items)
  const [comparedIds, setComparedIds] = useState<string[]>(() => {
    // Initialize from URL param if present
    const compareParam = searchParams.get("compare");
    if (compareParam) {
      const ids = compareParam.split(",").filter((id) => hardware.some((h) => h.id === id));
      if (ids.length >= 2 && ids.length <= 3) {
        return ids;
      }
    }
    return ["1", "2", "3"];
  });

  // Scroll to compare section if URL has compare param
  useEffect(() => {
    if (searchParams.get("compare") && compareRef.current) {
      setTimeout(() => {
        compareRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [searchParams]);

  const openModalWithHardware = (hardwareId: string) => {
    setSelectedHardwareId(hardwareId);
    setIsCompareModalOpen(true);
  };

  const handleCompare = useCallback((selectedIds: string[]) => {
    // Find newly selected products (not in current comparison) and put them at index 0
    const newIds = selectedIds.filter((id) => !comparedIds.includes(id));
    const existingIds = selectedIds.filter((id) => comparedIds.includes(id));
    const reorderedIds = [...newIds, ...existingIds];

    setComparedIds(reorderedIds);
    // Update URL without navigation
    const url = new URL(window.location.href);
    url.searchParams.set("compare", reorderedIds.join(","));
    window.history.replaceState({}, "", url.toString());
    // Scroll to compare section
    setTimeout(() => {
      compareRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }, [comparedIds]);

  // Get the hardware items being compared
  const comparedHardware = useMemo(
    () => comparedIds.map((id) => hardware.find((h) => h.id === id)).filter(Boolean),
    [comparedIds]
  );

  return (
    <>
      {/* Hero Section */}
      <div>
        <div className="px-5 py-16 md:py-24 lg:min-h-[700px] max-w-viewport w-full mx-auto flex flex-col gap-12 lg:justify-center">
          <div className="flex lg:flex-row flex-col gap-12 lg:gap-16 items-center">
            <div className="flex flex-col gap-2 items-start flex-1 min-w-0">
              <p className="subheading">Hardware</p>
              <div className="max-w-4xl">
                <h1 className="title max-w-2xl">
                The power to build what others can&apos;t.
              </h1>
            </div>
              <p className="text-sm md:text-base text-white/60 max-w-2xl leading-relaxed pt-4">
              Dedicated multi-node clusters with high-bandwidth interconnect. Built for pre-training, fine-tuning, and workloads that demand sustained throughput
              </p>
              <div className="flex flex-col sm:flex-row gap-6 pt-12">
                <AnimatedButton background="primary">
                  Launch
                </AnimatedButton>
                <Link href="/contact">
                  <AnimatedButton background="dark" className="hover:bg-background-secondary">
                    Contact Sales
            </AnimatedButton>
                </Link>
          </div>
            </div>
            <div className="flex flex-col gap-4 items-center justify-end w-full lg:w-auto">
              <CloudDynamic className="w-full max-w-lg lg:max-w-xl xl:max-w-2xl" />
            </div>
          </div>

          <StatsSection stats={stats} />
        </div>
          </div>

      {/* Section Divider */}
        <div className="max-w-viewport w-full mx-auto px-5 pt-12 md:pt-16 pb-4">
          <div className="flex flex-col items-center justify-center text-center gap-4">
            <p className="subheading">Enterprise-grade infrastructure</p>
            <h2 className="heading">
             Curated platforms for every workload
            </h2>
          </div>
        </div>
        <SelectHardware className="py-0 md:py-0" onCompare={handleCompare} />

      {/* Product Comparison */}
      <div id="compare" ref={compareRef} className="max-w-viewport w-full mx-auto px-5 py-16 md:py-24">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-6">
            <div className="flex flex-col gap-3">
              <p className="subheading text-center md:text-left">Hardware Specs</p>
              <h2 className="heading">
                Compare Products
              </h2>
          </div>
            <AnimatedButton background="dark" className="hover:bg-background-secondary" onClick={() => setIsCompareModalOpen(true)}>
              Compare
            </AnimatedButton>
          </div>

          {/* Product Cards */}
          <div className={`grid grid-cols-1 ${comparedHardware.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-6 md:gap-8`}>
            {comparedHardware.map((item) => (
              <button key={item!.id} onClick={() => openModalWithHardware(item!.id)} className="w-full">
                <AnimatedCard className="h-full group" inverseHover disableScale disableTextColor>
                  <div className="flex flex-col gap-4 items-center">
                    <div className="size-24 flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item!.image} className="object-contain" alt={item!.name} />
                    </div>
                    <h3 className="font-mono text-sm md:text-base text-accent group-hover:text-white text-center transition-all duration-300">{item!.name}</h3>
                  </div>
                </AnimatedCard>
              </button>
            ))}
          </div>

          {/* Specifications Table */}
          <div className="overflow-x-auto bg-background">
            <div className="bg-background-secondary p-4 md:p-6 border-b border-white/5">
              <h3 className="subheading">Technical Specifications</h3>
            </div>

            {/* Spec Rows - dynamically generated from hardware specs */}
            <div className="divide-y divide-white/5 min-w-0">
              {/* Header row with product names */}
              <div className={`grid ${comparedHardware.length === 2 ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-2 sm:grid-cols-4'} gap-3 md:gap-4 p-4 md:p-6 transition-colors bg-background-secondary/50`}>
                <div className="font-mono text-xs text-white/40 uppercase tracking-wider hidden sm:block">Spec</div>
                {comparedHardware.map((item) => (
                  <div key={item!.id} className="font-mono text-xs sm:text-sm text-accent truncate">{item!.name}</div>
                ))}
              </div>

              {/* Get unique spec labels across all compared hardware */}
              {(() => {
                const allLabels = new Set<string>();
                comparedHardware.forEach((item) => {
                  item!.specs.forEach((spec) => allLabels.add(spec.label));
                });
                return Array.from(allLabels).map((label) => (
                  <div key={label} className={`grid ${comparedHardware.length === 2 ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-2 sm:grid-cols-4'} gap-3 md:gap-4 p-4 md:p-6 transition-colors hover:bg-white/[0.02]`}>
                    <div className="font-mono text-xs text-white/40 uppercase tracking-wider col-span-full sm:col-span-1">{label}</div>
                    {comparedHardware.map((item) => {
                      const spec = item!.specs.find((s) => s.label === label);
                      return (
                        <div key={item!.id} className="text-sm">
                          {spec ? (
                            <span className={spec.accentValue ? 'text-accent' : ''}>
                              {spec.value}
                              {spec.unit && <span className="text-accent ml-1">{spec.unit}</span>}
                            </span>
                          ) : (
                            <span className="text-white/30">—</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ));
              })()}
            </div>
          </div>
        </div>
          </div>

      <div className="max-w-viewport w-full mx-auto px-5 py-16 md:py-24">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/*<p className="subheading">Support</p>*/}
            <h2 className="heading">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-white/60 leading-relaxed">
              Can&apos;t find what you&apos;re looking for? Reach out to our support team. We&apos;re here to help.
            </p>
          </div>
          
          <div className="lg:col-span-3">
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue="item-0"
            >
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-base md:text-lg hover:text-accent transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm md:text-base text-white/60 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>

      <CallToActionNew />

      {/* Comparison Modal */}
      <ComparisonModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        initialSelected={selectedHardwareId ? comparedIds.filter((id) => id !== selectedHardwareId) : comparedIds}
        onCompare={handleCompare}
      />
    </>
  );
}

export default function Hardware() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <HardwareInner />
    </Suspense>
  );
}
