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
                    <div className="border border-white/15 rounded-lg p-8 flex flex-col gap-6 group">
                        <div className="size-32 mx-auto">
                            <svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_608_2687)">
                                    <mask id="mask0_608_2687" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="128" height="128">
                                        <path d="M128 0H0V128H128V0Z" fill="white" />
                                        <path d="M122.665 63.9948C122.665 72.0482 118.482 79.5031 111.874 83.8231C113.495 91.5511 111.19 99.7938 105.494 105.484C99.803 111.18 91.5544 113.475 83.8323 111.865C79.5118 118.478 72.0574 122.667 64.004 122.667C55.9507 122.667 48.4958 118.478 44.1758 111.87C36.4478 113.502 28.205 111.186 22.5143 105.49C16.8237 99.7991 14.5128 91.5618 16.1341 83.8284C9.52078 79.5084 5.33203 72.0535 5.33203 64.0002C5.33203 55.9468 9.52078 48.4921 16.1341 44.1721C14.5181 36.4387 16.8237 28.2012 22.5143 22.5106C28.205 16.8146 36.4371 14.4984 44.1758 16.1304C48.4958 9.52235 55.9454 5.3335 63.9987 5.3335C72.052 5.3335 79.507 9.52235 83.827 16.1304C91.5443 14.4984 99.7923 16.8146 105.488 22.5106C111.179 28.2012 113.49 36.4387 111.869 44.1721C118.48 48.4911 122.664 55.949 122.665 63.9948ZM69.5144 30.4116C67.532 25.4188 60.4659 25.4187 58.483 30.4116L50.6393 50.1668C50.5529 50.3826 50.3813 50.5548 50.1654 50.6408L30.4102 58.4844C25.4175 60.4674 25.4175 67.533 30.4102 69.5159L50.1654 77.3596C50.3813 77.4455 50.5529 77.6178 50.6393 77.8338L58.483 97.589C60.4659 102.581 67.532 102.581 69.5144 97.589L77.3528 77.8338C77.4392 77.6172 77.6152 77.4455 77.8323 77.3596L97.5875 69.5159C102.58 67.533 102.58 60.4674 97.5875 58.4844L77.8323 50.6408C77.6152 50.555 77.4392 50.3834 77.3528 50.1668L69.5144 30.4116Z" fill="black" />
                                    </mask>
                                    <g mask="url(#mask0_608_2687)">
                                        <path d="M53.5249 28.4427C57.2897 18.9621 70.7099 18.9663 74.4732 28.4479L81.5926 46.3906L99.5564 53.5262C109.036 57.2905 109.036 70.7097 99.5564 74.474L81.5926 81.6041L74.4732 99.5572C70.7089 109.037 57.2897 109.037 53.5249 99.5572L46.3948 81.5988L28.4416 74.474C18.9622 70.7092 18.9622 57.2905 28.4416 53.5262L46.3948 46.3958L53.5249 28.4427Z" fill="url(#paint0_linear_608_2687)" />
                                    </g>
                                    <mask id="mask1_608_2687" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="5" y="5" width="118" height="118">
                                        <path d="M122.665 63.9948C122.665 72.0482 118.482 79.5031 111.874 83.8231C113.495 91.5511 111.19 99.7938 105.494 105.484C99.803 111.18 91.5544 113.475 83.8323 111.865C79.5118 118.478 72.0574 122.667 64.004 122.667C55.9507 122.667 48.4958 118.478 44.1758 111.87C36.4478 113.502 28.205 111.186 22.5143 105.49C16.8237 99.7991 14.5128 91.5618 16.1341 83.8284C9.52078 79.5084 5.33203 72.0535 5.33203 64.0002C5.33203 55.9468 9.52078 48.4921 16.1341 44.1721C14.5181 36.4387 16.8237 28.2012 22.5143 22.5106C28.205 16.8146 36.4371 14.4984 44.1758 16.1304C48.4958 9.52235 55.9454 5.3335 63.9987 5.3335C72.052 5.3335 79.507 9.52235 83.827 16.1304C91.5443 14.4984 99.7923 16.8146 105.488 22.5106C111.179 28.2012 113.49 36.4387 111.869 44.1721C118.48 48.4911 122.664 55.949 122.665 63.9948ZM69.5144 30.4116C67.532 25.4188 60.4659 25.4187 58.483 30.4116L50.6393 50.1668C50.5529 50.3826 50.3813 50.5548 50.1654 50.6408L30.4102 58.4844C25.4175 60.4674 25.4175 67.533 30.4102 69.5159L50.1654 77.3596C50.3813 77.4455 50.5529 77.6178 50.6393 77.8338L58.483 97.589C60.4659 102.581 67.532 102.581 69.5144 97.589L77.3528 77.8338C77.4392 77.6172 77.6152 77.4455 77.8323 77.3596L97.5875 69.5159C102.58 67.533 102.58 60.4674 97.5875 58.4844L77.8323 50.6408C77.6152 50.555 77.4392 50.3834 77.3528 50.1668L69.5144 30.4116Z" fill="white" />
                                    </mask>
                                    <g mask="url(#mask1_608_2687)">
                                        <g filter="url(#filter0_f_608_2687)">
                                            <path d="M53.5249 28.4431C57.2897 18.9626 70.7099 18.9668 74.4732 28.4484L81.5926 46.391L99.5564 53.5267C109.036 57.291 109.036 70.7102 99.5564 74.4745L81.5926 81.6046L74.4732 99.5577C70.7089 109.037 57.2897 109.038 53.5249 99.5577L46.3948 81.5993L28.4416 74.4745C18.9622 70.7097 18.9622 57.291 28.4416 53.5267L46.3948 46.3963L53.5249 28.4431Z" fill="url(#paint1_linear_608_2687)" />
                                        </g>
                                    </g>
                                    <path d="M122.665 63.9948C122.665 72.0482 118.482 79.5031 111.874 83.8231C113.495 91.5511 111.19 99.7938 105.494 105.484C99.803 111.18 91.5544 113.475 83.8323 111.865C79.5118 118.478 72.0574 122.667 64.004 122.667C55.9507 122.667 48.4958 118.478 44.1758 111.87C36.4478 113.502 28.205 111.186 22.5143 105.49C16.8237 99.7991 14.5128 91.5618 16.1341 83.8284C9.52078 79.5084 5.33203 72.0535 5.33203 64.0002C5.33203 55.9468 9.52078 48.4921 16.1341 44.1721C14.5181 36.4387 16.8237 28.2012 22.5143 22.5106C28.205 16.8146 36.4371 14.4984 44.1758 16.1304C48.4958 9.52235 55.9454 5.3335 63.9987 5.3335C72.052 5.3335 79.507 9.52235 83.827 16.1304C91.5443 14.4984 99.7923 16.8146 105.488 22.5106C111.179 28.2012 113.49 36.4387 111.869 44.1721C118.48 48.4911 122.664 55.949 122.665 63.9948ZM69.5144 30.4116C67.532 25.4188 60.4659 25.4187 58.483 30.4116L50.6393 50.1668C50.5529 50.3826 50.3813 50.5548 50.1654 50.6408L30.4102 58.4844C25.4175 60.4674 25.4175 67.533 30.4102 69.5159L50.1654 77.3596C50.3813 77.4455 50.5529 77.6178 50.6393 77.8338L58.483 97.589C60.4659 102.581 67.532 102.581 69.5144 97.589L77.3528 77.8338C77.4392 77.6172 77.6152 77.4455 77.8323 77.3596L97.5875 69.5159C102.58 67.533 102.58 60.4674 97.5875 58.4844L77.8323 50.6408C77.6152 50.555 77.4392 50.3834 77.3528 50.1668L69.5144 30.4116Z" fill="url(#paint2_linear_608_2687)" />
                                    <path d="M122.665 63.9948C122.665 72.0482 118.482 79.5031 111.874 83.8231C113.495 91.5511 111.19 99.7938 105.494 105.484C99.803 111.18 91.5544 113.475 83.8323 111.865C79.5118 118.478 72.0574 122.667 64.004 122.667V118.667C70.6691 118.667 76.8808 115.192 80.483 109.678L81.9779 107.396L84.6499 107.953C91.0963 109.298 97.9608 107.36 102.665 102.651C107.376 97.9442 109.314 91.0898 107.962 84.646L107.4 81.9687L109.686 80.4743C115.194 76.8732 118.669 70.6636 118.671 64.0002C118.671 57.3399 115.195 51.1227 109.681 47.521L107.394 46.0262L107.957 43.3491C109.309 36.901 107.369 30.0477 102.66 25.3387C97.9432 20.6219 91.0798 18.6832 84.6547 20.0418L81.9779 20.6095L80.4776 18.3179C76.876 12.8084 70.6643 9.3335 63.9987 9.3335C57.3342 9.3335 51.1273 12.8075 47.5247 18.3179L46.0247 20.6043L43.3477 20.0418C36.9002 18.6827 30.0577 20.6251 25.3477 25.3387C20.6399 30.0465 18.6973 36.9021 20.0456 43.3544L20.6081 46.0262L18.3216 47.521C12.8074 51.123 9.33203 57.3351 9.33203 64.0002C9.33203 70.6652 12.8074 76.8775 18.3216 80.4791L20.6081 81.974L20.0456 84.6514C18.6941 91.0994 20.6387 97.9527 25.3477 102.661C30.0578 107.376 36.9111 109.318 43.3477 107.959L46.0247 107.391L47.5247 109.682C51.1268 115.192 57.3384 118.667 64.004 118.667V122.667C55.9507 122.667 48.4958 118.478 44.1758 111.87C36.4478 113.502 28.205 111.186 22.5143 105.49C16.8237 99.7991 14.5128 91.5618 16.1341 83.8284C9.52078 79.5084 5.33203 72.0535 5.33203 64.0002C5.33203 55.9468 9.52078 48.4921 16.1341 44.1721C14.5181 36.4387 16.8237 28.2012 22.5143 22.5106C27.8491 17.1708 35.4164 14.8013 42.7175 15.87L44.1758 16.1304C48.4958 9.52235 55.9454 5.3335 63.9987 5.3335C71.5486 5.3335 78.5747 9.01216 82.9832 14.9169L83.827 16.1304C91.5443 14.4984 99.7923 16.8146 105.488 22.5106C111.179 28.2012 113.49 36.4387 111.869 44.1721C118.48 48.4911 122.664 55.949 122.665 63.9948Z" fill="url(#paint3_linear_608_2687)" />
                                </g>
                                <defs>
                                    <filter id="filter0_f_608_2687" x="-0.00130272" y="0.00162697" width="127.999" height="127.999" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                        <feGaussianBlur stdDeviation="10.6667" result="effect1_foregroundBlur_608_2687" />
                                    </filter>
                                    <linearGradient id="paint0_linear_608_2687" x1="63.999" y1="21.3332" x2="63.999" y2="106.667" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="currentColor" className="text-[#575757] group-hover:text-[#F5EAEA] transition-colors duration-500" />
                                        <stop offset="1" stop-color="currentColor" className="text-[#151515] group-hover:text-[#FCFCFC] transition-colors duration-500" />
                                    </linearGradient>
                                    <linearGradient id="paint1_linear_608_2687" x1="63.999" y1="21.3337" x2="63.999" y2="106.667" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="currentColor" className="text-[#575757] group-hover:text-[#F5EAEA] transition-colors duration-500" />
                                        <stop offset="1" stop-color="currentColor" className="text-[#151515] group-hover:text-[#FCFCFC] transition-colors duration-500" />
                                    </linearGradient>
                                    <linearGradient id="paint2_linear_608_2687" x1="63.9987" y1="5.3335" x2="63.9987" y2="122.667" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="currentColor" stop-opacity="0.6" className="text-[#E3E3E5] group-hover:text-[#31ECCC] transition-colors duration-500" />
                                        <stop offset="1" stop-color="currentColor" stop-opacity="0.6" className="text-[#BBBBC0] group-hover:text-[#31ECCC] transition-colors duration-500" />
                                    </linearGradient>
                                    <linearGradient id="paint3_linear_608_2687" x1="63.9987" y1="5.3335" x2="63.9987" y2="73.2802" gradientUnits="userSpaceOnUse" className="text-white group-hover:text-[#31ECCC] transition-colors duration-500">
                                        <stop stop-color="currentColor" />
                                        <stop offset="1" stop-color="currentColor" stop-opacity="0" />
                                    </linearGradient>
                                    <clipPath id="clip0_608_2687">
                                        <rect width="128" height="128" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>

                        </div>
                        <h3 className="text-xl text-[#d6d6d6]">AI applications</h3>
                        <p className="text-base text-foreground/65 leading-relaxed">
                            Launch production-ready AI without deep infrastructure knowledge. Ideal for startups, internal tools, and customer-facing AI features.
                        </p>
                    </div>

                    {/* Model Experimentation */}
                    <div className="border border-white/15 rounded-lg p-8 flex flex-col gap-6 group">
                        <div className="size-32 mx-auto">
                            <svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_339_911)">
                                    <mask id="mask0_339_911" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="128" height="128">
                                        <path d="M128 0H0V128H128V0Z" fill="white" />
                                        <path d="M88.8319 49.1321L76.7663 18.7305C74.0948 11.9993 64.5679 11.9985 61.8953 18.7292L49.8225 49.1321C49.6966 49.4482 49.447 49.6978 49.1309 49.8237L18.7233 61.8982C11.9933 64.5707 11.9933 74.096 18.7233 76.7686L49.1309 88.8432C49.447 88.9691 49.6966 89.2187 49.8225 89.5344L61.8948 119.938C64.5679 126.668 74.0943 126.667 76.7663 119.936L88.8319 89.5344C88.9583 89.2176 89.2111 88.9686 89.5284 88.8432L119.939 76.7686C126.669 74.0966 126.669 64.5702 119.939 61.8982L89.5284 49.8237C89.2111 49.6982 88.9583 49.4493 88.8319 49.1321Z" fill="black" />
                                    </mask>
                                    <g mask="url(#mask0_339_911)">
                                        <path d="M69.3325 48.0285C72.2776 48.0285 74.6653 50.4166 74.6658 53.3618V64.0285H85.3325C88.2776 64.0285 90.6653 66.4168 90.6658 69.3618C90.6648 72.3064 88.277 74.6952 85.3325 74.6952H74.6658V85.3618C74.6648 88.3064 72.277 90.6952 69.3325 90.6952C66.388 90.6952 64.0002 88.3064 63.9992 85.3618V74.6952H53.3325C50.388 74.6952 48.0005 72.3064 47.9992 69.3618C47.9995 66.4168 50.3874 64.029 53.3325 64.0285H63.9992V53.3618C63.9997 50.4168 66.3874 48.0288 69.3325 48.0285ZM32.3741 7.15356C34.156 2.66642 40.5098 2.66611 42.2908 7.15356L49.3325 24.9035C49.41 25.0973 49.5657 25.248 49.7596 25.3254L67.5149 32.3775C72.0018 34.159 72.0018 40.5074 67.5149 42.289L49.7596 49.341C49.5658 49.4184 49.41 49.5692 49.3325 49.7629L42.2908 67.5128C40.5098 72.0002 34.156 72.0002 32.3741 67.5128L25.3273 49.7629C25.2496 49.5692 25.0941 49.4183 24.9002 49.341L7.1502 42.289C2.66348 40.5074 2.66348 34.1591 7.1502 32.3775L24.9002 25.3254C25.0943 25.2482 25.2497 25.0974 25.3273 24.9035L32.3741 7.15356Z" fill="url(#paint0_linear_339_911)" />
                                    </g>
                                    <mask id="mask1_339_911" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="13" y="13" width="112" height="112">
                                        <path d="M88.8319 49.1321L76.7663 18.7305C74.0948 11.9993 64.5679 11.9985 61.8953 18.7292L49.8225 49.1321C49.6966 49.4482 49.447 49.6978 49.1309 49.8237L18.7233 61.8982C11.9933 64.5707 11.9933 74.096 18.7233 76.7686L49.1309 88.8432C49.447 88.9691 49.6966 89.2187 49.8225 89.5344L61.8948 119.938C64.5679 126.668 74.0943 126.667 76.7663 119.936L88.8319 89.5344C88.9583 89.2176 89.2111 88.9686 89.5284 88.8432L119.939 76.7686C126.669 74.0966 126.669 64.5702 119.939 61.8982L89.5284 49.8237C89.2111 49.6982 88.9583 49.4493 88.8319 49.1321Z" fill="white" />
                                    </mask>
                                    <g mask="url(#mask1_339_911)">
                                        <g filter="url(#filter0_f_339_911)">
                                            <path d="M69.3325 48.0285C72.2776 48.0285 74.6653 50.4166 74.6658 53.3618V64.0285H85.3325C88.2776 64.0285 90.6653 66.4168 90.6658 69.3618C90.6648 72.3064 88.277 74.6952 85.3325 74.6952H74.6658V85.3618C74.6648 88.3064 72.277 90.6952 69.3325 90.6952C66.388 90.6952 64.0002 88.3064 63.9992 85.3618V74.6952H53.3325C50.388 74.6952 48.0005 72.3064 47.9992 69.3618C47.9995 66.4168 50.3874 64.029 53.3325 64.0285H63.9992V53.3618C63.9997 50.4168 66.3874 48.0288 69.3325 48.0285ZM32.3741 7.15356C34.156 2.66642 40.5098 2.66611 42.2908 7.15356L49.3325 24.9035C49.41 25.0973 49.5657 25.248 49.7596 25.3254L67.5149 32.3775C72.0018 34.159 72.0018 40.5074 67.5149 42.289L49.7596 49.341C49.5658 49.4184 49.41 49.5692 49.3325 49.7629L42.2908 67.5128C40.5098 72.0002 34.156 72.0002 32.3741 67.5128L25.3273 49.7629C25.2496 49.5692 25.0941 49.4183 24.9002 49.341L7.1502 42.289C2.66348 40.5074 2.66348 34.1591 7.1502 32.3775L24.9002 25.3254C25.0943 25.2482 25.2497 25.0974 25.3273 24.9035L32.3741 7.15356Z" fill="url(#paint1_linear_339_911)" />
                                        </g>
                                    </g>
                                    <path d="M88.8319 49.1321L76.7663 18.7305C74.0948 11.9993 64.5679 11.9985 61.8953 18.7292L49.8225 49.1321C49.6966 49.4482 49.447 49.6978 49.1309 49.8237L18.7233 61.8982C11.9933 64.5707 11.9933 74.096 18.7233 76.7686L49.1309 88.8432C49.447 88.9691 49.6966 89.2187 49.8225 89.5344L61.8948 119.938C64.5679 126.668 74.0943 126.667 76.7663 119.936L88.8319 89.5344C88.9583 89.2176 89.2111 88.9686 89.5284 88.8432L119.939 76.7686C126.669 74.0966 126.669 64.5702 119.939 61.8982L89.5284 49.8237C89.2111 49.6982 88.9583 49.4493 88.8319 49.1321Z" fill="url(#paint2_linear_339_911)" />
                                    <path d="M61.8954 18.7294C64.5674 11.9994 74.0928 12 76.7648 18.7294L88.8325 49.1305C88.9589 49.4477 89.2133 49.6977 89.5307 49.8232L119.937 61.8962C126.667 64.5682 126.667 74.0988 119.937 76.7714L89.5307 88.8439L89.3067 88.9586C89.0944 89.0967 88.9274 89.2978 88.8325 89.5367L76.7648 119.938L76.4944 120.547C73.6 126.463 65.0597 126.464 62.1658 120.547L61.8954 119.938L49.8223 89.5367C49.6965 89.2204 49.4456 88.9698 49.1296 88.8439L18.7233 76.7714C11.9933 74.0988 11.9933 64.5687 18.7233 61.8962L49.1296 49.8232C49.4456 49.6973 49.6965 49.4466 49.8223 49.1305L61.8954 18.7294ZM73.0517 20.2086C71.7162 16.8437 66.9514 16.8402 65.6138 20.2034L53.5408 50.6097C53.075 51.7802 52.2046 52.7405 51.0983 53.318L50.6087 53.542L20.2025 65.6151C16.8374 66.9511 16.8375 71.7159 20.2025 73.0524L50.6087 85.1255C51.7792 85.5911 52.7396 86.4615 53.3171 87.5682L53.5408 88.0578L65.6138 118.464C66.9514 121.827 71.7109 121.824 73.0464 118.459L85.1141 88.0578L85.3429 87.5628C85.9291 86.4444 86.896 85.5842 88.0517 85.1255L118.463 73.0524C121.828 71.7164 121.828 66.9511 118.463 65.6151L88.0517 53.542C86.8965 53.0832 85.9285 52.2224 85.3429 51.1044L85.1141 50.6097L73.0517 20.2086Z" fill="url(#paint3_linear_339_911)" />
                                </g>
                                <defs>
                                    <filter id="filter0_f_339_911" x="-17.5482" y="-17.5452" width="129.546" height="129.574" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                        <feGaussianBlur stdDeviation="10.6667" result="effect1_foregroundBlur_339_911" />
                                    </filter>
                                    <linearGradient id="paint0_linear_339_911" x1="47.2258" y1="3.78689" x2="47.2258" y2="72.0002" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="currentColor" className="text-[#575757] group-hover:text-[#F5EAEA] transition-colors duration-500" />
                                        <stop offset="1" stop-color="currentColor" className="text-[#151515] group-hover:text-[#FCFCFC] transition-colors duration-500" />
                                    </linearGradient>
                                    <linearGradient id="paint1_linear_339_911" x1="47.2258" y1="3.78689" x2="47.2258" y2="72.0002" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="currentColor" className="text-[#575757] group-hover:text-[#F5EAEA] transition-colors duration-500" />
                                        <stop offset="1" stop-color="currentColor" className="text-[#151515] group-hover:text-[#FCFCFC] transition-colors duration-500" />
                                    </linearGradient>
                                    <linearGradient id="paint2_linear_339_911" x1="69.3321" y1="2.60816e-05" x2="69.3321" y2="138.667" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="currentColor" stop-opacity="0.6" className="text-[#E3E3E5] group-hover:text-[#31ECCC] transition-colors duration-500" />
                                        <stop offset="1" stop-color="currentColor" stop-opacity="0.6" className="text-[#BBBBC0] group-hover:text-[#31ECCC] transition-colors duration-500" />
                                    </linearGradient>
                                    <linearGradient id="paint3_linear_339_911" x1="69.328" y1="13.6802" x2="69.328" y2="72.0002" gradientUnits="userSpaceOnUse" className="text-white group-hover:text-[#31ECCC] transition-colors duration-500">
                                        <stop stop-color="currentColor" />
                                        <stop offset="1" stop-color="currentColor" stop-opacity="0" />
                                    </linearGradient>
                                    <clipPath id="clip0_339_911">
                                        <rect width="128" height="128" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <h3 className="text-xl text-[#d6d6d6]">Model Experimentation</h3>
                        <p className="text-base text-foreground/65 leading-relaxed">
                            Test, iterate, and improve models quickly without reconfiguring environments every time.
                        </p>
                    </div>

                    {/* Scaling AI Products */}
                    <div className="border border-white/15 rounded-lg p-8 flex flex-col gap-6 group">
                        <div className="size-32 mx-auto">
                            <svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_339_925)">
                                    <mask id="mask0_339_925" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="0" y="0" width="128" height="128">
                                        <path d="M128 0H0V128H128V0Z" fill="white" />
                                        <path d="M84.9993 42.245L72.6723 11.1857C69.5555 3.33271 58.4409 3.33173 55.323 11.1842L42.9889 42.245C42.8533 42.5853 42.5844 42.8543 42.2441 42.9898L11.1779 55.3255C3.32613 58.4434 3.32612 69.557 11.1779 72.6748L42.2441 85.0108C42.5844 85.1463 42.8533 85.4151 42.9889 85.7554L55.3225 116.816C58.4409 124.668 69.5555 124.668 72.6723 116.815L84.9993 85.7554C85.1353 85.414 85.4073 85.1458 85.7491 85.0108L116.818 72.6748C124.67 69.557 124.67 58.4434 116.818 55.3255L85.7491 42.9898C85.4073 42.8546 85.1353 42.5866 84.9993 42.245Z" fill="black" />
                                    </mask>
                                    <g mask="url(#mask0_339_925)">
                                        <path d="M101.349 49.1823C101.16 49.5809 100.976 49.9854 100.776 50.3854C96.3621 59.2133 88.7482 69.4181 79.0832 79.0832C69.4186 88.7477 59.2128 96.3568 50.3854 100.771C49.9852 100.971 49.5812 101.16 49.1823 101.349L45.2344 91.4112C45.3595 91.3498 45.4878 91.2928 45.6145 91.2293C53.1658 87.4533 62.4618 80.6218 71.5418 71.5418C80.6213 62.4618 87.4533 53.1658 91.2293 45.6145C91.2922 45.488 91.3504 45.3594 91.4112 45.2344L101.349 49.1823Z" fill="url(#paint0_linear_339_925)" />
                                    </g>
                                    <mask id="mask1_339_925" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="5" y="5" width="118" height="118">
                                        <path d="M84.9993 42.245L72.6723 11.1857C69.5555 3.33271 58.4409 3.33173 55.323 11.1842L42.9889 42.245C42.8533 42.5853 42.5844 42.8543 42.2441 42.9898L11.1779 55.3255C3.32613 58.4434 3.32612 69.557 11.1779 72.6748L42.2441 85.0108C42.5844 85.1463 42.8533 85.4151 42.9889 85.7554L55.3225 116.816C58.4409 124.668 69.5555 124.668 72.6723 116.815L84.9993 85.7554C85.1353 85.414 85.4073 85.1458 85.7491 85.0108L116.818 72.6748C124.67 69.557 124.67 58.4434 116.818 55.3255L85.7491 42.9898C85.4073 42.8546 85.1353 42.5866 84.9993 42.245Z" fill="white" />
                                    </mask>
                                    <g mask="url(#mask1_339_925)">
                                        <g filter="url(#filter0_f_339_925)">
                                            <path d="M101.349 49.1823C101.16 49.5809 100.976 49.9854 100.776 50.3854C96.3621 59.2133 88.7482 69.4181 79.0832 79.0832C69.4186 88.7477 59.2128 96.3568 50.3854 100.771C49.9852 100.971 49.5812 101.16 49.1823 101.349L45.2344 91.4112C45.3595 91.3498 45.4878 91.2928 45.6145 91.2293C53.1658 87.4533 62.4618 80.6218 71.5418 71.5418C80.6213 62.4618 87.4533 53.1658 91.2293 45.6145C91.2922 45.488 91.3504 45.3594 91.4112 45.2344L101.349 49.1823Z" fill="url(#paint1_linear_339_925)" />
                                        </g>
                                    </g>
                                    <path d="M84.9993 42.245L72.6723 11.1857C69.5555 3.33271 58.4409 3.33173 55.323 11.1842L42.9889 42.245C42.8533 42.5853 42.5844 42.8543 42.2441 42.9898L11.1779 55.3255C3.32613 58.4434 3.32612 69.557 11.1779 72.6748L42.2441 85.0108C42.5844 85.1463 42.8533 85.4151 42.9889 85.7554L55.3225 116.816C58.4409 124.668 69.5555 124.668 72.6723 116.815L84.9993 85.7554C85.1353 85.414 85.4073 85.1458 85.7491 85.0108L116.818 72.6748C124.67 69.557 124.67 58.4434 116.818 55.3255L85.7491 42.9898C85.4073 42.8546 85.1353 42.5866 84.9993 42.245Z" fill="url(#paint2_linear_339_925)" />
                                    <path d="M55.3199 11.1845C58.4377 3.33199 69.5572 3.33144 72.674 11.1845L84.9972 42.2421C85.1327 42.5829 85.4063 42.8514 85.7471 42.9869L116.82 55.3253C124.67 58.4443 124.67 69.5563 116.82 72.6747L85.7471 85.008C85.4057 85.1435 85.1327 85.4117 84.9972 85.7531L72.674 116.815L72.3562 117.529C68.9796 124.429 59.0148 124.43 55.6378 117.529L55.3199 116.815L42.9865 85.7531C42.8507 85.4133 42.5814 85.1435 42.2417 85.008L11.1791 72.6747C3.57202 69.6539 3.33268 59.1264 10.4655 55.6379L11.1791 55.3253L42.2417 42.9869C42.5821 42.8513 42.8509 42.5825 42.9865 42.2421L55.3199 11.1845ZM68.9551 12.6585C67.1738 8.17173 60.8201 8.17157 59.0388 12.6585L46.7052 43.7212C46.231 44.9123 45.3463 45.8884 44.2208 46.4765L43.7208 46.7057L12.6531 59.0443C8.16756 60.8267 8.16713 67.1739 12.6531 68.9557L43.7208 81.2944L44.2208 81.5237C45.1852 82.0277 45.9723 82.8144 46.476 83.7787L46.7052 84.2736V84.2789L59.0388 115.341C60.8212 119.827 67.1743 119.823 68.9551 115.337L81.2836 84.2789V84.2736C81.7657 83.0624 82.6639 82.0933 83.7834 81.5131L84.2783 81.2891L115.341 68.9557C119.828 67.1744 119.828 60.8256 115.341 59.0443L84.2783 46.7057C83.0986 46.2393 82.1103 45.3667 81.5124 44.2265L81.2836 43.7212L68.9551 12.6585Z" fill="url(#paint3_linear_339_925)" />
                                    <path d="M90.2463 23.0224C94.0847 22.5683 98.498 23.077 101.71 26.288C104.922 29.5004 105.43 33.9175 104.975 37.7568C104.553 41.3155 103.228 45.2091 101.345 49.1838L91.4079 45.2359C93.1871 41.6066 94.1263 38.6543 94.3818 36.5015C94.5108 35.4091 94.4458 34.6878 94.345 34.2672C94.2975 34.069 94.2442 33.9526 94.2148 33.8974C94.1887 33.8486 94.1679 33.8297 94.1679 33.8297C94.1679 33.8297 94.1471 33.808 94.1002 33.7828C94.0452 33.7535 93.929 33.7054 93.7306 33.6578C93.3103 33.5573 92.5924 33.4924 91.5012 33.6214C89.2756 33.8852 86.1876 34.8671 82.3866 36.7672C75.3076 40.3068 66.6932 46.5368 58.1631 54.7828L56.4596 56.4548C47.3802 65.5342 40.5428 74.8308 36.767 82.3817C34.8661 86.1838 33.885 89.275 33.6212 91.5017C33.4922 92.5929 33.5571 93.3102 33.6576 93.7305C33.7052 93.9289 33.7534 94.0452 33.7826 94.1006C33.8077 94.1476 33.8295 94.1684 33.8295 94.1684L33.8972 94.2153C33.9523 94.2441 34.0696 94.2926 34.267 94.3401C34.6876 94.4409 35.409 94.5113 36.5014 94.3817C38.6536 94.1262 41.6072 93.1913 45.2357 91.4132L49.1784 101.351C45.2058 103.232 41.3134 104.554 37.7566 104.975C34.1571 105.402 30.0487 104.984 26.9024 102.283L26.2878 101.71C23.076 98.4974 22.5676 94.0798 23.0222 90.2409C23.4864 86.3268 25.0327 82.002 27.2253 77.6164C31.6391 68.7886 39.2478 58.578 48.9128 48.913L50.7357 47.1266C59.8527 38.3117 69.3407 31.3632 77.6159 27.2255C82.0026 25.0324 86.3311 23.4863 90.2463 23.0224Z" fill="url(#paint4_linear_339_925)" />
                                    <path d="M29.3333 22.6667C29.3333 26.3486 26.3486 29.3333 22.6667 29.3333C18.9847 29.3333 16 26.3486 16 22.6667C16 18.9847 18.9847 16 22.6667 16C26.3486 16 29.3333 18.9847 29.3333 22.6667Z" fill="url(#paint5_linear_339_925)" />
                                </g>
                                <defs>
                                    <filter id="filter0_f_339_925" x="23.901" y="23.901" width="98.7799" height="98.7809" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                        <feGaussianBlur stdDeviation="10.6667" result="effect1_foregroundBlur_339_925" />
                                    </filter>
                                    <linearGradient id="paint0_linear_339_925" x1="73.2906" y1="45.232" x2="73.2906" y2="101.349" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="currentColor" className="text-[#575757] group-hover:text-[#F5EAEA] transition-colors duration-500" />
                                        <stop offset="1" stop-color="currentColor" className="text-[#151515] group-hover:text-[#FCFCFC] transition-colors duration-500" />
                                    </linearGradient>
                                    <linearGradient id="paint1_linear_339_925" x1="73.2906" y1="45.232" x2="73.2906" y2="101.349" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="currentColor" className="text-[#575757] group-hover:text-[#F5EAEA] transition-colors duration-500" />
                                        <stop offset="1" stop-color="currentColor" className="text-[#151515] group-hover:text-[#FCFCFC] transition-colors duration-500" />
                                    </linearGradient>
                                    <linearGradient id="paint2_linear_339_925" x1="63.9993" y1="-10.6665" x2="63.9993" y2="138.667" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="currentColor" stop-opacity="0.6" className="text-[#E3E3E5] group-hover:text-[#31ECCC] transition-colors duration-500" />
                                        <stop offset="1" stop-color="currentColor" stop-opacity="0.6" className="text-[#BBBBC0] group-hover:text-[#31ECCC] transition-colors duration-500" />
                                    </linearGradient>
                                    <linearGradient id="paint3_linear_339_925" x1="63.9993" y1="5.296" x2="63.9993" y2="73.2907" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="white" />
                                        <stop offset="1" stop-color="white" stop-opacity="0" />
                                    </linearGradient>
                                    <linearGradient id="paint4_linear_339_925" x1="63.9994" y1="22.8798" x2="63.9994" y2="105.12" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="currentColor" className="text-[#575757] group-hover:text-[#F5EAEA] transition-colors duration-500" />
                                        <stop offset="1" stop-color="currentColor" className="text-[#151515] group-hover:text-[#FCFCFC] transition-colors duration-500" />
                                    </linearGradient>
                                    <linearGradient id="paint5_linear_339_925" x1="22.6667" y1="16" x2="22.6667" y2="29.3333" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="currentColor" className="text-[#575757] group-hover:text-[#F5EAEA] transition-colors duration-500" />
                                        <stop offset="1" stop-color="currentColor" className="text-[#151515] group-hover:text-[#FCFCFC] transition-colors duration-500" />
                                    </linearGradient>
                                    <clipPath id="clip0_339_925">
                                        <rect width="128" height="128" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>

                        </div>
                        <h3 className="text-xl text-[#d6d6d6]">Scaling AI Products</h3>
                        <p className="text-base text-foreground/65 leading-relaxed">
                            Start small. Scale smoothly. No platform rewrites when your product takes off.
                        </p>
                    </div>

                    {/* AI Inference */}
                    <div className="border border-white/15 rounded-lg p-8 flex flex-col gap-6 group">
                        <div className="size-32 mx-auto">
                            <svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_339_941)">
                                    <mask id="mask0_339_941" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="0" y="0" width="128" height="128">
                                        <path d="M128 0H0V128H128V0Z" fill="white" />
                                        <path d="M85.3327 42.6663L72.6724 11.1852C69.5556 3.33222 58.441 3.33125 55.3226 11.1837L42.9888 42.2445C42.8533 42.5849 42.5844 42.8538 42.244 42.9893L11.1779 55.3253C3.32613 58.4432 3.32612 69.5563 11.1779 72.6741L42.666 85.3333C66.2303 85.3333 85.3327 66.2304 85.3327 42.6663Z" fill="black" />
                                    </mask>
                                    <g mask="url(#mask0_339_941)">
                                        <path d="M42.6654 85.3334L55.3256 116.814C58.4424 124.668 69.5571 124.669 72.675 116.816L85.0088 85.7553C85.1448 85.415 85.4136 85.1462 85.7539 85.0108L116.82 72.6748C124.672 69.5569 124.672 58.4438 116.82 55.326L85.332 42.6668C61.6419 42.489 42.4821 61.6433 42.6654 85.3334Z" fill="url(#paint0_linear_339_941)" />
                                    </g>
                                    <mask id="mask1_339_941" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="5" y="5" width="81" height="81">
                                        <path d="M85.3327 42.6663L72.6724 11.1852C69.5556 3.33222 58.441 3.33125 55.3226 11.1837L42.9888 42.2445C42.8533 42.5849 42.5844 42.8538 42.244 42.9893L11.1779 55.3253C3.32613 58.4432 3.32612 69.5563 11.1779 72.6741L42.666 85.3333C66.2303 85.3333 85.3327 66.2304 85.3327 42.6663Z" fill="white" />
                                    </mask>
                                    <g mask="url(#mask1_339_941)">
                                        <g filter="url(#filter0_f_339_941)">
                                            <path d="M42.6654 85.3334L55.3256 116.814C58.4424 124.668 69.5571 124.669 72.675 116.816L85.0088 85.7553C85.1448 85.415 85.4136 85.1462 85.7539 85.0108L116.82 72.6748C124.672 69.5569 124.672 58.4438 116.82 55.326L85.332 42.6668C61.6419 42.489 42.4821 61.6433 42.6654 85.3334Z" fill="url(#paint1_linear_339_941)" />
                                        </g>
                                    </g>
                                    <path d="M85.3327 42.6663L72.6724 11.1852C69.5556 3.33222 58.441 3.33125 55.3226 11.1837L42.9888 42.2445C42.8533 42.5849 42.5844 42.8538 42.244 42.9893L11.1779 55.3253C3.32613 58.4432 3.32612 69.5563 11.1779 72.6741L42.666 85.3333C66.2303 85.3333 85.3327 66.2304 85.3327 42.6663Z" fill="url(#paint2_linear_339_941)" />
                                    <path d="M55.3199 11.185C58.4377 3.3325 69.5572 3.33195 72.674 11.185L81.8665 34.0443C84.1561 39.7378 85.6553 45.8953 84.3353 51.8881L83.9706 53.3934C79.9711 68.8366 67.5401 80.8878 51.8822 84.3358L50.7572 84.5497C45.8759 85.3417 40.9145 84.3572 36.2051 82.6852L34.0488 81.867L11.1791 72.6745C3.57202 69.6537 3.33268 59.1268 10.4655 55.6382L11.1791 55.3257L42.2415 42.987C42.5819 42.8515 42.8508 42.5827 42.9863 42.2422L55.3199 11.185ZM68.9551 12.6589C67.1737 8.17216 60.8201 8.17205 59.0383 12.6589L46.7051 43.7214C46.2309 44.9125 45.3461 45.8885 44.2207 46.4766L43.7207 46.7058L12.653 59.0441C8.16756 60.8265 8.16713 67.1742 12.653 68.9556L12.6686 68.9609L35.5384 78.1588C40.9576 80.3374 46.2008 81.4916 51.0228 80.4297C65.6644 77.2052 77.2036 65.6649 80.4292 51.0235C81.4905 46.2008 80.3327 40.9588 78.1529 35.5391L68.9604 12.6746L68.9551 12.6589Z" fill="url(#paint3_linear_339_941)" />
                                </g>
                                <defs>
                                    <filter id="filter0_f_339_941" x="21.3307" y="21.3322" width="122.71" height="122.706" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                        <feGaussianBlur stdDeviation="10.6667" result="effect1_foregroundBlur_339_941" />
                                    </filter>
                                    <linearGradient id="paint0_linear_339_941" x1="82.6867" y1="42.6668" x2="82.6867" y2="122.704" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="currentColor" className="text-[#575757] group-hover:text-[#F5EAEA] transition-colors duration-500"/>
                                        <stop offset="1" stop-color="currentColor" className="text-[#151515] group-hover:text-[#FCFCFC] transition-colors duration-500" />
                                    </linearGradient>
                                    <linearGradient id="paint1_linear_339_941" x1="82.6867" y1="42.6668" x2="82.6867" y2="122.704" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="currentColor" className="text-[#575757] group-hover:text-[#F5EAEA] transition-colors duration-500"/>
                                    <stop offset="1" stop-color="currentColor" className="text-[#151515] group-hover:text-[#FCFCFC] transition-colors duration-500" />
                                    </linearGradient>
                                    <linearGradient id="paint2_linear_339_941" x1="45.3113" y1="5.296" x2="45.3113" y2="85.3333" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="currentColor" stop-opacity="0.6" className="text-[#E3E3E5] group-hover:text-[#31ECCC] transition-colors duration-500" />
                                        <stop offset="1" stop-color="currentColor" stop-opacity="0.6" className="text-[#BBBBC0] group-hover:text-[#31ECCC] transition-colors duration-500" />
                                    </linearGradient>
                                    <linearGradient id="paint3_linear_339_941" x1="45.0607" y1="5.29584" x2="45.0607" y2="51.3545" gradientUnits="userSpaceOnUse" className="text-white group-hover:text-[#31ECCC] transition-colors duration-500">
                                        <stop stop-color="currentColor" />
                                        <stop offset="1" stop-color="currentColor" stop-opacity="0" />
                                    </linearGradient>
                                    <clipPath id="clip0_339_941">
                                        <rect width="128" height="128" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
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
