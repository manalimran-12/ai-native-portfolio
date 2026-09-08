'use client';

import { motion } from 'framer-motion';

// Soft drifting gradient blobs — pure CSS/framer-motion, no canvas needed.
export default function AuroraBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -top-1/4 -left-1/4 h-[60vw] w-[60vw] rounded-full bg-purple-600/25 blur-3xl"
        animate={{
          x: [0, 60, -20, 0],
          y: [0, 40, -30, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/3 -right-1/4 h-[50vw] w-[50vw] rounded-full bg-pink-500/20 blur-3xl"
        animate={{
          x: [0, -50, 30, 0],
          y: [0, -30, 40, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-[45vw] w-[45vw] rounded-full bg-fuchsia-500/15 blur-3xl"
        animate={{
          x: [0, 40, -40, 0],
          y: [0, -20, 20, 0],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
