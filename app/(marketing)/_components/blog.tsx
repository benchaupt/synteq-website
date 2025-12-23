import { AnimatedButton } from "@/app/_components/animated-button"
import { BlogCarousel } from "@/app/_components/blog-carousel"

export const Blog = () => {
    return (
        <div className="max-w-viewport w-full mx-auto px-5 py-32 flex flex-col">
            <div className="flex flex-row items-center justify-between gap-12 mb-16">
                <h2 className="text-6xl tracking-[-1.8px] leading-[110px]">Read our blog</h2>
                <div className="relative flex items-center">
                    <AnimatedButton className="min-w-[137px]">View All</AnimatedButton>
                </div>
            </div>
            <BlogCarousel blogs={[
                {
                    image: "/assets/cloud/Frame 4519.png",
                    category: "Engineering",
                    title: "Inside our effort to improve the Synteq assistant",
                    description: "A data-driven look at improving the assistant, powered by ClickHouse and deeper feedback analysis. Irure aute Lorem aute tempor proident do ipsum dolor.",
                    href: "/blog/1",
                },
                {
                    image: "/assets/cloud/Frame 4519.png",
                    category: "Company",
                    title: "Crunchbits is joining Synteq to accelerate high-performance compute solutions",
                    description: "A data-driven look at improving the assistant, powered by ClickHouse and deeper feedback analysis.",
                    href: "/blog/2",
                },
                {
                    image: "/assets/cloud/Frame 4519.png",
                    category: "Engineering",
                    title: "Introducing self-updating LLM models",
                    description: "A data-driven look at improving the assistant, powered by ClickHouse and deeper feedback analysis. Irure aute Lorem aute tempor proident do ipsum dolor.",
                    href: "/blog/3",
                },
                {
                    image: "/assets/cloud/Frame 4519.png",
                    category: "Product",
                    title: "How we built real-time collaboration features",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    href: "/blog/4",
                },
                {
                    image: "/assets/cloud/Frame 4519.png",
                    category: "Engineering",
                    title: "Optimizing GPU utilization for AI workloads",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    href: "/blog/5",
                },
                {
                    image: "/assets/cloud/Frame 4519.png",
                    category: "Company",
                    title: "Our journey to carbon-neutral data centers",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    href: "/blog/6",
                },
            ]} />
        </div>
    )
}