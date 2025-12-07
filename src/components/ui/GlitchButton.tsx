"use client";

import { clsx } from "clsx";
import Link from "next/link";

interface GlitchButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  href?: string;
  external?: boolean;
}

export default function GlitchButton({ children, className, href, external, ...props }: GlitchButtonProps) {
  const commonClasses = clsx(
    "relative group px-8 py-3 bg-brand border border-transparent overflow-hidden inline-block text-center",
    "font-display font-medium text-white uppercase tracking-wider",
    "transition-all hover:bg-white hover:text-brand",
    className
  );

  const InnerContent = () => (
    <>
      <span className="relative z-10 group-hover:text-brand transition-colors duration-0 delay-75">
        {children}
      </span>
      
      {/* Fill effect */}
      <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200 ease-out z-0"></div>
      
      {/* Glitch lines */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-brand-light opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
    </>
  );

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={commonClasses}>
           <InnerContent />
        </a>
      );
    }
    return (
      <Link href={href} className={commonClasses}>
          <InnerContent />
      </Link>
    );
  }

  return (
    <button className={commonClasses} {...props}>
      <InnerContent />
    </button>
  );
}
