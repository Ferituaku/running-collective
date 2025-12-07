"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Terrain() {
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (!meshRef.current) return;
    const geometry = meshRef.current.geometry;
    const position = geometry.attributes.position;
    const count = position.count;

    // Create random "hills" by displacing Z
    for (let i = 0; i < count; i++) {
        // Random spikes, keeping edges somewhat flat if possible, but for abstract, random is fine.
        // We'll use a simple noise-like random.
        const z = Math.random() * 2; 
        position.setZ(i, z);
    }
    position.needsUpdate = true;
    geometry.computeVertexNormals();
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
        // Continuous slow rotation
        meshRef.current.rotation.z = time * 0.02;

        // Subtle mouse interaction
        // state.pointer is normalized [-1, 1]
        const { x, y } = state.pointer;
        
        // Tilt the terrain based on mouse
        // Original rotation x is -PI/2. We add offset.
        const targetRotX = -Math.PI / 2 + (y * 0.05);
        const targetRotY = (x * 0.05);
        
        // Lerp for smoothness
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, 0.1);
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, 0.1);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, -2, -2]} rotation={[-Math.PI / 2, 0, 0]}>
      {/* Large plane to cover view */}
      <planeGeometry args={[50, 50, 40, 40]} />
      <meshBasicMaterial 
        color="#E60023" 
        wireframe 
        side={THREE.DoubleSide}
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}
