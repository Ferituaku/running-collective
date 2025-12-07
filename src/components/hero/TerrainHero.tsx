"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Scene from "@/components/canvas/Scene";
import Terrain from "@/components/canvas/Terrain";

gsap.registerPlugin(ScrollTrigger);

export default function TerrainHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        // Initial State
        gsap.set([titleLine1Ref.current, titleLine2Ref.current, bioRef.current], { 
            y: 100, 
            opacity: 0 
        });

        const masterTl = gsap.timeline();

        // 1. Intro Animation (Auto play on load)
        const introTl = gsap.timeline();
        introTl.to([titleLine1Ref.current, titleLine2Ref.current], {
            y: 0,
            opacity: 1,
            duration: 1.5,
            stagger: 0.2,
            ease: "power4.out",
            delay: 0.5,
        })
        .to(bioRef.current, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
        }, "-=1.0");

        // 2. Scroll Animation (Controlled by scroll)
        // We use fromTo to ensure it grasps the 'current' state visible on screen
        const scrollTl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom center",
                scrub: 1,
                toggleActions: "play none none reverse" // Ensure it reverses cleanly
            }
        });

        scrollTl.to(titleLine1Ref.current, {
            x: -200,
            y: -100,
            opacity: 0,
            scale: 1.2,
            ease: "power1.in",
        }, 0);

        scrollTl.to(titleLine2Ref.current, {
            x: 200,
            y: 100,
            opacity: 0,
            scale: 1.2,
            ease: "power1.in",
        }, 0);

        scrollTl.to(bioRef.current, {
            opacity: 0,
            y: 50,
            duration: 0.5
        }, 0);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-void mt-10">
      {/* 3D Background Layer */}
      <div className="absolute inset-0 z-0 opacity-60">
         <Scene className="w-full h-full pointer-events-auto">
            <Terrain />
         </Scene>
      </div>
      
      {/* Content Layer */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none select-none pb-32">
        <h1 className="text-[15vw] font-display font-bold leading-[0.85] text-white tracking-tighter text-center mix-blend-difference">
          <span ref={titleLine1Ref} className="block">TEMCY</span>
          <span ref={titleLine2Ref} className="block text-brand">RUN</span>
        </h1>

        {/* Bio Text */}
        <p ref={bioRef} className="mt-8 font-mono text-sm md:text-base text-stone-400 text-center max-w-md px-6 opacity-0">
          stress skripsi ??? stress kuliah ???<br/>
          atau stress organisasi ??? lariin aja sob
        </p>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
            <span className="text-xs font-mono text-white">SCROLL TO START</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-brand to-transparent"></div>
        </div>
      </div>
    </section>
  );
}
