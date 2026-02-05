/* eslint-disable @next/next/no-img-element */
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
                        {/* <p className="text-base md:text-base lg:text-base text-white/70 leading-relaxed max-w-xl pt-4">
                        Built for inference, training, and general compute. Engineered for speed, control, and predictable performance.
                        </p> */}
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
                    className="relative rounded-lg flex flex-col w-full h-full"
                >
                    <div className="flex-1 flex items-center justify-center">
                        <AsciiArt type="gpu" className="flex items-center justify-center" />
                    </div>

                    {/* Request an AI summary - aligned with CTA buttons */}
                    <div className="flex flex-col lg:flex-row items-center gap-4 justify-center lg:justify-end pt-4 w-full">
                        <span className="text-sm font-mono uppercase text-white/60">Ask AI about us</span>
                        <div className="flex items-center gap-2">
                            <a
                                href="https://grok.com/?q=As%20a%20potential%20client%2C%20I%20want%20to%20concretely%20understand%20what%20I%20will%20receive%20with%20Synteq%20AI%20(synteq.ai).%20Detail%20step%20by%20step%20what%20the%20service%20includes%3A%20what%20I%20receive%2C%20how%20it%20affects%20our%20AI%20infrastructure%2C%20the%20inference%20speeds%2C%20GPU%20availability%20(H200%2C%20Blackwell)%2C%20uptime%20guarantees%2C%20pricing%2C%20and%20cloud%20platform%20features.%20Explain%20it%20simply%2C%20as%20if%20you%20were%20describing%20the%20real%20experience%20of%20the%20service."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="size-10 rounded-full bg-background-secondary flex items-center justify-center hover:bg-white/10 transition-colors"
                            >
                                <img src="/assets/logos/grok.svg" alt="Grok" className="size-5 brightness-0 invert" />
                            </a>
                            <a
                                href="https://chatgpt.com/?q=As%20a%20potential%20client%2C%20I%20want%20to%20concretely%20understand%20what%20I%20will%20receive%20with%20Synteq%20AI%20(synteq.ai).%20Detail%20step%20by%20step%20what%20the%20service%20includes%3A%20what%20I%20receive%2C%20how%20it%20affects%20our%20AI%20infrastructure%2C%20the%20inference%20speeds%2C%20GPU%20availability%20(H200%2C%20Blackwell)%2C%20uptime%20guarantees%2C%20pricing%2C%20and%20cloud%20platform%20features.%20Explain%20it%20simply%2C%20as%20if%20you%20were%20describing%20the%20real%20experience%20of%20the%20service."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="size-10 rounded-full bg-background-secondary flex items-center justify-center hover:bg-white/10 transition-colors"
                            >
                                <img src="/assets/logos/chatgpt.svg" alt="ChatGPT" className="size-5 brightness-0 invert" />
                            </a>
                            <a
                                href="https://claude.ai/new?q=As%20a%20potential%20client%2C%20I%20want%20to%20concretely%20understand%20what%20I%20will%20receive%20with%20Synteq%20AI%20(synteq.ai).%20Detail%20step%20by%20step%20what%20the%20service%20includes%3A%20what%20I%20receive%2C%20how%20it%20affects%20our%20AI%20infrastructure%2C%20the%20inference%20speeds%2C%20GPU%20availability%20(H200%2C%20Blackwell)%2C%20uptime%20guarantees%2C%20pricing%2C%20and%20cloud%20platform%20features.%20Explain%20it%20simply%2C%20as%20if%20you%20were%20describing%20the%20real%20experience%20of%20the%20service."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="size-10 rounded-full bg-background-secondary flex items-center justify-center hover:bg-white/10 transition-colors"
                            >
                                <img src="/assets/logos/claude.svg" alt="Claude" className="size-5 brightness-0 invert" />
                            </a>
                            <a
                                href="https://perplexity.ai/search?q=As%20a%20potential%20client%2C%20I%20want%20to%20concretely%20understand%20what%20I%20will%20receive%20with%20Synteq%20AI%20(synteq.ai).%20Detail%20step%20by%20step%20what%20the%20service%20includes%3A%20what%20I%20receive%2C%20how%20it%20affects%20our%20AI%20infrastructure%2C%20the%20inference%20speeds%2C%20GPU%20availability%20(H200%2C%20Blackwell)%2C%20uptime%20guarantees%2C%20pricing%2C%20and%20cloud%20platform%20features.%20Explain%20it%20simply%2C%20as%20if%20you%20were%20describing%20the%20real%20experience%20of%20the%20service."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="size-10 rounded-full bg-background-secondary flex items-center justify-center hover:bg-white/10 transition-colors"
                            >
                                <img src="/assets/logos/perplexity.svg" alt="Perplexity" className="size-5 brightness-0 invert" />
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

