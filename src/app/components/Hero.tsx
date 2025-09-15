import { SparklesCore } from "@/components/ui/sparkles";

const Hero = () => {
    return (
        <section className="w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md mt-0">
            <div className="w-[40rem] h-40 sm:h-48 relative">
                <h1 className="text-5xl sm:text-6xl font-semibold absolute inset-0 flex justify-center mt-12">
                    Crypto Stats
                </h1>
                {/* Gradients */}
                <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-sky-700 to-transparent h-[2px] w-3/4 blur-sm" />
                <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-sky-700 to-transparent h-px w-3/4" />
                <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
                <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

                {/* Core component */}
                <SparklesCore
                    background="transparent"
                    minSize={0.4}
                    maxSize={1}
                    particleDensity={1200}
                    className="w-full h-full"
                    particleColor="#FFFFFF"
                />

                {/* Radial Gradient to prevent sharp edges */}
                <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(500px_230px_at_top,transparent_30%,white)]" />
            </div>
        </section>
    )
}

export default Hero