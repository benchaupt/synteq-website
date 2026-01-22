"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/app/_components/accordion";
import { AnimatedButton } from "@/app/_components/animated-button";
import { AnimatedCard } from "@/app/_components/animated-card";
import CallToActionNew from "@/app/_components/call-to-action-new";
import { StatsSection } from "@/app/_components/stats-section";
import TensorVisualization from "@/app/_components/tensor-visualization";
import { motion } from "motion/react";
import Link from "next/link";

const stats = [
  { value: "255+", label: "Production models" },
  { value: "50ms", label: "Global latency" },
  { value: "99.99%", label: "Uptime SLA" },
  { value: "30+", label: "Global regions" },
];

const models = [
  { name: "GPT-4o", provider: "OpenAI", category: "Multimodal" },
  { name: "Claude 3.5 Sonnet", provider: "Anthropic", category: "Reasoning" },
  { name: "Llama 3.1 405B", provider: "Meta", category: "Open Source" },
  { name: "Gemini 1.5 Pro", provider: "Google", category: "Multimodal" },
  { name: "DeepSeek R1", provider: "DeepSeek", category: "Reasoning" },
  { name: "Qwen 2.5", provider: "Alibaba", category: "Multilingual" },
  { name: "Mistral Large", provider: "Mistral AI", category: "Enterprise" },
  { name: "Command R+", provider: "Cohere", category: "RAG-Optimized" },
  { name: "Claude 3 Opus", provider: "Anthropic", category: "Advanced" },
  { name: "Mixtral 8x22B", provider: "Mistral AI", category: "Open Source" },
  { name: "Grok-2", provider: "xAI", category: "Reasoning" },
  { name: "Phi-3", provider: "Microsoft", category: "Efficient" },
];

const features = [
  {
    title: "One-Click Deployment",
    description: "Launch production-ready AI models in seconds. No complex configurations, no infrastructure headaches.",
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

export default function Cloud() {
  return (
    <>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-background">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        
        <div className="relative px-5 py-12 md:py-16 max-w-viewport w-full mx-auto flex flex-col gap-12">
          <div className="flex lg:flex-row flex-col gap-12 lg:gap-16 items-center">
            <div className="flex flex-col gap-2 items-start justify-center flex-1 min-w-0">
              <p className="subheading">AI Cloud Platform</p>
              <div className="max-w-4xl">
                <h1 className="title max-w-2xl">
                  Production AI without the complexity
              </h1>
              </div>
              <p className="text-base md:text-base lg:text-base text-white/60 max-w-lg pt-4">
                Deploy, scale, and manage AI models in minutes. No DevOps required. No surprise bills. Just production-ready infrastructure that works.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 pt-12">
                <AnimatedButton background="primary">
                  Start Free
                </AnimatedButton>
                <AnimatedButton background="dark" className="hover:bg-background-secondary">
                  View Pricing
                </AnimatedButton>
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
      <div className="max-w-viewport w-full mx-auto px-5 py-16 md:py-24">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-4 items-center text-center">
            <p className="subheading">Model Library</p>
            <h2 className="heading max-w-3xl">
              Deploy any model, instantly
            </h2>
            <p className="text-base text-white/60 max-w-2xl">
              From GPT-4 to open-source giants. One API, 255+ models, zero infrastructure hassle.
            </p>
          </div>

          {/* Model Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
            {models.map((model, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={index >= 4 ? "hidden md:block" : ""}
              >
                <AnimatedCard className="flex flex-col gap-3 p-4 md:p-5 h-full hover:border-accent/30 cursor-pointer">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-base md:text-lg font-medium">{model.name}</h3>
                    <p className="text-xs md:text-sm text-white/50">{model.provider}</p>
                  </div>
                  <div className="mt-auto">
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-accent/10 border border-accent/20 text-xs font-mono text-accent">
                      {model.category}
                    </span>
                  </div>
                </AnimatedCard>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center justify-center pt-4">
            <p className="font-mono text-sm text-accent uppercase tracking-wider">
              + thousands more
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-viewport w-full mx-auto px-5 py-16 md:py-24">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-4 items-center text-center">
            <p className="subheading">Platform Features</p>
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
            <p className="subheading">Support</p>
            <h2 className="heading">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-white/60 leading-relaxed max-w-sm">
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

      {/* CTA */}
      <CallToActionNew />
    </>
  );
}
