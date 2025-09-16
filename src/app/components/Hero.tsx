import { SparklesCore } from "@/components/ui/sparkles";

const Hero = () => {
    return (
        <section className="w-full flex flex-col items-center justify-center overflow-hidden rounded-md mt-0">
            <div className="w-[40rem] h-40 sm:h-48 relative">
                <h1 className="text-5xl sm:text-6xl font-semibold inset-0 flex justify-center mt-12 z-20 bg-gradient-to-r from-gray-500 via-white to-gray-500 text-transparent bg-clip-text">
                    Crypto Stats
                </h1>
                {/* Gradients */}
                <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-sky-700 to-transparent h-[2px] w-3/4 blur-sm" />
                <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-sky-700 to-transparent h-px w-3/4" />
                <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
                <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

                {/* Radial Gradient to prevent sharp edges */}
                <div className="absolute -top-4 inset-0 w-full h-full [mask-image:radial-gradient(500px_300px_at_center,white_20%,transparent_80%)] rounded-b-full">
                    <SparklesCore
                        background="transparent"
                        minSize={0.4}
                        maxSize={1}
                        particleDensity={1200}
                        className="w-full h-full"
                        particleColor="#FFFFFF"
                    />
                </div>
            </div>
        </section>
    )
}

export default Hero