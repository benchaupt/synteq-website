export const Statistics = () => {
    return (
        <div className="py-8 grid lg:grid-cols-3 gap-24">
            <div className="flex flex-col gap-4">
                <h2 className="text-4xl sm:text-5xl md:text-6xl">
                    GPU infrastructure services that meet.
                </h2>
            </div>
            <div className="lg:col-span-2 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
                <div className="flex flex-col gap-4 justify-center items-start">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl">32+</h2>
                    <p className="text-2xl max-w-[16ch]">
                        Lorem ipsum dolor sit amet
                    </p>
                </div>
                <div className="flex flex-col gap-4 justify-center items-start">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl">98%</h2>
                    <p className="text-2xl max-w-[16ch]">
                        Lorem ipsum dolor sit amet
                    </p>
                </div>
                <div className="flex flex-col gap-4 justify-center items-start">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl">98%</h2>
                    <p className="text-2xl max-w-[16ch]">
                        Lorem ipsum dolor sit amet
                    </p>
                </div>
            </div>
        </div>
    )
}