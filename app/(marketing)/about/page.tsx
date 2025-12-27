/* eslint-disable @next/next/no-img-element */

import { Blog } from "@/app/(marketing)/_components/blog";
import { AnimatedCard } from "@/app/_components/animated-card";
import CallToActionNew from "@/app/_components/call-to-action-new";
import { Marquee } from "@/app/_components/marquee";
import { ScrollRevealText } from "@/app/_components/scroll-reveal-text";

export default function About() {
    return (
        <>
            {/* Hero Section */}
            <section className="max-w-viewport w-full mx-auto px-5 py-32 flex flex-col">
                <div className="flex flex-col items-center text-center gap-6">
                    <p className="font-mono text-accent text-sm tracking-tight">
                        OUR MISSION
                    </p>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-sequel max-w-5xl leading-tight tracking-tight">
                        Build the fastest, modern platform to power AI
                    </h1>
                </div>
            </section>

            {/* Image Grid Section */}
            <section className="max-w-[1900] w-full mx-auto px-5 pb-32 flex flex-col">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="md:row-span-2">
                        <img
                            src="/assets/about/image1320.png"
                            alt="Workspace"
                            className="w-full h-full object-cover border border-white/10 shadow-[0px_0px_0px_1px_#0b0e0f]"
                        />
                    </div>
                    <div>
                        <img
                            src="/assets/about/image1321.png"
                            alt="Development"
                            className="w-full h-full object-cover border border-white/10 shadow-[0px_0px_0px_1px_#0b0e0f]"
                        />
                    </div>
                    <div>
                        <img
                            src="/assets/about/image1322.png"
                            alt="Hardware"
                            className="w-full h-full object-cover border border-white/10 shadow-[0px_0px_0px_1px_#0b0e0f]"
                        />
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="max-w-7xl w-full mx-auto px-5 py-32 flex flex-col">
                <div className="border-t border-white/10 mb-20" />
                <div className="flex flex-col gap-4">
                    <p className="font-mono text-accent text-sm tracking-tight">
                        AI SHOULD BE EFFORTLESS
                    </p>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <div className="flex flex-col gap-8">

                            <img
                                src="/assets/about/image1323.png"
                                alt="Team collaboration"
                                className="w-full object-cover border border-white/10 shadow-[0px_0px_0px_1px_#0b0e0f]"
                            />
                        </div>
                        <div className="flex flex-col gap-12">
                            <ScrollRevealText
                                text="Too many teams spend months wrestling with setup, cloud configs, and unexpected costs before they ever ship. We&apos;re here to change that."
                                textClassName="text-2xl lg:text-4xl leading-snug"
                            />
                            <div className="grow" />
                            <div className="flex flex-col gap-6">
                                <div className="flex gap-6 items-center">
                                    <span className="font-mono text-accent text-base">01</span>
                                    <p className="text-2xl lg:text-3xl text-[#b3b3b3]">Speed over complexity</p>
                                </div>
                                <div className="flex gap-6 items-center">
                                    <span className="font-mono text-accent text-base">02</span>
                                    <p className="text-2xl lg:text-3xl text-[#b3b3b3]">Clarity over jargon</p>
                                </div>
                                <div className="flex gap-6 items-center">
                                    <span className="font-mono text-accent text-base">03</span>
                                    <p className="text-2xl lg:text-3xl text-[#b3b3b3]">API-first product</p>
                                </div>
                                <div className="flex gap-6 items-center">
                                    <span className="font-mono text-accent text-base">04</span>
                                    <p className="text-2xl lg:text-3xl text-[#b3b3b3]">Products over infrastructure</p>
                                </div>
                                <div className="flex gap-6 items-center">
                                    <span className="font-mono text-accent text-base">05</span>
                                    <p className="text-2xl lg:text-3xl text-[#b3b3b3]">Get to prod in days, not months</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Cost & Flexibility Cards Section */}
            <section className="max-w-7xl w-full mx-auto px-5 py-32 flex flex-col gap-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[700px]">
                    <div className="flex flex-col gap-8 h-full">
                        {/* Half the cost card */}

                        <AnimatedCard className="flex flex-col gap-16 flex-1 md:p-8 md:px-8 p-8 px-8" disableScale>
                            <img src="/assets/about/frame1.svg" alt="" className="size-11" />
                            <div className="grow" />
                            <p className="text-4xl leading-tight tracking-tight">
                                <span className="text-accent">Half the cost </span>
                                <span className="text-white/75">of both the public cloud and traditional on-prem</span>
                            </p>
                        </AnimatedCard>
                        <AnimatedCard className="flex flex-col gap-16 md:p-8 md:px-0 p-8 px-0 flex-1" disableScale>
                            <img src="/assets/about/frame.svg" alt="" className="size-11 mx-8" />
                            <div className="grow" />
                            <Marquee disableGradient className="text-3xl">
                                <span>Predictable costs</span>
                                <span className="text-accent">✦</span>
                                <span>Predictable costs</span>
                                <span className="text-accent">✦</span>
                                <span>Powerful control Panel</span>
                                <span className="text-accent">✦</span>
                            </Marquee>
                        </AnimatedCard>
                    </div>

                    {/* Cloud flexibility card */}
                    <AnimatedCard className="bg-background-secondary p-0 px-0 md:p-0 md:px-0 flex flex-col" disableScale>
                        <div className="flex flex-col gap-4 p-8">
                            <div className="size-11">
                                <img src="/assets/about/frame6.svg" alt="" className="w-full h-full" />
                            </div>
                            <p className="text-3xl lg:text-4xl leading-snug">
                                <span className="text-accent">Cloud-like flexibility </span>
                                <span className="text-white/75">but without the chaos that comes with</span>
                            </p>
                            <p className="text-lg text-white/70 max-w-md">
                                Build your AI product inside a controlled, purpose-built AI environment.
                            </p>
                        </div>
                        <div className="grow" />
                        <img src="/assets/about/Mask Group4.png" alt="" className="" />
                    </AnimatedCard>
                </div>
            </section>

            {/* Quote Section */}
            <section className="max-w-7xl w-full mx-auto px-5 py-32 flex flex-col items-center">
                <div className="h-24 w-px bg-[#F7EEEE]/15 mb-16" />

                <ScrollRevealText text="Get the speed and elasticity you expect from the cloud, inside a controlled, purpose-built AI environment." className="text-3xl lg:text-5xl text-center max-w-5xl font-sequel" />
                <div className="h-24 w-px bg-[#F7EEEE]/15 mt-16" />
            </section>

            {/* Use Cases Section */}
            <section className="max-w-7xl w-full mx-auto px-5 py-32 flex flex-col gap-16">
                <p className="font-mono text-accent text-sm tracking-tight text-center">
                    ENDLESS USECASES
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* AI Applications */}
                    <div className="border border-white/15 rounded-lg p-8 flex flex-col gap-6">
                        <div className="size-32 mx-auto">
                            <img src="/assets/about/frame2.svg" alt="" className="w-full h-full" />
                        </div>
                        <h3 className="text-xl text-[#d6d6d6]">AI applications</h3>
                        <p className="text-base text-foreground/65 leading-relaxed">
                            Launch production-ready AI without deep infrastructure knowledge. Ideal for startups, internal tools, and customer-facing AI features.
                        </p>
                    </div>

                    {/* Model Experimentation */}
                    <div className="border border-white/15 rounded-lg p-8 flex flex-col gap-6">
                        <div className="size-32 mx-auto">
                            <img src="/assets/about/frame3.svg" alt="" className="w-full h-full" />
                        </div>
                        <h3 className="text-xl text-[#d6d6d6]">Model Experimentation</h3>
                        <p className="text-base text-foreground/65 leading-relaxed">
                            Test, iterate, and improve models quickly without reconfiguring environments every time.
                        </p>
                    </div>

                    {/* Scaling AI Products */}
                    <div className="border border-white/15 rounded-lg p-8 flex flex-col gap-6">
                        <div className="size-32 mx-auto">
                            <img src="/assets/about/frame4.svg" alt="" className="w-full h-full" />
                        </div>
                        <h3 className="text-xl text-[#d6d6d6]">Scaling AI Products</h3>
                        <p className="text-base text-foreground/65 leading-relaxed">
                            Start small. Scale smoothly. No platform rewrites when your product takes off.
                        </p>
                    </div>

                    {/* AI Inference */}
                    <div className="border border-white/15 rounded-lg p-8 flex flex-col gap-6">
                        <div className="size-32 mx-auto">
                            <img src="/assets/about/frame5.svg" alt="" className="w-full h-full" />
                        </div>
                        <h3 className="text-xl text-[#d6d6d6]">AI Inference</h3>
                        <p className="text-base text-foreground/65 leading-relaxed">
                            Low-latency responses for real-time AI products, i.e chat, search, copilots, and assistants.
                        </p>
                    </div>
                </div>
            </section>

            <Blog />
            <CallToActionNew />
        </>
    );
}
