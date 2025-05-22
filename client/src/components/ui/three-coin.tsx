import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import * as THREE from "three";

interface RotatingCoinProps {
  isHovered: boolean;
}

export function RotatingCoin({ isHovered }: RotatingCoinProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * (isHovered ? 2 : 1);
      meshRef.current.rotation.x = Math.PI / 2;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[1, 1, 0.06, 64]} />
      <meshStandardMaterial
        color="#00FFA3"
        emissive={isHovered ? "#B57AFF" : "#9945FF"}
        emissiveIntensity={isHovered ? 1.8 : 1.2}
        metalness={0.9}
        roughness={isHovered ? 0.05 : 0.1}
      />
    </mesh>
  );
}
