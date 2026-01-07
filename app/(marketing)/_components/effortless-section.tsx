"use client";

import { AnimatedButton } from "@/app/_components/animated-button";
import AsciiArt from "@/app/_components/ascii-art";
import { motion } from "motion/react";
import Link from "next/link";

const coreValues = [
    { number: "01", value: "Sub-50ms inference latency" },
    { number: "02", value: "255+ production models" },
    { number: "03", value: "99.99% uptime SLA" },
    { number: "04", value: "H100 & A100 GPU clusters" },
    { number: "05", value: "Research-grade infrastructure" }
];

export default function EffortlessSection() {
    return (
        <section className="max-w-viewport w-full mx-auto px-5 pt-20 pb-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* ASCII Art on Left */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative aspect-square rounded-lg overflow-hidden bg-background-secondary border border-white/5 flex items-center justify-center p-4"
                >
                    <AsciiArt type="gpu" className="w-full h-full flex items-center justify-center" />
                </motion.div>

                {/* Values List on Right */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col gap-10"
                >
                    <div className="flex flex-col gap-6">
                        <p className="font-mono text-accent text-xs uppercase tracking-widest">
                            AI INFERENCE & RESEARCH PLATFORM
                        </p>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl max-w-xl font-sequel-book leading-tight text-white">
                            Ship AI products in days, not months
                        </h1>
                        <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-xl">
                            Purpose-built infrastructure for AI inference and research. Deploy models to production with enterprise-grade GPUs, transparent pricing, and the performance your users expect.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        {coreValues.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="flex gap-2 items-start"
                            >
                                <span className="font-mono text-accent text-sm shrink-0 mt-1">
                                    {item.number}
                                </span>
                                <p className="text-2xl text-white/70">
                                    {item.value}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Link href="/cloud">
                            <AnimatedButton background="primary" className="hover:bg-accent/50 w-full sm:w-auto">
                                Start Building
                            </AnimatedButton>
                        </Link>
                        <Link href="/about">
                            <AnimatedButton background="dark" className="hover:bg-background-secondary w-full sm:w-auto">
                                Learn More
                            </AnimatedButton>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

