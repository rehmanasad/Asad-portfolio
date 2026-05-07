import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, PerspectiveCamera, Float } from "@react-three/drei";
import * as THREE from "three";

const ParticleEarth = () => {
  const pointsRef = useRef();

  // Optimized particle cloud for performance
  const count = 3500;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.03;
      pointsRef.current.rotation.x = t * 0.01;
    }
  });

  return (
    <group position={[0, -5.3, 0]}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.025}
          color="#00d2ff"
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>

      {/* Luxury Inner Glow */}
      <mesh scale={5.94}>
        <sphereGeometry args={[1, 64, 32]} />
        <meshBasicMaterial color="#004e9a" transparent opacity={0.1} />
      </mesh>

      {/* Main Horizon Glow (The Curve) */}
      <mesh scale={6.06}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          color="#00d2ff"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer Atmosphere Haze */}
      <mesh scale={6.24}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          color="#00d2ff"
          transparent
          opacity={0.03}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};

const EarthGlobe = () => {
  return (
    <div className="w-full h-full">
      <Canvas gl={{ alpha: true }} dpr={[1, 1.5]}>
        <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={45} />
        <ambientLight intensity={0.5} />
        <ParticleEarth />
        <Stars
          radius={100}
          depth={50}
          count={500}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
      </Canvas>
    </div>
  );
};

export default EarthGlobe;
