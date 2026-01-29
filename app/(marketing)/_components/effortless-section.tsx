"use client";

import { AnimatedButton } from "@/app/_components/animated-button";
import AsciiArt from "@/app/_components/ascii-art";
import { motion } from "motion/react";
import Link from "next/link";

const coreValues = [
    { number: "01", value: "Sub-50ms inference latency" },
    { number: "02", value: "Blackwell & H200 availity" },
    { number: "03", value: "99.99% uptime SLA" },
    { number: "05", value: "Research-grade infrastructure" },
    { number: "06", value: "Transparent pricing" }
];

export default function EffortlessSection() {
    return (
        <section className="max-w-viewport w-full mx-auto px-5 pt-20 pb-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* ASCII Art on Left */}
                                {/* Values List on Right */}
                                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col gap-10"
                >
                    <div className="flex flex-col gap-2">
                        <p className="subheading">
                            AI INFERENCE & RESEARCH PLATFORM
                        </p>
                        <h1 className="title">
                            <span className="lg:block lg:whitespace-nowrap">AI at the speed</span>
                            <span className="lg:block lg:whitespace-nowrap"> of ambition</span>
                        </h1>
                        <p className="text-base md:text-base lg:text-base text-white/70 leading-relaxed max-w-xl pt-4">
                        Built for inference, training, and general compute. Engineered for speed, control, and predictable performance.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 pt-8">
                        {coreValues.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="flex gap-2 items-start"
                            >
                                <span className="font-mono text-accent text-xs shrink-0 mt-1">
                                    {item.number}
                                </span>
                                <p className="font-mono text-sm md:text-sm lg:text-sm text-white/70">
                                    {item.value}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-6 pt-4">
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
                {/* ASCII Art on Right */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative rounded-lg overflow-hidden flex items-center justify-center"
                >
                    <AsciiArt type="gpu" className="flex items-center justify-center" />
                </motion.div>
            </div>
        </section>
    );
}

