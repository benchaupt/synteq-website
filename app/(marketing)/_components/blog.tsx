import { AnimatedButton } from "@/app/_components/animated-button"
import { BlogCarousel } from "@/app/_components/blog-carousel"

export const Blog = () => {
    return (
        <div className="max-w-viewport w-full mx-auto px-5 py-16 md:py-24 lg:py-32 flex flex-col">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 md:gap-8 lg:gap-12 mb-6 md:mb-8 lg:mb-12 px-4 md:px-6 lg:px-[25px]">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight md:tracking-[-1.8px] leading-tight md:leading-[110px]">Read our blog</h2>
                <div className="relative flex items-center shrink-0">
                    <AnimatedButton className="min-w-[120px] md:min-w-[137px] hover:bg-background-secondary text-sm md:text-base">View All</AnimatedButton>
                </div>
            </div>
            <BlogCarousel blogs={[
                {
                    image: "/assets/blog/assistant-improvements.png",
                    category: "Engineering",
                    title: "Inside our effort to improve the Synteq assistant",
                    description: "A data-driven look at improving the assistant, powered by ClickHouse and deeper feedback analysis. Irure aute Lorem aute tempor proident do ipsum dolor.",
                    href: "/blog/1",
                },
                {
                    image: "/assets/blog/accelerate-compute.png",
                    category: "Company",
                    title: "Crunchbits is joining Synteq to accelerate high-performance compute solutions",
                    description: "A data-driven look at improving the assistant, powered by ClickHouse and deeper feedback analysis.",
                    href: "/blog/2",
                },
                {
                    image: "/assets/blog/hero-featured.png",
                    category: "Engineering",
                    title: "Introducing self-updating LLM models",
                    description: "A data-driven look at improving the assistant, powered by ClickHouse and deeper feedback analysis. Irure aute Lorem aute tempor proident do ipsum dolor.",
                    href: "/blog/3",
                },
                {
                    image: "/assets/blog/article-content-image.png",
                    category: "Product",
                    title: "How we built real-time collaboration features",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    href: "/blog/4",
                },
                {
                    image: "/assets/blog/assistant-improvements.png",
                    category: "Engineering",
                    title: "Optimizing GPU utilization for AI workloads",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    href: "/blog/5",
                },
                {
                    image: "/assets/blog/accelerate-compute.png",
                    category: "Company",
                    title: "Our journey to carbon-neutral data centers",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    href: "/blog/6",
                },
            ]} />
        </div>
    )
}