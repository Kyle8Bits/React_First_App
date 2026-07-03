import { useEffect, useRef } from "react";

// Canvas particle field: dots drift, connect when close, and lean toward the
// cursor. Coral-tinted, low opacity — meant to whisper, not shout.
const PARTICLE_COUNT = 60;
const CONNECT_DISTANCE = 140;
const CURSOR_PULL_RADIUS = 180;
const PARTICLE_COLOR = "255, 111, 90"; // matches --color-primary

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

export default function InteractiveParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const dpr = window.devicePixelRatio || 1;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let frameId = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seedParticles = () => {
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.6,
      }));
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${PARTICLE_COLOR}, 0.35)`;
        ctx.fill();
      }
    };

    const step = () => {
      ctx.clearRect(0, 0, width, height);
      const cursor = cursorRef.current;

      for (const p of particles) {
        // Drift and wrap around edges for an infinite feel
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Cursor influence: gentle pull, no snap
        if (cursor.active) {
          const dx = cursor.x - p.x;
          const dy = cursor.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < CURSOR_PULL_RADIUS && dist > 0) {
            const force = (1 - dist / CURSOR_PULL_RADIUS) * 0.35;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          }
        }
      }

      // Constellation connections
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < CONNECT_DISTANCE) {
            const alpha = (1 - dist / CONNECT_DISTANCE) * 0.25;
            ctx.strokeStyle = `rgba(${PARTICLE_COLOR}, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Dots
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${PARTICLE_COLOR}, 0.55)`;
        ctx.fill();
      }

      frameId = requestAnimationFrame(step);
    };

    const handlePointerMove = (e: PointerEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY, active: true };
    };
    const handlePointerLeave = () => {
      cursorRef.current.active = false;
    };
    const handleResize = () => {
      resize();
      seedParticles();
      if (prefersReducedMotion) drawStatic();
    };

    resize();
    seedParticles();

    if (prefersReducedMotion) {
      drawStatic();
    } else {
      frameId = requestAnimationFrame(step);
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerleave", handlePointerLeave);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[2]"
    />
  );
}
