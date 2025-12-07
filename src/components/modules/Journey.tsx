"use client";

import { useState, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PHOTOS = [
  { id: 1, src: "/journey/fun-run-vol-1/527460513_17857591587472115_2053450966423476603_n.jpg", category: "FUN RUN VOL#1", span: "row-span-1" },
  { id: 2, src: "/journey/fun-run-vol-1/527608154_17857591605472115_2949294161144664778_n.jpg", category: "FUN RUN VOL#1", span: "row-span-2" },
  { id: 3, src: "/journey/fun-run-vol-1/528677293_17857591548472115_1355250004120705630_n.jpg", category: "FUN RUN VOL#1", span: "row-span-1" },
  { id: 4, src: "/journey/night-run-vol-1/501386218_17882532123298796_5377195314550435114_n.jpg", category: "NIGHT RUN VOL#1", span: "row-span-2" },
  { id: 5, src: "/journey/night-run-vol-1/502086494_17882532495298796_2671934384226422863_n.jpg", category: "NIGHT RUN VOL#1", span: "row-span-1" },
];

export default function JourneyMasonry() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        gsap.fromTo(titleRef.current, 
            { opacity: 0, y: 30 },
            {
                opacity: 1, 
                y: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: "top 80%"
                }
            }
        );
        
        gsap.fromTo(gridRef.current, 
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: gridRef.current,
                    start: "top 75%"
                }
            }
        );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full max-w-6xl mx-auto py-20 px-4">
      <h2 ref={titleRef} className="text-volt font-display text-4xl mb-12 text-center md:text-left">THE JOURNEY</h2>
      
      {/* Masonry Grid */}
      <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px]">
        {PHOTOS.map((item) => (
          <motion.div
            key={item.id}
            layoutId={`card-${item.id}`}
            onClick={() => setSelectedId(item.id)}
            className={`relative overflow-hidden cursor-pointer rounded-sm border border-transparent hover:border-brand group ${item.span}`}
          >
             {/* Real Image */}
             <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-500">
                <Image 
                    src={item.src} 
                    alt={item.category}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                 <div className="absolute inset-0 bg-void/20 group-hover:bg-transparent transition-colors"></div>
             </div>
             
             <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                 <span className="font-mono text-white mix-blend-difference bg-black/50 px-2 py-1 backdrop-blur-sm">
                    {item.category}
                 </span>
             </div>
             <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-[10px] font-mono bg-black text-white px-1">IMG_{item.id}.RAW</p>
             </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox / Expanded View */}
      <AnimatePresence>
        {selectedId && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              layoutId={`card-${selectedId}`}
              className="w-full max-w-3xl aspect-video bg-zinc-800 relative border border-brand"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself? Maybe we want close on click.
            >
               {/* Content of the expanded card */}
                {(() => {
                    const photo = PHOTOS.find(p => p.id === selectedId);
                    if (!photo) return null;
                    return (
                        <div className="w-full h-full relative">
                            <Image 
                                src={photo.src} 
                                alt={photo.category}
                                fill
                                className="object-contain"
                            />
                    
                    <button 
                        onClick={() => setSelectedId(null)}
                        className="absolute top-4 right-4 bg-black text-white px-3 py-1 font-mono text-sm hover:text-brand border border-steel"
                    >
                        CLOSE [ESC]
                    </button>
                    
                            <div className="absolute bottom-8 left-8 bg-black/50 p-4 backdrop-blur-sm border-l-2 border-brand">
                                <h3 className="text-2xl md:text-3xl font-display text-white">{photo.category}</h3>
                                <p className="font-mono text-brand text-xs md:text-sm mt-1 uppercase">TEMCY RUN SESSION #{selectedId}</p>
                            </div>
                        </div>
                    );
                })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
