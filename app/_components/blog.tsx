import { AnimatedButton } from "@/app/_components/animated-button"
import { BlogCarousel } from "@/app/_components/blog-carousel"

export const Blog = () => {
    return (
        <div className="flex flex-col bg-white text-black">
            <div className="max-w-[1600px] w-full mx-auto px-5 py-64 flex flex-col">
                <div className="flex flex-row items-center justify-between gap-12">
                    <h2 className="text-6xl">Lorem ipsum dolor sit</h2>
                    <AnimatedButton>View All</AnimatedButton>
                </div>
                <BlogCarousel blogs={[
                    {
                        image: "/assets/cloud/Frame 4519.png",
                        title: "Lorem ipsum dolor sit 1",
                        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                        date: "January 1, 2025",
                        href: "/blog/1",
                    },
                    {
                        image: "/assets/cloud/Frame 4519.png",
                        title: "Lorem ipsum dolor sit 2 ",
                        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                        date: "January 1, 2025",
                        href: "/blog/1",
                    },
                    {
                        image: "/assets/cloud/Frame 4519.png",
                        title: "Lorem ipsum dolor sit 3",
                        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                        date: "January 1, 2025",
                        href: "/blog/1",
                    },
                    {
                        image: "/assets/cloud/Frame 4519.png",
                        title: "Lorem ipsum dolor sit 4",
                        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                        date: "January 1, 2025",
                        href: "/blog/1",
                    },
                    {
                        image: "/assets/cloud/Frame 4519.png",
                        title: "Lorem ipsum dolor sit 5",
                        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                        date: "January 1, 2025",
                        href: "/blog/1",
                    },
                    {
                        image: "/assets/cloud/Frame 4519.png",
                        title: "Lorem ipsum dolor sit 6",
                        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                        date: "January 1, 2025",
                        href: "/blog/1",
                    },
                ]} />
            </div>
        </div>
    )
}