import React, { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { OrbitControls } from "@react-three/drei";

function RotatingCard({ imageURL }) {
  const meshRef = useRef();
  const texture = useLoader(TextureLoader, imageURL);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2.5, 1.5, 0.3]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

export default function ProjectCard({ texture }) {
  return (
    <div className="w-[300px] h-[250px] bg-black rounded-xl shadow-xl">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls enableZoom={false} />
        <RotatingCard imageURL={texture} />
      </Canvas>
    </div>
  );
}
