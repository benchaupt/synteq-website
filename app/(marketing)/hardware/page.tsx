"use client";

import { SelectHardware } from "@/app/(marketing)/hardware/_components/select-hardware";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/app/_components/accordion";
import { AnimatedButton } from "@/app/_components/animated-button";
import { AnimatedCard } from "@/app/_components/animated-card";
import CallToActionNew from "@/app/_components/call-to-action-new";
import { motion, useInView } from "motion/react";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";

// Animated counter component
function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
    const duration = 2000;
    const steps = 60;
    const increment = numericValue / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {value.includes('%') ? `~${Math.round(count)}%` : 
       value.includes('x') ? `${count.toFixed(1)}x+` : 
       `${count.toFixed(2)}%`}
    </span>
  );
}

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

export default function Hardware() {
  return (
    <>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-background">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        
        <div className="relative px-5 py-16 md:py-24 max-w-viewport w-full mx-auto flex flex-col gap-12">
          <div className="flex lg:flex-row flex-col gap-12 lg:gap-16 items-center">
            <div className="flex flex-col gap-8 items-start justify-center flex-1 min-w-0">
              <p className="font-mono text-xs text-accent uppercase tracking-wider">Infrastructure</p>
              <div className="max-w-4xl">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-2xl text-foreground leading-tight tracking-tight font-sequel-book">
                  Powerful hardware ready for AI workloads
                </h1>
              </div>
              <p className="text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed">
                Launch, run, and scale AI models in minutes, without the cloud confusion, GPU expertise, or unpredictable costs. As easy as a single click.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
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
            <div className="flex flex-col gap-4 items-center justify-center w-full lg:w-auto">
              <img src="/assets/landing/Mask group1.png" alt="AI Infrastructure" className="w-full max-w-md lg:max-w-lg xl:max-w-xl" />
            </div>
          </div>

          {/* Animated Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pt-8 border-t border-white/5">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col gap-2"
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-sequel-book text-accent">
                <AnimatedCounter value="~40%" />
              </div>
              <p className="font-mono text-xs text-white/40 uppercase tracking-wider">Lower inference costs</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col gap-2"
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-sequel-book text-accent">
                <AnimatedCounter value="2x" />
              </div>
              <p className="font-mono text-xs text-white/40 uppercase tracking-wider">More predictable performance</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col gap-2"
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-sequel-book text-accent">
                <AnimatedCounter value="99.99%" />
              </div>
              <p className="font-mono text-xs text-white/40 uppercase tracking-wider">Uptime SLA availability</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Section Divider */}
      <div className="max-w-viewport w-full mx-auto px-5 py-12 md:py-16 md:pb-8">
        <div className="flex flex-col items-center justify-center text-center gap-4">
          <p className="font-mono text-xs text-accent uppercase tracking-wider">Enterprise-grade infrastructure</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl max-w-3xl tracking-tight leading-tight font-sequel-book">
            Designed to do less, and perform better.
          </h2>
        </div>
      </div>
      <SelectHardware className="py-0" />

      {/* Product Comparison */}
      <div className="max-w-viewport w-full mx-auto px-5 py-16 md:py-24">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex flex-col gap-3">
              <p className="font-mono text-xs text-accent uppercase tracking-wider">Hardware Specs</p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight font-sequel-book">
                Compare Products
              </h2>
            </div>
            <Link href="/contact">
              <AnimatedButton background="dark" className="hover:bg-background-secondary">
                Talk To Sales
              </AnimatedButton>
            </Link>
          </div>

          {/* Product Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <AnimatedCard className="flex flex-col gap-6 p-8">
              <div className="flex flex-col gap-4 items-center">
                <div className="size-24 flex items-center justify-center">
                  <img src="/assets/hardware/Group 20.png" className="object-contain" alt="Nvidia H100" />
                </div>
                <h3 className="text-xl font-medium">Nvidia H100</h3>
                <p className="text-sm text-white/50 text-center">High-performance GPU cluster for large-scale AI training and inference</p>
              </div>
            </AnimatedCard>

            <AnimatedCard className="flex flex-col gap-6 p-8">
              <div className="flex flex-col gap-4 items-center">
                <div className="size-24 flex items-center justify-center">
                  <img src="/assets/hardware/Group 20.png" className="object-contain" alt="Nvidia H200" />
                </div>
                <h3 className="text-xl font-medium">Nvidia H200</h3>
                <p className="text-sm text-white/50 text-center">Next-gen architecture with enhanced memory for complex workloads</p>
              </div>
            </AnimatedCard>

            <AnimatedCard className="flex flex-col gap-6 p-8">
              <div className="flex flex-col gap-4 items-center">
                <div className="size-24 flex items-center justify-center">
                  <img src="/assets/hardware/Group 20.png" className="object-contain" alt="Nvidia A100" />
                </div>
                <h3 className="text-xl font-medium">Nvidia A100</h3>
                <p className="text-sm text-white/50 text-center">Versatile compute platform for training and deployment at scale</p>
              </div>
            </AnimatedCard>
          </div>

          {/* Specifications Table */}
          <div className="border border-white/5 rounded-xl overflow-hidden">
            <div className="bg-background-secondary p-6 border-b border-white/5">
              <h3 className="font-mono text-xs text-accent uppercase tracking-wider">Technical Specifications</h3>
            </div>
            
            {/* Spec Rows */}
            <div className="divide-y divide-white/5">
              <div className="grid grid-cols-4 gap-4 p-6 hover:bg-white/2 transition-colors">
                <div className="font-mono text-xs text-white/40 uppercase tracking-wider">GPU</div>
                <div className="text-sm">H100</div>
                <div className="text-sm">H200</div>
                <div className="text-sm">A100</div>
              </div>

              <div className="grid grid-cols-4 gap-4 p-6 hover:bg-white/2 transition-colors">
                <div className="font-mono text-xs text-white/40 uppercase tracking-wider">GPUs/Server</div>
                <div className="text-sm">8</div>
                <div className="text-sm">8</div>
                <div className="text-sm">8</div>
              </div>

              <div className="grid grid-cols-4 gap-4 p-6 hover:bg-white/2 transition-colors">
                <div className="font-mono text-xs text-white/40 uppercase tracking-wider">vCPUs</div>
                <div className="text-sm">2x Intel Xeon Platinum 6960P</div>
                <div className="text-sm">2x Intel Xeon Platinum 6960P</div>
                <div className="text-sm">2x Intel Xeon Platinum 6960P</div>
              </div>

              <div className="grid grid-cols-4 gap-4 p-6 hover:bg-white/2 transition-colors">
                <div className="font-mono text-xs text-white/40 uppercase tracking-wider">vRAM</div>
                <div className="text-sm">80GB HBM3</div>
                <div className="text-sm">141GB HBM3</div>
                <div className="text-sm">80GB HBM2e</div>
              </div>

              <div className="grid grid-cols-4 gap-4 p-6 hover:bg-white/2 transition-colors">
                <div className="font-mono text-xs text-white/40 uppercase tracking-wider">RAM</div>
                <div className="text-sm">2TB</div>
                <div className="text-sm">2TB</div>
                <div className="text-sm">2TB</div>
              </div>

              <div className="grid grid-cols-4 gap-4 p-6 hover:bg-white/2 transition-colors">
                <div className="font-mono text-xs text-white/40 uppercase tracking-wider">Storage</div>
                <div className="text-sm">3.84TB NVMe</div>
                <div className="text-sm">3.84TB NVMe</div>
                <div className="text-sm">3.84TB NVMe</div>
              </div>

              <div className="grid grid-cols-4 gap-4 p-6 hover:bg-white/2 transition-colors">
                <div className="font-mono text-xs text-white/40 uppercase tracking-wider">Bandwidth</div>
                <div className="text-sm">900GB/s</div>
                <div className="text-sm">900GB/s</div>
                <div className="text-sm">600GB/s</div>
              </div>

              <div className="grid grid-cols-4 gap-4 p-6 hover:bg-white/2 transition-colors">
                <div className="font-mono text-xs text-white/40 uppercase tracking-wider">Network</div>
                <div className="text-sm">8x 200Gbps InfiniBand</div>
                <div className="text-sm">8x 200Gbps InfiniBand</div>
                <div className="text-sm">8x 200Gbps InfiniBand</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-viewport w-full mx-auto px-5 py-16 md:py-24">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          <div className="lg:col-span-2 flex flex-col gap-4">
            <p className="font-mono text-xs text-accent uppercase tracking-wider">Support</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight font-sequel-book">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-white/60 leading-relaxed">
              Can&apos;t find what you&apos;re looking for? Reach out to our support team. We&apos;re here to help.
            </p>
            <div className="pt-4">
              <Link href="/contact">
                <AnimatedButton background="dark" className="hover:bg-background-secondary">
                  Contact Support
                </AnimatedButton>
              </Link>
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue="item-0"
            >
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-white/5">
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
    </>
  );
}
