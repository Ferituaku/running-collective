"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";

const NAV_LINKS = [
  { label: "MISSION", href: "#mission" },
  { label: "LEADERBOARD", href: "#leaderboard" },
  { label: "GALLERY", href: "#gallery" },
  { label: "OUR PROJECTS", href: "#projects" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center mix-blend-exclusion text-white">
        {/* Logo */}
        <div className="z-50 relative pointer-events-auto">
          <Link href="/" className="block relative group" onClick={() => setIsOpen(false)}>
            <div className="relative w-32 rounded-full h-8 grayscale group-hover:grayscale-0 transition-all duration-300">
                <Image 
                    src="/logo-temcy.png" 
                    alt="TEMCY RUN" 
                    fill 
                    className="object-contain object-left"
                    priority
                />
            </div>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-sm pointer-events-auto">
            {NAV_LINKS.map((link) => (
                <Link 
                    key={link.label} 
                    href={link.href} 
                    className="hover:text-brand transition-colors relative group"
                >
                    [{link.label}]
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand transition-all group-hover:w-full"></span>
                </Link>
            ))}
        </nav>

        {/* Desktop CTA & Mobile Toggle */}
        <div className="flex items-center gap-4 z-50 relative pointer-events-auto">
           <div className="hidden md:block">
              <a href="#join" className="block">
                  <button className="text-xs font-mono border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition-colors uppercase cursor-pointer">
                      JOIN_NOW
                  </button>
              </a>
           </div>

           {/* Mobile Hamburger */}
           <button 
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 focus:outline-none group z-[60]"
                aria-label="Toggle Menu"
           >
                <motion.span 
                    animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="w-8 h-[2px] bg-current block origin-center"
                />
                <motion.span 
                    animate={isOpen ? { opacity: 0, scale: 0.5 } : { opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="w-8 h-[2px] bg-current block origin-center"
                />
                <motion.span 
                    animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="w-8 h-[2px] bg-current block origin-center"
                />
           </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
            <motion.div
                initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
                animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
                exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-0 z-40 bg-void flex flex-col items-center justify-center pointer-events-auto"
            >
                {/* Background Grid */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" 
                        style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
                </div>

                <nav className="flex flex-col items-center gap-8 z-10 w-full px-6">
                    {NAV_LINKS.map((link, i) => (
                        <motion.div
                            key={link.label}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: "easeOut" }}
                            className="w-full text-center"
                        >
                            <Link 
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="block w-full text-4xl font-display font-medium text-white hover:text-brand transition-all uppercase tracking-tight py-2 border-b border-white/10"
                            >
                                {link.label}
                            </Link>
                        </motion.div>
                    ))}
                </nav>

                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="absolute bottom-10 w-full px-6 flex flex-col gap-4"
                >
                        <a href="#join" onClick={() => setIsOpen(false)} className="block w-full">
                            <button className="w-full py-4 bg-brand text-white font-display font-bold text-xl uppercase tracking-wider hover:bg-white hover:text-brand transition-colors">
                            JOIN THE RUN!
                            </button>
                        </a>
                        <div className="flex justify-between text-zinc-500 font-mono text-xs border-t border-zinc-800 pt-4">
                        <span>TEMBALANG</span>
                        <span>SEMARANG</span>
                        </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
