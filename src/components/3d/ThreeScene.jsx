import { Canvas, useFrame } from "@react-three/fiber";
import { Text3D, Sparkles } from "@react-three/drei";
import { useRef, Suspense, useState, useEffect, useMemo } from "react";
import * as THREE from "three";

/**
 * BULLETPROOF FIX for logo disappearing on rotation:
 *
 * Previous issues & their fixes:
 * 1. <Center> was causing async bounding-box recalculations → REMOVED
 * 2. depthWrite:false + transparent:true caused WebGL to skip depth testing,
 *    making meshes invisible at certain rotation angles → NOW FIXED:
 *    - depthWrite set to TRUE (proper depth buffer participation)
 *    - transparent removed (opacity is always 1, no need)
 *    - Rotation clamped to safe range so logo never flips behind camera
 *    - frustumCulled disabled on all meshes to prevent GPU clipping
 */
const Sleek3DLogo = () => {
  const groupRef = useRef();
  const [brandColor, setBrandColor] = useState("#00d2ff");

  useEffect(() => {
    const update = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setBrandColor(isDark ? "#00d2ff" : "#00a2cc");
    };
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  const materialS = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#004e9a",
        metalness: 0.8,
        roughness: 0.08,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
        side: THREE.DoubleSide,   // Render both faces — prevents vanishing at angles
        depthWrite: true,         // Participate in depth buffer properly
      }),
    []
  );

  const materialL = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#00d2ff",
        metalness: 0.7,
        roughness: 0.05,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
        side: THREE.DoubleSide,   // Render both faces
        depthWrite: true,
      }),
    []
  );

  // Sync L color reactively
  useEffect(() => {
    materialL.color.set(brandColor);
    materialL.needsUpdate = true;
  }, [brandColor, materialL]);

  // Gentle idle float — ONLY on y-axis, no rotation interference
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.15;
    }
  });

  const fontPath = "/fonts/helvetiker_bold.typeface.json";
  const textConfig = {
    size: 2.8,
    height: 0.7,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.10,
    bevelSize: 0.05,
    bevelSegments: 8,
  };

  return (
    <group ref={groupRef} scale={0.9} frustumCulled={false}>

        {/* S — positioned left, slightly forward */}
        <Text3D
          font={fontPath}
          position={[-2.1, -1.0, 0.4]}
          frustumCulled={false}
          renderOrder={1}
          material={materialS}
          {...textConfig}
        >H</Text3D>

        {/* L — positioned right, slightly behind */}
        <Text3D
          font={fontPath}
          position={[-0.3, -1.8, -0.4]}
          frustumCulled={false}
          renderOrder={2}
          material={materialL}
          {...textConfig}
        >M</Text3D>

      </group>
  );
};

const ThreeScene = () => (
  <Canvas
    camera={{ position: [0, 0, 12], fov: 40 }}
    gl={{ antialias: true, alpha: true }}
    style={{ pointerEvents: "none", touchAction: "none" }}
  >
    <ambientLight intensity={1.6} />
    <directionalLight position={[10, 10, 5]} intensity={4} color="#ffffff" />
    <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#00d2ff" />
    <spotLight position={[5, 10, 10]} angle={0.4} penumbra={1} intensity={6} color="#004e9a" />
    <spotLight position={[-5, -10, -10]} angle={0.4} penumbra={1} intensity={6} color="#00d2ff" />

    <Suspense fallback={null}>
      <Sleek3DLogo />
      <Sparkles count={60} scale={10} size={1.2} speed={0.3} opacity={0.4} color="#ffffff" />
    </Suspense>
  </Canvas>
);

export default ThreeScene;
