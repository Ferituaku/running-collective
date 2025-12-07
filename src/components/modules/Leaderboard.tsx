"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { clsx } from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RunnerData {
  id: string;
  name: string;
  distance: number; // km
  elevation: number; // m
}

const MOCK_DATA: RunnerData[] = [
  { id: "01", name: "KIKO_RUNS", distance: 64.2, elevation: 1200 },
  { id: "02", name: "TEMBALANG_GHOST", distance: 48.5, elevation: 850 },
  { id: "03", name: "GORPCORE_DAVE", distance: 12.0, elevation: 150 },
  { id: "04", name: "SEMARANG_SPEED", distance: 8.5, elevation: 60 },
  { id: "05", name: "NIGHT_OWL", distance: 102.0, elevation: 2400 },
];

export default function LeaderboardWidget() {
  const [mounted, setMounted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  useLayoutEffect(() => {
    if (!mounted) return;
    const ctx = gsap.context(() => {
        gsap.fromTo(containerRef.current, 
            { opacity: 0, scale: 0.95 },
            {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%"
                }
            }
        );
        
        const rows = rowsRef.current.filter(Boolean);
        gsap.fromTo(rows, 
            { opacity: 0, x: -20 },
            {
                opacity: 1,
                x: 0,
                stagger: 0.1,
                duration: 0.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%"
                }
            }
        );
    }, containerRef);
    return () => ctx.revert();
  }, [mounted]);

  if (!mounted) return null;

  return (
    <section ref={containerRef} className="w-full max-w-4xl mx-auto py-20 px-4">
      <div className="border border-steel bg-black/80 p-6 backdrop-blur-sm shadow-[0_0_15px_rgba(204,255,0,0.1)]">
        {/* Header */}
        <div className="flex justify-between items-end mb-8 border-b border-steel pb-4">
          <div>
            <h2 className="text-brand font-display text-3xl font-bold uppercase tracking-tighter">
              Leaderboard // WK_42
            </h2>
            <p className="text-gray-500 font-mono text-xs mt-1">
              REGION: TEMBALANG_HILLS // SOURCE: STRAVA_API
            </p>
          </div>
          <div className="hidden md:block">
             <div className="animate-pulse flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-500 font-mono text-xs">LIVE FEED</span>
             </div>
          </div>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 text-gray-500 font-mono text-xs mb-4 px-2">
            <div className="col-span-1">#</div>
            <div className="col-span-5">RUNNER</div>
            <div className="col-span-3 text-right">DIST (KM)</div>
            <div className="col-span-3 text-right">STATUS</div>
        </div>

        {/* Rows */}
        <div className="space-y-2">
            {MOCK_DATA.map((runner, index) => {
                const status = runner.distance < 10 ? "MAGER" : runner.distance > 50 ? "FULL GAS" : "ACTIVE";
                const statusColor = status === "MAGER" ? "text-red-500" : status === "FULL GAS" ? "text-brand" : "text-white";
                
                return (
                    <div 
                        key={runner.id} 
                        ref={(el: HTMLDivElement | null) => { rowsRef.current[index] = el }}
                        className="group grid grid-cols-12 gap-4 items-center bg-zinc-900/50 p-3 border border-transparent hover:border-brand/50 hover:bg-zinc-900 transition-all cursor-crosshair"
                    >
                        <div className="col-span-1 font-mono text-white/50 group-hover:text-brand">
                            {String(index + 1).padStart(2, '0')}
                        </div>
                        <div className="col-span-5 font-display font-medium text-white tracking-wide">
                            {runner.name}
                        </div>
                        <div className="col-span-3 text-right font-mono text-white">
                            {runner.distance.toFixed(1)}
                        </div>
                        <div className={clsx("col-span-3 text-right font-mono text-xs", statusColor)}>
                            [{status}]
                        </div>
                    </div>
                );
            })}
        </div>
        
        <div className="mt-6 pt-4 border-t border-dashed border-steel text-center">
            <button className="text-xs font-mono text-volt hover:underline uppercase">
                View Full Rankings &gt;&gt;
            </button>
        </div>
      </div>
    </section>
  );
}
