"use client";

import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";

export default function Scene({ children, className, ...props }: any) {
  return (
    <Canvas 
      className={className} 
      camera={{ position: [0, 5, 10], fov: 45 }}
      dpr={[1, 2]} // Handle high DPI
      gl={{ antialias: true, alpha: true }}
      {...props}
    >
      <fog attach="fog" args={["#050505", 5, 15]} /> 
      {/* Fog to blend terrain into void */}
      {children}
      <Preload all />
    </Canvas>
  );
}
