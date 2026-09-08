'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Component, useRef, type ReactNode } from 'react';
import type { Mesh } from 'three';

function Sculpture() {
  const mesh = useRef<Mesh>(null);
  useFrame(({ clock, pointer }) => {
    if (!mesh.current) return;
    mesh.current.rotation.x =
      Math.sin(clock.elapsedTime * 0.18) * 0.25 + pointer.y * 0.12;
    mesh.current.rotation.y = clock.elapsedTime * 0.08 + pointer.x * 0.15;
  });
  return (
    <mesh ref={mesh} rotation={[0.4, 0, -0.4]}>
      <torusKnotGeometry args={[1.3, 0.38, 128, 24, 2, 3]} />
      <meshStandardMaterial color="#9870df" metalness={0.92} roughness={0.24} />
    </mesh>
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
    return this.state.failed ? null : this.props.children;
  }
}

export default function CinematicSculpture() {
  return (
    <SceneBoundary>
      <Canvas
        fallback={null}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 40 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[3, 4, 3]} intensity={5} color="#e3d3ff" />
        <pointLight position={[-3, -1, 2]} intensity={18} color="#7037ff" />
        <Sculpture />
      </Canvas>
    </SceneBoundary>
  );
}
