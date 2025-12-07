"use client";

import { useRef, useLayoutEffect, useState } from "react";
import { clsx } from "clsx";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface ProjectItem {
  title: string;
  desc: string;
  stat: string;
  col: string;
  row: string;
  image?: string;
  href?: string;
}

const PROJECTS: ProjectItem[] = [
  { 
    title: "PRE ORDER JERSEY TEMCY RUN V1", 
    desc: "Limited Edition Release. Get yours now.", 
    stat: "PRE-ORDER",
    col: "col-span-12 md:col-span-8",
    row: "row-span-2",
    image: "/merch/jersey1.png",
    href: "#merch" 
  },
  { 
    title: "HIGHLAND TRAIL RUN", 
    desc: "Afternoon Elevation Run.", 
    stat: "SEASON_1",
    col: "col-span-12 md:col-span-4",
    row: "row-span-1",
    image: "/projects/highland-trail.jpg"
  },
  { 
    title: "FIVE MILE RUN By FKM UNDIP", 
    desc: "Sunday Fun Run Event. 5 Mile Diponegoro University Route.", 
    stat: "ONGOING",
    col: "col-span-12 md:col-span-4",
    row: "row-span-1",
    image: "/projects/5k-event-by-fkm.jpg"
  },
  { 
    title: "COMMUNITY WORKSHOP", 
    desc: "Gear Talk & Running Science.", 
    stat: "ARCHIVED",
    col: "col-span-12 md:col-span-4",
    row: "row-span-1",
    image: "/projects/workshop-session.jpg"
  },
  { 
    title: "SPECIAL EVENT: TEMBALANG LOOP", 
    desc: "Open for all communities.", 
    stat: "FINISHED",
    col: "col-span-12",
    row: "row-span-1",
    image: "/projects/special-event.jpg"
  },
];

export default function ProjectsBento() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
       gsap.fromTo(containerRef.current, 
           { opacity: 0, y: 50 },
           {
               opacity: 1,
               y: 0,
               duration: 1,
               ease: "power3.out",
               scrollTrigger: {
                   trigger: containerRef.current,
                   start: "top 90%",
               }
           }
       );

       // Animate cards based on the grid position, ensuring valid trigger
       if (gridRef.current) {
           const cards = cardsRef.current.filter(Boolean); // Filter out nulls
           gsap.fromTo(cards, 
               { opacity: 0, y: 50 },
               {
                   opacity: 1,
                   y: 0,
                   duration: 0.8,
                   stagger: 0.1,
                   ease: "power3.out",
                   scrollTrigger: {
                       trigger: gridRef.current,
                       start: "top 85%", 
                   }
               }
           );
       }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full max-w-6xl mx-auto py-20 px-4">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-white font-display text-4xl">PROJECTS</h2>
        <span className="font-mono text-xs text-stone-500">ARCHIVE_2024</span>
      </div>

      <div ref={gridRef} className="grid grid-cols-12 gap-4 auto-rows-[200px]">
        {PROJECTS.map((project, i) => (
            <div 
                key={i} 
                onClick={() => setSelectedProject(project)}
                ref={(el: HTMLDivElement | null) => { cardsRef.current[i] = el }}
                className={clsx(
                    "glass p-8 relative flex flex-col justify-between group transition-all duration-300 hover:bg-white/5 cursor-pointer",
                    project.col,
                    project.row
                )}
            >
                <div className="flex justify-between items-start z-10 relative">
                    {/* Header moved down for optional image logic */}
                    <div className="w-2 h-2 rounded-full bg-stone-700 group-hover:bg-brand transition-colors ml-auto"></div>
                </div>

                <div>
                    <h3 className="font-display text-2xl text-white group-hover:text-brand transition-colors relative z-10 w-full bg-void/80 p-2 inline-block backdrop-blur-sm md:bg-transparent md:backdrop-blur-none md:p-0">
                        {project.title}
                    </h3>
                </div>

                <div className="relative z-10">
                    <p className="font-mono text-sm text-stone-400 mb-2 bg-void/80 p-2 inline-block backdrop-blur-sm md:bg-transparent md:backdrop-blur-none md:p-0 max-w-xs">{project.desc}</p>
                    <div className="inline-block border border-stone-800 px-2 py-1 bg-black/50">
                        <span className="font-mono text-xs text-brand uppercase">{project.stat}</span>
                    </div>
                </div>

                {/* Background Image if exists */}
                {project.image && (
                   <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500">
                      <Image 
                        src={project.image} 
                        alt={project.title} 
                        fill 
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-void to-transparent"></div>
                   </div> 
                )}

                {/* Decorative corners */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-zinc-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-zinc-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-zinc-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-zinc-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>
            </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          >
            <motion.div
              layoutId={`project-${selectedProject.title}`}
              className="relative w-full max-w-4xl bg-zinc-900 border border-brand overflow-hidden rounded-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid md:grid-cols-2">
                {/* Image Section */}
                <div className="relative h-64 md:h-full min-h-[300px] bg-zinc-800">
                    {selectedProject.image ? (
                        <Image
                            src={selectedProject.image}
                            alt={selectedProject.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-700 font-mono">
                            NO_IMAGE_DATA
                        </div>
                    )}
                </div>

                {/* Content Section */}
                <div className="p-8 flex flex-col justify-between bg-zinc-950">
                    <div>
                        <div className="flex justify-between items-start mb-6">
                            <span className="font-mono text-xs text-brand border border-brand/30 px-2 py-1 bg-brand/10">
                                {selectedProject.stat}
                            </span>
                            <button 
                                onClick={() => setSelectedProject(null)}
                                className="text-zinc-500 hover:text-white transition-colors"
                            >
                                [CLOSE]
                            </button>
                        </div>
                        
                        <h3 className="text-3xl font-display text-white mb-4 leading-tight">
                            {selectedProject.title}
                        </h3>
                        
                        <p className="font-mono text-sm text-zinc-400 leading-relaxed mb-8">
                            {selectedProject.desc}
                        </p>
                    </div>

                    <div className="pt-8 border-t border-zinc-900">
                        <button className="w-full py-3 bg-white text-black font-display font-bold hover:bg-brand hover:text-white transition-colors uppercase">
                            View Full Details
                        </button>
                    </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
