'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import type { MotionValue } from 'framer-motion';
import { useMotionValueEvent } from 'framer-motion';
import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  type MutableRefObject,
} from 'react';
import * as THREE from 'three';

const REST_POSITION = new THREE.Vector3(0, 1.1, 6.4);
const REST_LOOKAT = new THREE.Vector3(0, -0.1, 0);

function CameraRig({
  progressRef,
  screenRef,
}: {
  progressRef: MutableRefObject<number>;
  screenRef: MutableRefObject<THREE.Object3D | null>;
}) {
  const { camera } = useThree();
  const perspectiveCamera = camera as THREE.PerspectiveCamera;
  const targetWorldPos = useMemo(() => new THREE.Vector3(), []);
  const closePos = useMemo(() => new THREE.Vector3(), []);
  const lookAtPoint = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    const p = progressRef.current;
    // Final act: dolly toward the screen's actual world position (tracked
    // live, since the laptop is still rotating) and widen the fov, so
    // scrolling reads as flying through the screen into whatever's next.
    const diveT = THREE.MathUtils.smoothstep(p, 0.86, 1);

    if (screenRef.current) {
      screenRef.current.getWorldPosition(targetWorldPos);
    } else {
      targetWorldPos.copy(REST_LOOKAT);
    }
    closePos.copy(targetWorldPos).add(new THREE.Vector3(0, 0.02, 0.28));

    camera.position.lerpVectors(REST_POSITION, closePos, diveT);
    perspectiveCamera.fov = THREE.MathUtils.lerp(26, 62, diveT);
    perspectiveCamera.updateProjectionMatrix();
    // Always look at the screen's real (live) position rather than a fixed
    // guess — the screen's height in frame varies a lot between the closed
    // and open poses, and tracking it directly keeps it centered and
    // un-clipped through the whole sequence instead of just at rest.
    lookAtPoint.copy(targetWorldPos);
    camera.lookAt(lookAtPoint);
  });

  return null;
}

const SCREEN_IMAGES = [
  '/projects/korangi-city-lab.png',
  '/projects/al-jidar-steels.png',
  '/projects/immigration-services.png',
];

const BASE_WIDTH = 2.6;
const BASE_DEPTH = 1.7;
const BASE_HEIGHT = 0.09;
const LID_HEIGHT = 0.06;
const LID_CLOSED_ROTATION = -0.08;
const LID_OPEN_ROTATION = -1.72;

function LaptopModel({
  progressRef,
  screenRef,
}: {
  progressRef: MutableRefObject<number>;
  screenRef: MutableRefObject<THREE.Object3D | null>;
}) {
  const textures = useTexture(SCREEN_IMAGES);
  const rigRef = useRef<THREE.Group>(null);
  const lidHingeRef = useRef<THREE.Group>(null);
  const screenOverlayRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    textures.forEach((t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.needsUpdate = true;
    });
  }, [textures]);

  useFrame((state) => {
    const p = progressRef.current;
    const t = state.clock.getElapsedTime();

    const openT = THREE.MathUtils.smoothstep(p, 0, 0.35);
    if (lidHingeRef.current) {
      lidHingeRef.current.rotation.x = THREE.MathUtils.lerp(
        LID_CLOSED_ROTATION,
        LID_OPEN_ROTATION,
        openT
      );
    }

    const powerT = THREE.MathUtils.smoothstep(p, 0.22, 0.42);
    const diveT = THREE.MathUtils.smoothstep(p, 0.86, 1);
    if (screenOverlayRef.current) {
      const mat = screenOverlayRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = powerT * (1 - diveT);

      const cycleT = THREE.MathUtils.clamp((p - 0.4) / 0.5, 0, 0.999);
      const idx = Math.floor(cycleT * textures.length);
      const nextMap = textures[idx];
      if (mat.map !== nextMap) {
        mat.map = nextMap;
        mat.needsUpdate = true;
      }
    }

    // Reveal turn settles well before the dive begins, so the dive always
    // approaches a stationary target instead of a moving one.
    const revealT = THREE.MathUtils.smoothstep(p, 0.45, 0.78);
    if (rigRef.current) {
      const idleWobble = diveT > 0 ? 0 : Math.sin(t * 0.6) * 0.02;
      rigRef.current.rotation.y = THREE.MathUtils.lerp(0.4, -0.18, revealT) + idleWobble;
      rigRef.current.position.y = THREE.MathUtils.lerp(-0.2, -0.12, revealT);
    }
  });

  return (
    <group ref={rigRef} position={[0, -0.1, 0]}>
      {/* base */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[BASE_WIDTH, BASE_HEIGHT, BASE_DEPTH]} />
        <meshStandardMaterial color="#cfd1d6" metalness={0.75} roughness={0.28} />
      </mesh>

      {/* keyboard deck inset */}
      <mesh position={[0, BASE_HEIGHT / 2 + 0.005, 0.05]}>
        <boxGeometry
          args={[BASE_WIDTH * 0.92, 0.01, BASE_DEPTH * 0.78]}
        />
        <meshStandardMaterial color="#1c1c22" metalness={0.3} roughness={0.75} />
      </mesh>

      {/* trackpad */}
      <mesh position={[0, BASE_HEIGHT / 2 + 0.011, BASE_DEPTH * 0.32]}>
        <boxGeometry args={[BASE_WIDTH * 0.3, 0.004, BASE_DEPTH * 0.2]} />
        <meshStandardMaterial color="#2a2a30" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* lid, hinged at the back edge of the base */}
      <group
        ref={lidHingeRef}
        position={[0, BASE_HEIGHT / 2, -BASE_DEPTH / 2]}
        rotation={[LID_CLOSED_ROTATION, 0, 0]}
      >
        <mesh position={[0, 0, BASE_DEPTH / 2]}>
          <boxGeometry args={[BASE_WIDTH, LID_HEIGHT, BASE_DEPTH]} />
          <meshStandardMaterial color="#cfd1d6" metalness={0.75} roughness={0.28} />
        </mesh>

        {/* screen glass — colored to match the About section's bg, so
            diving into it and unpinning into that section is seamless */}
        <mesh
          position={[0, -LID_HEIGHT / 2 - 0.001, BASE_DEPTH / 2]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[BASE_WIDTH * 0.88, BASE_DEPTH * 0.88]} />
          <meshStandardMaterial color="#0a0612" metalness={0.1} roughness={0.2} />
        </mesh>

        {/* screen content overlay, fades/cycles in on scroll, fades back
            out during the dive so we don't zoom into a flat screenshot */}
        <mesh
          ref={(el) => {
            screenOverlayRef.current = el;
            screenRef.current = el;
          }}
          position={[0, -LID_HEIGHT / 2 - 0.002, BASE_DEPTH / 2]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[BASE_WIDTH * 0.86, BASE_DEPTH * 0.86]} />
          <meshBasicMaterial
            transparent
            opacity={0}
            toneMapped={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </group>
  );
}

interface LaptopSceneProps {
  scrollProgress: MotionValue<number>;
  className?: string;
}

export default function LaptopScene({
  scrollProgress,
  className,
}: LaptopSceneProps) {
  const progressRef = useRef(0);
  const screenRef = useRef<THREE.Object3D | null>(null);

  useMotionValueEvent(scrollProgress, 'change', (value) => {
    progressRef.current = value;
  });

  return (
    <Canvas
      className={className}
      dpr={[1, 1.5]}
      gl={{ antialias: true }}
      camera={{
        position: [REST_POSITION.x, REST_POSITION.y, REST_POSITION.z],
        fov: 26,
      }}
    >
      <CameraRig progressRef={progressRef} screenRef={screenRef} />
      <color attach="background" args={['#0a0612']} />
      <fog attach="fog" args={['#0a0612', 5, 10]} />
      <ambientLight intensity={0.35} />
      <spotLight
        position={[-2.2, 3, 2]}
        angle={0.5}
        penumbra={0.6}
        intensity={2.2}
        color="#f5ecff"
      />
      <pointLight position={[2, 0.6, -1.5]} intensity={1.4} color="#c026d3" />
      <pointLight position={[-1.8, 0.2, -1]} intensity={0.8} color="#7e22ce" />
      <mesh position={[0, -0.42, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.6, 48]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.4} />
      </mesh>
      <Suspense fallback={null}>
        <LaptopModel progressRef={progressRef} screenRef={screenRef} />
      </Suspense>
    </Canvas>
  );
}
