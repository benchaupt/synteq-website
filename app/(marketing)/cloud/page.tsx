/* eslint-disable @next/next/no-img-element */
"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/app/_components/accordion";
import { AnimatedButton } from "@/app/_components/animated-button";
import { AnimatedCard } from "@/app/_components/animated-card";
import CallToActionNew from "@/app/_components/call-to-action-new";
import { StatsSection } from "@/app/_components/stats-section";
import TensorVisualization from "@/app/_components/tensor-visualization";
import { cn } from "@/lib/utils";
import { getModelLogo } from "@/lib/model-logos";
import { getFeaturedModels } from "@/lib/model-cache";
import { motion } from "motion/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";

interface FeaturedModel {
  id: number
  name: string
  author: string
  authorLogo?: string | null
  taskType: string | null
}

const stats = [
  { value: "255+", label: "Production models" },
  { value: "50ms", label: "Global latency" },
  { value: "99.99%", label: "Uptime SLA" },
  { value: "30+", label: "Global regions" },
];

const features = [
  {
    title: "One-Click Deployment",
    description: "Launch production models in seconds without complex configurations or infrastructure headaches.",
    icon: (
      <svg className="size-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 3L4 14H12L11 21L20 10H12L13 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: "Predictable Pricing",
    description: "No surprise bills. Simple per-token pricing with volume discounts and enterprise plans.",
    icon: (
      <svg className="size-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2V22M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: "Built-in Monitoring",
    description: "Real-time performance metrics, cost tracking, and usage analytics. Know exactly what's happening.",
    icon: (
      <svg className="size-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 19V12M15 19V6M3 19H21M3 6L9 12L13 8L21 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: "Enterprise Security",
    description: "SOC 2 Type II certified. End-to-end encryption, VPC deployments, and compliance guarantees.",
    icon: (
      <svg className="size-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: "Global Edge Network",
    description: "Deploy to 30+ regions worldwide. Sub-50ms latency with automatic failover and load balancing.",
    icon: (
      <svg className="size-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        <path d="M2 12H22M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: "Developer-First APIs",
    description: "OpenAI-compatible APIs, webhooks, streaming support, and SDKs for Python, Node.js, and more.",
    icon: (
      <svg className="size-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 18L22 12L16 6M8 6L2 12L8 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
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

function CloudContent() {
  const searchParams = useSearchParams();
  const modelsRef = useRef<HTMLDivElement>(null);
  const selectedModel = searchParams.get("model");
  const { cached } = getFeaturedModels();
  const [featuredModels, setFeaturedModels] = useState<FeaturedModel[]>((cached ?? []) as FeaturedModel[]);
  const [isLoadingModels, setIsLoadingModels] = useState(!cached);

  // Use prefetched models from cache
  useEffect(() => {
    if (cached) return;
    getFeaturedModels().promise.then((data) => {
      setFeaturedModels(data as FeaturedModel[]);
      setIsLoadingModels(false);
    });
  }, [cached]);

  useEffect(() => {
    if (selectedModel) {
      setTimeout(() => {
        modelsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [selectedModel]);

  return (
    <>
      {/* Hero Section */}
      <div>
        <div className="px-5 py-16 md:py-2 lg:min-h-[700px] max-w-viewport w-full mx-auto flex flex-col gap-12 justify-center">
          <div className="flex lg:flex-row flex-col gap-12 lg:gap-16 items-center lg:min-h-[300px]">
            <div className="flex flex-col gap-2 items-start justify-center flex-1 min-w-0">
              <p className="subheading">Inference Cloud</p>
              <div className="max-w-4xl">
                <h1 className="title max-w-2xl">
                  <span className="lg:block lg:whitespace-nowrap">The fastest path from</span>
                  <span className="lg:block lg:whitespace-nowrap">model to production.</span>
                </h1>
              </div>
              <p className="text-base md:text-base lg:text-base text-white/60 max-w-2xl pt-4">
               Realtime inference with industry leading time to first token, and elastic autoscaling that handles peak demand.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 pt-12">
                <AnimatedButton background="primary">
                  Start Building
                </AnimatedButton>
                {/*<AnimatedButton background="dark" className="hover:bg-background-secondary">
                  View Pricing
                </AnimatedButton>*/}
              </div>
            </div>
            <div className="flex flex-col gap-4 items-center justify-center w-full lg:w-auto lg:flex-1">
              <div className="w-full max-w-lg lg:max-w-2xl aspect-square">
                <TensorVisualization
                  size={3}
                  spacing={1.5}
                  cameraDistance={6}
                  labelSize={10}
                />
              </div>
            </div>
          </div>

          {/* Stats */}
          <StatsSection stats={stats} />
        </div>
      </div>

      {/* Supported Models */}
      <div ref={modelsRef} className="max-w-viewport w-full mx-auto px-5 py-16 md:py-24 mt-32">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-4 items-center text-center">
            <p className="subheading">Model Foundry</p>
            <h2 className="heading w-full md:max-w-5xl">
            Curated model foundations for training, fine-tuning, and deployment.
            </h2>
          </div>

          {/* Model Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
            {isLoadingModels ? (
              // Loading skeletons
              [...Array(8)].map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "bg-background-secondary/50 border border-white/5 rounded-xl p-4 md:p-5 animate-pulse",
                    index >= 4 ? "hidden md:block" : ""
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className="size-10 rounded-lg bg-white/10" />
                    <div className="flex flex-col gap-2 flex-1">
                      <div className="h-5 w-3/4 bg-white/10 rounded" />
                      <div className="h-4 w-1/2 bg-white/10 rounded" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="h-6 w-20 bg-white/10 rounded" />
                  </div>
                </div>
              ))
            ) : (
              featuredModels.slice(0, 12).map((model, index) => {
                const logo = model.authorLogo || getModelLogo(model.author)
                const taskLabel = model.taskType
                  ? model.taskType.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
                  : "AI Model"
                return (
                  <motion.div
                    key={model.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className={index >= 4 ? "hidden md:block" : ""}
                  >
                    <Link href={`/models?selected=${model.id}`}>
                      <AnimatedCard className="flex flex-col gap-3 p-4 md:p-5 h-full cursor-pointer">
                        <div className="flex items-start gap-3">
                          {logo && (
                            <div className="size-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 overflow-hidden">
                              <img src={logo} alt={model.author} className="size-6 object-contain" />
                            </div>
                          )}
                          <div className="flex flex-col gap-1 min-w-0">
                            <h3 className="text-base md:text-lg font-medium truncate">{model.name}</h3>
                            <p className="text-xs md:text-sm text-white/50">{model.author}</p>
                          </div>
                        </div>
                        <div className="mt-auto">
                          <span className="inline-flex items-center px-2 py-1 rounded-md bg-white/5 text-xs font-mono text-white/40">
                            {taskLabel}
                          </span>
                        </div>
                      </AnimatedCard>
                    </Link>
                  </motion.div>
                )
              })
            )}
          </div>

          <div className="flex items-center justify-center pt-4">
            <Link
              href="/models"
              className="group relative font-mono text-sm text-accent uppercase tracking-wider hover:text-white transition-colors flex items-center gap-2"
            >
              + thousands more
              <svg
                className="size-3 -rotate-45 group-hover:rotate-0 transition-transform duration-300"
                viewBox="0 0 16 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.000235885 7.36992C0.000235485 6.87117 0.404899 6.46651 0.904036 6.46612L10.3528 6.46613C11.1055 6.46613 11.4827 5.55582 10.9503 5.02341L7.48116 1.55432C7.12813 1.20129 7.12813 0.6291 7.48116 0.276071L7.49416 0.263067C7.84681 -0.0888145 8.41862 -0.0891969 8.77164 0.263832L14.8776 6.36974C15.4302 6.92243 15.4302 7.81819 14.8776 8.37088L8.77165 14.4768C8.41862 14.8298 7.84643 14.8298 7.4934 14.4768L7.4804 14.4638C7.12737 14.1107 7.12737 13.5386 7.48039 13.1855L10.9499 9.71606C11.4823 9.18364 11.1052 8.27334 10.3524 8.27334L0.904036 8.27372C0.405282 8.27372 0.000618115 7.86906 0.000618368 7.37031L0.000235885 7.36992Z"
                  fill="currentColor"
                />
              </svg>
              <span className="absolute left-0 -bottom-1 h-px w-full bg-current origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-viewport w-full mx-auto px-5 py-16 md:py-24">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-4 items-center text-left">
            {/* <p className="subheading">Platform Features</p> */}
            <h2 className="heading max-w-3xl">
              Everything you need to ship AI
            </h2>
        </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col gap-2"
              >
                <div className="flex items-center gap-1">
                  <div className="size-10 rounded-lg flex items-center justify-center text-accent shrink-0">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg md:text-xl">{feature.title}</h3>
                </div>
                <p className="text-sm md:text-base text-white/60 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
          ))}
          </div>
        </div>
        </div>

      {/* FAQ Section */}
      <div className="max-w-viewport w-full mx-auto px-5 py-16 md:py-24">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/*<p className="subheading">Support</p>*/}
            <h2 className="heading">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-white/60 leading-relaxed max-w-sm">
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

      {/* CTA */}
      <CallToActionNew />
    </>
  );
}

export default function Cloud() {
  return (
    <Suspense fallback={null}>
      <CloudContent />
    </Suspense>
  );
}
