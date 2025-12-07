import TerrainHero from "@/components/hero/TerrainHero";
import LeaderboardWidget from "@/components/modules/Leaderboard";
import JourneyMasonry from "@/components/modules/Journey";
import ProjectsBento from "@/components/modules/Projects";
import GlitchButton from "@/components/ui/GlitchButton";

export default function Home() {
  return (
    <main className="w-full relative bg-void pb-32">
      <TerrainHero />
      
      <div className="relative z-10 space-y-32 mt-32">
         {/* Introduction / Vibe Text */}
         <section id="mission" className="container mx-auto px-4 text-center max-w-2xl flex flex-col items-center gap-8 scroll-mt-32">
            <p className="font-display text-2xl text-white leading-relaxed">
                WE ARE A <span className="text-brand">COLLECTIVE</span> OF RUNNERS WHO BELIEVE IN SOCIAL OVER SPEED. 
                TEMBALANG IS OUR PLAYGROUND. ELEVATION IS OUR RELIGION.
            </p>
         </section>

         <section id="links" className="w-full hidden">
            {/* Links merged into other sections */}
         </section>

         <section id="leaderboard" className="scroll-mt-24">
            <LeaderboardWidget />
         </section>

         <section id="gallery" className="scroll-mt-24">
            <JourneyMasonry />
         </section>

         <section id="projects" className="scroll-mt-24">
            <ProjectsBento />
         </section>
         
         {/* Join Section */}
         <section id="join" className="container mx-auto px-6 text-center py-20 border-y border-steel/20 bg-zinc-900/20 backdrop-blur-sm">
            <h2 className="font-display text-5xl md:text-7xl font-bold text-white uppercase tracking-tighter mb-8">
                READY TO <span className="text-brand">RUN?</span>
            </h2>
            <p className="font-mono text-stone-400 max-w-md mx-auto mb-10">
                Weekly runs. Night sessions. No membership fees. Just show up and keep pace.
            </p>
            <div className="flex flex-col items-center gap-6">
                <GlitchButton href="https://chat.whatsapp.com/G5Z6Q1n4LqJ9xX8y3rK2w" external className="w-full max-w-sm py-4 text-lg">
                    JOIN WHATSAPP COMMUNITY
                </GlitchButton>
                
                <div className="flex items-center gap-4 w-full max-w-sm justify-center">
                    <div className="h-[1px] bg-zinc-800 flex-1"></div>
                    <span className="text-xs font-mono text-zinc-600 uppercase">OR CONNECT</span>
                    <div className="h-[1px] bg-zinc-800 flex-1"></div>
                </div>

                <div className="flex gap-4 w-full max-w-sm">
                    <GlitchButton href="https://instagram.com/temcyrun" external className="flex-1 bg-zinc-900 border-zinc-800 hover:border-brand">
                        INSTAGRAM
                    </GlitchButton>
                    <GlitchButton href="https://strava.com/clubs/temcyrun" external className="flex-1 bg-zinc-900 border-zinc-800 hover:border-brand">
                        STRAVA
                    </GlitchButton>
                </div>
            </div>
         </section>

         {/* Footer simple for now */}
         <footer className="text-center py-20">
            <h1 className="text-[10vw] font-display text-concrete leading-none select-none">TEMCY RUN</h1>
         </footer>
      </div>
    </main>
  );
}
