'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, useTexture } from '@react-three/drei';
import { useMotionValueEvent, type MotionValue } from 'framer-motion';
import { Suspense, useRef, type MutableRefObject } from 'react';
import * as THREE from 'three';
import { useThemeColors, type ThemeAccentColors } from './useThemeColors';

// matches the intrinsic aspect ratio of /public/memoji.svg (607.5 x 639.75)
const MEMOJI_ASPECT = 607.5 / 639.75;
const RING_COUNT = 3;

function AvatarMesh({
  isSpeaking,
  progressRef,
  colors,
}: {
  isSpeaking: boolean;
  progressRef: MutableRefObject<number>;
  colors: ThemeAccentColors;
}) {
  const texture = useTexture('/memoji.svg');
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const ringRefs = useRef<Array<THREE.Mesh | null>>([]);

  const planeHeight = 1.7;
  const planeWidth = planeHeight * MEMOJI_ASPECT;
  const ringRadius = planeWidth * 0.34;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const progress = progressRef.current;

    if (groupRef.current) {
      const targetTiltX = state.pointer.y * 0.15;
      const targetTiltY = state.pointer.x * 0.2 + progress * Math.PI * 0.6;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetTiltX,
        0.06
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetTiltY,
        0.08
      );
      const scale = Math.max(1 - progress * 0.35, 0.5);
      groupRef.current.scale.setScalar(scale);
      groupRef.current.position.y = progress * 0.6;
    }

    if (materialRef.current) {
      materialRef.current.emissiveIntensity = isSpeaking
        ? 0.12 + Math.max(0, Math.sin(t * 6)) * 0.14
        : 0.04;
    }

    ringRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      if (!isSpeaking) {
        mesh.visible = false;
        return;
      }
      mesh.visible = true;
      const phase = (t * 0.8 + i / RING_COUNT) % 1;
      mesh.scale.setScalar(1 + phase * 0.5);
      const material = mesh.material as THREE.MeshBasicMaterial;
      material.opacity = Math.max(0, 0.55 * (1 - phase));
    });
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.6} rotationIntensity={0.25} floatIntensity={0.6}>
        <mesh>
          <planeGeometry args={[planeWidth, planeHeight]} />
          <meshStandardMaterial
            ref={materialRef}
            map={texture}
            transparent
            alphaTest={0.05}
            emissive={colors.accent}
            emissiveIntensity={0.05}
            roughness={0.5}
            metalness={0.05}
            side={THREE.DoubleSide}
          />
        </mesh>
      </Float>
      {Array.from({ length: RING_COUNT }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            ringRefs.current[i] = el;
          }}
          visible={false}
        >
          <ringGeometry args={[ringRadius, ringRadius * 1.08, 64]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? colors.accent : colors.accentSoft}
            transparent
            opacity={0}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

interface HeroAvatarCanvasProps {
  isSpeaking: boolean;
  scrollProgress: MotionValue<number>;
  className?: string;
}

export default function HeroAvatarCanvas({
  isSpeaking,
  scrollProgress,
  className,
}: HeroAvatarCanvasProps) {
  const progressRef = useRef(0);
  const colors = useThemeColors();

  useMotionValueEvent(scrollProgress, 'change', (value) => {
    progressRef.current = value;
  });

  return (
    <Canvas
      className={className}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 0, 2.6], fov: 38 }}
    >
      <ambientLight intensity={0.95} />
      <pointLight
        position={[1.4, 1.6, 2]}
        intensity={1.2}
        color={colors.accent}
      />
      <pointLight
        position={[-1.6, -1.2, 1.4]}
        intensity={0.5}
        color={colors.accentSoft}
      />
      <Suspense fallback={null}>
        <AvatarMesh
          isSpeaking={isSpeaking}
          progressRef={progressRef}
          colors={colors}
        />
      </Suspense>
    </Canvas>
  );
}
