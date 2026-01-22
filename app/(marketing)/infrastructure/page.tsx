"use client";

import CallToActionNew from "@/app/_components/call-to-action-new";
import { TestimonialCarousel } from "@/app/_components/testimonial-carousel";
import { LanderDynamic } from "@/app/(marketing)/animations/lander-dynamic";
import { ComputeSection } from "./_components/compute-section";
import { StorageSection } from "./_components/storage-section";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { useRouter } from "next/navigation";

const services = [
    {
        title: "VPS/Compute",
        description: "Scalable CPU infrastructure for data preprocessing, model serving, and general compute workloads.",
        image: "/assets/infrastructure/cpu-compute-image.png",
        href: "#compute"
    },
    {
        title: "Storage",
        description: "High-performance storage solutions for AI workloads. Fast access to training data and model checkpoints.",
        image: "/assets/infrastructure/storage-image.png",
        href: "#storage"
    },
    {
        title: "AI/ML Compute",
        description: "Enterprise-grade GPU clusters for training and inference. From single GPUs to multi-node configurations.",
        image: "/assets/infrastructure/gpu-compute-image.png",
        href: "/hardware"
    }
];

const DelvLogo = () => (
    <svg className="h-7" viewBox="0 0 200 37" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_383_1232)">
            <path d="M151.155 29.299H113.764V3.21166C113.764 2.35987 113.426 1.54297 112.823 0.940672C112.221 0.338372 111.403 0 110.551 0C109.699 0 108.882 0.338372 108.279 0.940672C107.676 1.54297 107.338 2.35987 107.338 3.21166V32.3647C107.374 33.2441 107.74 34.0779 108.363 34.7C108.986 35.3222 109.82 35.6872 110.7 35.7223H151.155C151.577 35.7223 151.995 35.6393 152.385 35.4778C152.775 35.3164 153.129 35.0799 153.427 34.7817C153.726 34.4834 153.963 34.1294 154.123 33.7398C154.286 33.35 154.369 32.9324 154.369 32.5107C154.369 32.089 154.286 31.6714 154.123 31.2816C153.963 30.892 153.726 30.5379 153.427 30.2397C153.129 29.9415 152.775 29.7048 152.385 29.5435C151.995 29.3821 151.577 29.299 151.155 29.299Z" fill="white" />
            <path d="M197.145 1.57875C196.821 1.30579 196.446 1.09947 196.042 0.971648C195.64 0.843824 195.214 0.797018 194.793 0.833919C194.371 0.870819 193.96 0.990699 193.584 1.18667C193.209 1.38264 192.877 1.65083 192.605 1.97583L171.377 27.2487L150.152 1.96414C149.879 1.63871 149.546 1.37041 149.169 1.17472C148.792 0.97902 148.381 0.859812 147.958 0.82398C147.535 0.788147 147.109 0.836399 146.705 0.965945C146.301 1.09549 145.926 1.30376 145.603 1.57875C145.279 1.8499 145.01 2.18263 144.814 2.55778C144.617 2.93294 144.498 3.34314 144.462 3.76479C144.424 4.18643 144.471 4.61122 144.599 5.01472C144.727 5.41821 144.933 5.79245 145.207 6.11593L168.751 34.1624C169.085 34.5235 169.491 34.8116 169.941 35.0086C170.392 35.2056 170.879 35.3074 171.371 35.3074C171.864 35.3074 172.35 35.2056 172.801 35.0086C173.252 34.8116 173.658 34.5235 173.991 34.1624L197.536 6.11593C197.809 5.79281 198.016 5.41887 198.145 5.01558C198.272 4.61231 198.32 4.18764 198.284 3.76601C198.248 3.34438 198.128 2.93409 197.933 2.55872C197.737 2.18335 197.469 1.85031 197.145 1.57875Z" fill="white" />
            <path d="M47.0483 18.2531C46.8701 8.86634 39.0355 1.43575 29.6849 1.43575H3.19576C2.36296 1.42633 1.56008 1.74583 0.961667 2.32481C0.363249 2.90378 0.0176562 3.69544 5.37623e-06 4.52768V32.5099C-0.00155303 33.3643 0.335746 34.1845 0.93802 34.7909C1.5403 35.3972 2.35845 35.7403 3.21329 35.7449H29.9624C32.2393 35.7381 34.4921 35.2778 36.5891 34.3912C38.686 33.5045 40.5853 32.2091 42.1759 30.5808C43.7666 28.9524 45.0167 27.0236 45.8532 24.9069C46.6898 22.7904 47.0961 20.5284 47.0483 18.2531ZM29.9711 29.2632H6.44409V7.90867H29.7434C35.5302 7.90867 40.4289 12.4546 40.6012 18.2618C40.6458 19.6869 40.4041 21.1065 39.8904 22.4366C39.3767 23.7667 38.6015 24.9804 37.6105 26.0061C36.6195 27.0316 35.4329 27.8482 34.1208 28.4077C32.8086 28.9671 31.3977 29.258 29.9711 29.2632Z" fill="white" />
            <path d="M95.9039 15.4434H55.5042C53.7263 15.4434 52.2852 16.8839 52.2852 18.6609C52.2852 20.4379 53.7263 21.8784 55.5042 21.8784H95.9039C97.6818 21.8784 99.1231 20.4379 99.1231 18.6609C99.1231 16.8839 97.6818 15.4434 95.9039 15.4434Z" fill="white" />
            <path d="M95.9039 1.55078H55.5042C53.7263 1.55078 52.2852 2.9913 52.2852 4.76827C52.2852 6.54523 53.7263 7.98574 55.5042 7.98574H95.9039C97.6818 7.98574 99.1231 6.54523 99.1231 4.76827C99.1231 2.9913 97.6818 1.55078 95.9039 1.55078Z" fill="white" />
            <path d="M95.9039 29.3359H55.5042C53.7263 29.3359 52.2852 30.7765 52.2852 32.5535C52.2852 34.3304 53.7263 35.771 55.5042 35.771H95.9039C97.6818 35.771 99.1231 34.3304 99.1231 32.5535C99.1231 30.7765 97.6818 29.3359 95.9039 29.3359Z" fill="white" />
        </g>
        <defs>
            <clipPath id="clip0_383_1232">
                <rect width="199.461" height="36.1228" fill="white" />
            </clipPath>
        </defs>
    </svg>
);

const testimonials = [
    {
        logo: <DelvLogo />,
        name: "Joe Stefanelli",
        title: "CTO",
        company: "Delv",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
        logo: <DelvLogo />,
        name: "Joe Stefanelli",
        title: "CTO",
        company: "Delv",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
        logo: <DelvLogo />,
        name: "Joe Stefanelli",
        title: "CTO",
        company: "Delv",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
        logo: <DelvLogo />,
        name: "Joe Stefanelli",
        title: "CTO",
        company: "Delv",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
        logo: <DelvLogo />,
        name: "Joe Stefanelli",
        title: "CTO",
        company: "Delv",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
];

export default function Infrastructure() {
    const router = useRouter();
    const servicesRef = useRef<HTMLElement>(null);
    const isServicesInView = useInView(servicesRef, { once: true, margin: "-100px" });

    const handleServiceClick = (href: string) => {
        if (href.startsWith("#")) {
            const element = document.querySelector(href);
            element?.scrollIntoView({ behavior: "smooth" });
        } else {
            router.push(href);
        }
    };

    return (
        <>
            {/* Hero Section */}
            <section className="max-w-viewport w-full mx-auto px-5 py-16 md:py-24 flex flex-col">
                <div className="flex lg:flex-row flex-col gap-12 lg:gap-16 items-center">
                    <div className="flex flex-col gap-2 flex-1 min-w-0">
                        <p className="subheading">
                            Infrastructure
                        </p>
                        <h1 className="title max-w-2xl">
                            Enterprise-grade AI infrastructure
                        </h1>
                        <p className="text-sm md:text-base text-white/60 leading-relaxed max-w-xl pt-4">
                            Purpose-built data centers and hardware designed for the most demanding AI workloads. From training clusters to inference at scale.
                        </p>
                    </div>
                    {/* Right - Lander Animation */}
                    <div className="w-full lg:w-auto lg:flex-1 flex items-center justify-center">
                        <LanderDynamic className="w-full max-w-lg lg:max-w-xl xl:max-w-2xl" />
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section
                ref={servicesRef}
                className="max-w-viewport w-full mx-auto px-5 py-16 md:py-24 lg:py-32 flex flex-col"
            >
                <div className="flex flex-col gap-8 md:gap-12 lg:gap-8 w-full">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-52 items-start lg:items-end w-full">
                        <motion.div
                            className="flex flex-col gap-3 flex-1"
                            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                            animate={isServicesInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                        >
                            <p className="subheading">
                                Ancillary Products
                            </p>
                            <h2 className="heading">
                                Full stack hosting<br />
                                solutions
                            </h2>
                        </motion.div>
                        <motion.p
                            className="text-base text-dark-foreground flex-1 leading-relaxed max-w-2xl"
                            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                            animate={isServicesInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
                        >
                            We provide infrastructure options spanning shared cloud, dedicated nodes, and bare metal—supporting workloads from initial experimentation through large-scale training and production inference.
                        </motion.p>
                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                onClick={() => handleServiceClick(service.href)}
                                className="group bg-background-secondary border border-white/10 hover:border-accent/50 flex flex-col overflow-hidden relative transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl hover:shadow-accent/10 cursor-pointer min-h-[480px] md:min-h-[560px] lg:min-h-[640px]"
                                initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                                animate={isServicesInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                                transition={{
                                    duration: 0.7,
                                    ease: "easeOut",
                                    delay: 0.3 + index * 0.12
                                }}
                            >
                                {/* Top content */}
                                <div className="px-6 md:px-8 lg:px-9 pt-6 md:pt-8 lg:pt-9 z-10 flex flex-col">
                                    <h3 className="heading2 tracking-tight text-white group-hover:text-accent transition-colors duration-300">
                                        {service.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-3">
                                        <span className="text-sm font-medium">Explore product</span>
                                        <svg className="size-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Description at bottom */}
                                <div className="mt-auto px-6 md:px-8 lg:px-9 pb-6 md:pb-8 lg:pb-9 z-10">
                                    <p className="text-base text-dark-foreground group-hover:text-foreground/80 leading-relaxed transition-colors duration-300">
                                        {service.description}
                                    </p>
                                </div>

                                {/* Image - absolute, bottom aligned, behind description */}
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    width={400}
                                    height={400}
                                    className="absolute bottom-0 left-0 right-0 w-full max-h-[75%] object-contain opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <ComputeSection />

            <StorageSection />

            <CallToActionNew />

            <TestimonialCarousel testimonials={testimonials} />
        </>
    );
}
