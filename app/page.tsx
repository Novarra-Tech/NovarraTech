import HomePageAnimation from '@/components/HomePageAnimation';
import { FloatingNav } from '@/components/FloatingNav';

export default function Home() {
    return (
        <div className="relative overflow-hidden" style={{ height: 'calc(100vh - 64px)' }}>

            <HomePageAnimation />
            <FloatingNav />

            {/* Dark mode vignette so tagline always reads */}
            <div className="absolute bottom-0 inset-x-0 h-[42%] pointer-events-none hidden dark:block
                            bg-gradient-to-t from-[#020b18] via-[#020b18]/65 to-transparent" />
            {/* Light mode vignette */}
            <div className="absolute bottom-0 inset-x-0 h-[42%] pointer-events-none dark:hidden
                            bg-gradient-to-t from-[#f0f9ff] via-[#f0f9ff]/70 to-transparent" />

            {/* Tagline */}
            <div className="absolute bottom-0 inset-x-0 h-[38%]
                            flex flex-col items-center justify-center
                            gap-2 md:gap-3 pointer-events-none select-none">
                <p className="text-2xl sm:text-3xl md:text-4xl font-light tracking-[0.12em]
                              text-sky-950 dark:text-white text-center">
                    Infinite Innovations
                </p>
                <p className="text-xl sm:text-2xl md:text-3xl font-light tracking-[0.10em]
                              text-sky-900/80 dark:text-white/75 text-center">
                    Endless Possibilities
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-light tracking-[0.08em]
                              text-sky-800/60 dark:text-white/50 text-center">
                    Limitless Future
                </p>
            </div>
        </div>
    );
}
