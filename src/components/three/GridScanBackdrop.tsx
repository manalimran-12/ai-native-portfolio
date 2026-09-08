'use client';

import { useEffect, useRef } from 'react';

const CELL_SIZE = 44;

// Animated grid with a sweeping scan-line — plain 2D canvas.
export default function GridScanBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let scanY = 0;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      width = rect?.width ?? window.innerWidth;
      height = rect?.height ?? window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(192, 132, 252, 0.08)';
      ctx.lineWidth = 1;
      for (let x = 0; x <= width; x += CELL_SIZE) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y <= height; y += CELL_SIZE) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      drawGrid();

      const bandHeight = 140;
      const gradient = ctx.createLinearGradient(
        0,
        scanY - bandHeight,
        0,
        scanY + bandHeight
      );
      gradient.addColorStop(0, 'rgba(192, 132, 252, 0)');
      gradient.addColorStop(0.5, 'rgba(232, 121, 249, 0.12)');
      gradient.addColorStop(1, 'rgba(192, 132, 252, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, scanY - bandHeight, width, bandHeight * 2);

      scanY += 1.1;
      if (scanY > height + 140) scanY = -140;

      if (!prefersReducedMotion) {
        animationFrame = requestAnimationFrame(draw);
      }
    };

    resize();
    draw();

    const resizeObserver = new ResizeObserver(() => resize());
    if (canvas.parentElement) resizeObserver.observe(canvas.parentElement);

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
