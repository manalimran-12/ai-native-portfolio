'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import {
  Environment,
  Lightformer,
  RoundedBox,
  useTexture,
} from '@react-three/drei';
import {
  Component,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from 'react';
import {
  BufferGeometry,
  Float32BufferAttribute,
  Group,
  MathUtils,
  SRGBColorSpace,
} from 'three';
import type { MotionValue } from 'framer-motion';

// A closed, twisted ribbon authored procedurally, rather than a stock model.
function createRibbon() {
  const positions: number[] = [],
    indices: number[] = [];
  const segments = 240,
    sides = 12;
  for (let i = 0; i <= segments; i++) {
    const t = (i / segments) * Math.PI * 2;
    const radius = 1.68 + Math.cos(t * 3) * 0.22;
    for (let j = 0; j <= sides; j++) {
      const a = (j / sides) * Math.PI * 2;
      const u = Math.cos(a) * 0.46,
        v = Math.sin(a) * 0.115;
      const twist = t * 1.5;
      const radial = u * Math.cos(twist) - v * Math.sin(twist);
      positions.push(
        Math.cos(t) * (radius + radial),
        Math.sin(t) * (radius + radial),
        Math.sin(t * 3) * 0.48 + u * Math.sin(twist) + v * Math.cos(twist)
      );
      if (i < segments && j < sides) {
        const k = i * (sides + 1) + j;
        indices.push(
          k,
          k + 1,
          k + sides + 1,
          k + 1,
          k + sides + 2,
          k + sides + 1
        );
      }
    }
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function Laptop() {
  const screen = useTexture('/projects/korangi-city-lab.png');
  screen.colorSpace = SRGBColorSpace;
  return (
    <group>
      <RoundedBox
        args={[4.15, 0.12, 2.65]}
        radius={0.07}
        smoothness={3}
        position={[0, -1.04, 0.75]}
      >
        <meshStandardMaterial
          color="#25222e"
          metalness={0.85}
          roughness={0.24}
        />
      </RoundedBox>
      <RoundedBox
        args={[3.55, 0.014, 1.18]}
        radius={0.05}
        position={[0, -0.968, 0.58]}
      >
        <meshStandardMaterial color="#08080d" roughness={0.6} />
      </RoundedBox>
      {Array.from({ length: 5 }, (_, row) =>
        Array.from({ length: 13 }, (_, column) => (
          <mesh
            key={`${row}-${column}`}
            position={[-1.59 + column * 0.265, -0.954, 0.09 + row * 0.22]}
          >
            <boxGeometry args={[0.21, 0.014, 0.155]} />
            <meshStandardMaterial color="#37313f" roughness={0.45} />
          </mesh>
        ))
      )}
      <RoundedBox
        args={[1.22, 0.015, 0.57]}
        radius={0.045}
        position={[0, -0.966, 1.65]}
      >
        <meshStandardMaterial color="#4a414f" metalness={0.7} roughness={0.3} />
      </RoundedBox>
      <group position={[0, -1, -0.45]} rotation={[-0.14, 0, 0]}>
        <RoundedBox
          args={[4.13, 2.52, 0.105]}
          radius={0.075}
          position={[0, 1.26, 0]}
        >
          <meshStandardMaterial
            color="#35303f"
            metalness={0.9}
            roughness={0.2}
          />
        </RoundedBox>
        <mesh position={[0, 1.28, 0.058]}>
          <planeGeometry args={[3.88, 2.25]} />
          <meshBasicMaterial map={screen} toneMapped={false} />
        </mesh>
        <mesh position={[0, 2.465, 0.061]}>
          <circleGeometry args={[0.018, 12]} />
          <meshBasicMaterial color="#656276" />
        </mesh>
      </group>
    </group>
  );
}

function World({
  progress,
  mobile,
}: {
  progress: MotionValue<number>;
  mobile: boolean;
}) {
  const ribbon = useMemo(createRibbon, []);
  const sculpture = useRef<Group>(null),
    laptop = useRef<Group>(null);
  useEffect(() => () => ribbon.dispose(), [ribbon]);
  useFrame(({ clock, pointer }, delta) => {
    const p = progress.get(),
      t = clock.elapsedTime;
    const morph = MathUtils.smoothstep(p, 0.23, 0.58);
    const dive = MathUtils.smoothstep(p, 0.76, 1);
    if (sculpture.current) {
      sculpture.current.visible = morph < 0.995;
      sculpture.current.position.set(
        (mobile ? 0 : 2.3) * (1 - morph),
        (mobile ? -1.55 : 0) + Math.sin(t * 0.5) * 0.1,
        0
      );
      sculpture.current.rotation.x = MathUtils.damp(
        sculpture.current.rotation.x,
        0.5 + pointer.y * 0.15 + p * 2.8,
        4,
        delta
      );
      sculpture.current.rotation.y = t * 0.12 + p * Math.PI * 2;
      sculpture.current.rotation.z = -0.6 + p * 2;
      sculpture.current.scale.setScalar((mobile ? 0.61 : 1.15) * (1 - morph));
    }
    if (laptop.current) {
      laptop.current.visible = morph > 0.015;
      laptop.current.scale.setScalar(
        morph * (mobile ? 0.64 : 0.9) * (1 + dive * 3.8)
      );
      laptop.current.position.set(
        mobile ? 0 : 1.5 * (1 - dive),
        (mobile ? -0.8 : -0.2) - dive * 0.25,
        dive * 1.2
      );
      laptop.current.rotation.set(
        0.14 * (1 - dive),
        (1 - morph) * -2.6 + (1 - dive) * -0.27,
        (1 - dive) * 0.035
      );
    }
  });
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 5, 5]} intensity={3} color="#e9ddff" />
      <pointLight position={[-4, 0, 3]} intensity={25} color="#6c28ff" />
      <Environment resolution={128} frames={1}>
        <Lightformer
          form="rect"
          intensity={5}
          position={[0, 4, 2]}
          scale={[8, 2, 1]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <Lightformer
          form="rect"
          intensity={4}
          position={[-5, 0, 3]}
          scale={[2, 8, 1]}
          rotation={[0, Math.PI / 2, 0]}
          color="#a982ff"
        />
        <Lightformer
          form="rect"
          intensity={6}
          position={[5, 1, 2]}
          scale={[2, 7, 1]}
          rotation={[0, -Math.PI / 2, 0]}
        />
        <Lightformer
          form="ring"
          intensity={3}
          position={[0, 0, 5]}
          scale={5}
          color="#ded0ff"
        />
      </Environment>
      <group ref={sculpture}>
        <mesh geometry={ribbon}>
          <meshPhysicalMaterial
            color="#bfa3ec"
            metalness={1}
            roughness={0.18}
            clearcoat={1}
          />
        </mesh>
        <mesh rotation={[1.2, 0.5, 0]}>
          <torusGeometry args={[2.15, 0.012, 8, 128]} />
          <meshStandardMaterial
            color="#c4a2ff"
            emissive="#7b42c6"
            emissiveIntensity={0.7}
            metalness={0.6}
            roughness={0.2}
          />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[0.35, 1]} />
          <meshStandardMaterial
            color="#d9bcff"
            metalness={0.95}
            roughness={0.1}
          />
        </mesh>
      </group>
      <group ref={laptop} scale={0}>
        <Suspense fallback={null}>
          <Laptop />
        </Suspense>
      </group>
    </>
  );
}

class SceneBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <div className="studio-fallback-object" />
    ) : (
      this.props.children
    );
  }
}

export default function StudioScene({
  progress,
  mobile,
  active,
}: {
  progress: MotionValue<number>;
  mobile: boolean;
  active: boolean;
}) {
  return (
    <SceneBoundary>
      <Canvas
        frameloop={active ? 'always' : 'never'}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 8.8], fov: 42 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
        fallback={<div className="studio-fallback-object" />}
      >
        <Suspense fallback={null}>
          <World progress={progress} mobile={mobile} />
        </Suspense>
      </Canvas>
    </SceneBoundary>
  );
}
