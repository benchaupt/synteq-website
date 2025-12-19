import { AnimatedButton } from "@/app/_components/animated-button"

export const CallToAction = () => {
    return (
        <div className="bg-accent text-black">
            <div style={{
                backgroundImage: "url('/assets/cloud/Comp 1_1 1.gif')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}>
                <div className="max-w-viewport min-h-[700px] w-full mx-auto px-5 py-64 flex flex-col gap-12 items-center justify-center">
                    <h2 className="text-6xl max-w-4xl text-center">Lorem ipsum dolor sit adipiscing amet, consectetur elit?</h2>
                    <AnimatedButton size={"wide"}>View All</AnimatedButton>
                </div>

            </div>
        </div>
    )
}