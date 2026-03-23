"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function StarGroup() {
  const count = 20;

  // Pre-calculate random positions and properties
  const stars = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      x: (Math.random() - 0.5) * 40,
      y: (Math.random() - 0.5) * 40,
      z: (Math.random() - 0.5) * 20 - 5,
      speed: Math.random() * 0.4 + 0.1,
      length: Math.random() * 2 + 0.5,
      thickness: Math.random() * 0.02 + 0.01,
      color: Math.random() > 0.7 ? "#00f0ff" : "#ffffff", // Mostly white, some neon cyan
      opacity: Math.random() * 0.5 + 0.3,
    }));
  }, [count]);

  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    // Move all stars diagonally
    groupRef.current.children.forEach((child, i) => {
      const starData = stars[i];
      
      // Diagonal movement (bottom-right direction)
      child.position.x += starData.speed * 15 * delta;
      child.position.y -= starData.speed * 15 * delta;

      // Wrap around seamlessly
      if (child.position.x > 25 || child.position.y < -25) {
        child.position.x = -25 - Math.random() * 10;
        child.position.y = 25 + Math.random() * 10;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {stars.map((star, i) => (
        <mesh 
          key={i} 
          position={[star.x, star.y, star.z]} 
          rotation={[0, 0, -Math.PI / 4]} // Point diagonally
        >
          <cylinderGeometry args={[star.thickness, star.thickness, star.length, 8]} />
          <meshBasicMaterial 
            color={star.color} 
            transparent 
            opacity={star.opacity}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function ShootingStars() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ alpha: true, antialias: false }} // Transparent background and optimize performance
        dpr={[1, 1.5]} // Restrict pixel ratio for performance
      >
        <StarGroup />
      </Canvas>
    </div>
  );
}
