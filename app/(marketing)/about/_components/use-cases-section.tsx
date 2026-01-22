"use client";

import { motion } from "motion/react";

const useCases = [
    {
        title: "Research",
        highlight: "Explore new frontiers in AI.",
        description: "Purpose-built infrastructure for academic institutions, labs, and breakthrough experimentation.",
        icon: (
            <svg className="size-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 3H5C3.89543 3 3 3.89543 3 5V9M9 21H5C3.89543 21 3 20.1046 3 19V15M21 9V5C21 3.89543 20.1046 3 19 3H15M15 21H19C20.1046 21 21 20.1046 21 19V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M12 9V6M12 18V15M15 12H18M6 12H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
        )
    },
    {
        title: "Training",
        highlight: "Train models at any scale.",
        description: "From fine-tuning to full pre-training, our GPU clusters handle the heaviest workloads.",
        icon: (
            <svg className="size-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 19V5C4 3.89543 4.89543 3 6 3H18C19.1046 3 20 3.89543 20 5V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19Z" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M8 7H16M8 11H16M8 15H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M15 15L17 17L21 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        )
    },
    {
        title: "Startups",
        highlight: "Ship faster, spend smarter.",
        description: "Flexible pricing and instant access to GPUs let you iterate quickly without overcommitting.",
        icon: (
            <svg className="size-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3L4 9V21H9V14H15V21H20V9L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 3V7M8 6L12 3L16 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        )
    },
    {
        title: "Enterprise",
        highlight: "Infrastructure that scales with you.",
        description: "Dedicated support, custom SLAs, and security compliance for mission-critical AI deployments.",
        icon: (
            <svg className="size-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 21H21M5 21V7L12 3L19 7V21M9 21V15H15V21M9 11H9.01M15 11H15.01M12 11H12.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        )
    }
];

export function UseCasesSection() {
    return (
        <section className="max-w-viewport w-full mx-auto px-5 py-24 flex flex-col gap-16">
            <div className="flex flex-col gap-4 text-center">
                <p className="font-mono text-accent text-xs uppercase tracking-widest">
                    Who We Serve
                </p>
                <h2 className="heading">
                    Built for every stage of AI
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {useCases.map((useCase, index) => (
                    <motion.div
                        key={useCase.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="border border-white/10 rounded-lg p-8 flex flex-col gap-6 group hover:border-accent/30 transition-all duration-300"
                    >
                        <div className="size-16 mx-auto flex items-center justify-center text-white/80 group-hover:text-accent transition-colors duration-300">
                            {useCase.icon}
                        </div>
                        <h3 className="text-xl text-white text-center">{useCase.title}</h3>
                        <p className="text-base leading-relaxed text-center">
                            <span className="text-white">{useCase.highlight}</span>{" "}
                            <span className="text-white/50">{useCase.description}</span>
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
