"use client";

import React, { useEffect, useRef } from "react";

interface DotGridProps {
  dotSize?: number;
  gap?: number;
  baseColor?: string;
  activeColor?: string;
  proximity?: number;
  shockRadius?: number;
  resistance?: number;
  className?: string;
}

interface Dot {
  x: number;
  y: number;
  originX: number;
  originY: number;
}

export const DotGrid: React.FC<DotGridProps> = ({
  dotSize = 3,
  gap = 24,
  baseColor = "#523c7f",
  activeColor = "#9d82fc",
  proximity = 100,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });
  const dotsRef = useRef<Dot[]>([]);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const initDots = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      const dots: Dot[] = [];
      const cols = Math.ceil(width / gap);
      const rows = Math.ceil(height / gap);

      const offsetX = (width - cols * gap) / 2 + gap / 2;
      const offsetY = (height - rows * gap) / 2 + gap / 2;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = offsetX + i * gap;
          const y = offsetY + j * gap;
          dots.push({
            x,
            y,
            originX: x,
            originY: y,
          });
        }
      }
      dotsRef.current = dots;
    };

    initDots();

    const handleResize = () => {
      initDots();
    };

    const handlePointerMove = (e: PointerEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handlePointerLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      const dots = dotsRef.current;
      const totalDots = dots.length;

      for (let i = 0; i < totalDots; i++) {
        const dot = dots[i];
        const dx = mouse.x - dot.originX;
        const dy = mouse.y - dot.originY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Subtle micro-displacement on hover (max 1.5px gentle attraction)
        if (mouse.active && dist < proximity && dist > 0) {
          const ratio = 1 - dist / proximity;
          const subtleForce = ratio * 1.5;
          const angle = Math.atan2(dy, dx);
          dot.x += (dot.originX + Math.cos(angle) * subtleForce - dot.x) * 0.12;
          dot.y += (dot.originY + Math.sin(angle) * subtleForce - dot.y) * 0.12;

          // Vivid illumination on hover
          ctx.beginPath();
          const currentSize = dotSize + ratio * 0.8;
          ctx.arc(dot.x, dot.y, currentSize / 2, 0, Math.PI * 2);
          ctx.fillStyle = activeColor;
          ctx.globalAlpha = 0.55 + ratio * 0.35;
          ctx.fill();
        } else {
          // Return smoothly to resting origin
          dot.x += (dot.originX - dot.x) * 0.1;
          dot.y += (dot.originY - dot.y) * 0.1;

          // Resting state: balanced, slightly darker purple (not too dark, not too bright)
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, dotSize / 2, 0, Math.PI * 2);
          ctx.fillStyle = baseColor;
          ctx.globalAlpha = 0.38;
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [dotSize, gap, baseColor, activeColor, proximity]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ width: "100vw", height: "100vh" }}
      aria-hidden="true"
    />
  );
};
