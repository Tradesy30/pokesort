'use client';

import { useEffect, useRef } from "react";

interface SparklesProps {
  id?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
  particleColor?: string;
  speed?: number;
  particleGlow?: boolean;
}

// Utility function for debouncing with proper TypeScript types
function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function Sparkles({
  id = "sparkles",
  background = "transparent",
  minSize = 1.0,
  maxSize = 2.5,
  particleDensity = 100,
  className = "h-full w-full",
  particleColor = "#38bdf8",
  speed = 1,
  particleGlow = true,
}: SparklesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const scale = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * scale;
      canvas.height = window.innerHeight * scale;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.scale(scale, scale);
    };

    resizeCanvas();

    let particles: Particle[] = [];
    let animationFrameId: number;

    class Particle {
      x: number = 0;
      y: number = 0;
      size: number = 0;
      speedX: number = 0;
      speedY: number = 0;
      opacity: number = 0;
      color: string;
      private canvas: HTMLCanvasElement;

      constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.color = particleColor;
        this.reset();
      }

      reset() {
        this.x = Math.random() * (this.canvas.width / window.devicePixelRatio);
        this.y = Math.random() * (this.canvas.height / window.devicePixelRatio);
        this.size = Math.random() * (maxSize - minSize) + minSize;
        this.speedX = (Math.random() - 0.5) * speed;
        this.speedY = (Math.random() - 0.5) * speed;
        this.opacity = Math.random() * 0.4 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around screen edges
        if (this.x < 0) this.x = this.canvas.width / window.devicePixelRatio;
        if (this.x > this.canvas.width / window.devicePixelRatio) this.x = 0;
        if (this.y < 0) this.y = this.canvas.height / window.devicePixelRatio;
        if (this.y > this.canvas.height / window.devicePixelRatio) this.y = 0;

        // Slowly change opacity
        this.opacity += (Math.random() - 0.5) * 0.01;
        this.opacity = Math.max(0.1, Math.min(0.6, this.opacity));
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.globalAlpha = this.opacity;

        if (particleGlow) {
          // Create glow effect
          ctx.shadowBlur = this.size * 2;
          ctx.shadowColor = this.color;
        }

        // Draw particle
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    }

    const initParticles = () => {
      particles = Array.from(
        { length: particleDensity },
        () => new Particle(canvas)
      );
    };

    let lastTime = 0;
    const fps = 60;
    const frameInterval = 1000 / fps;

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;

      if (deltaTime > frameInterval) {
        ctx.clearRect(
          0,
          0,
          canvas.width / window.devicePixelRatio,
          canvas.height / window.devicePixelRatio
        );

        particles.forEach((particle) => {
          particle.update();
          particle.draw(ctx);
        });

        lastTime = currentTime - (deltaTime % frameInterval);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    initParticles();
    animate(0);

    const debouncedResize = debounce(
      () => {
        resizeCanvas();
        initParticles();
      },
      250
    );

    window.addEventListener("resize", debouncedResize);

    return () => {
      window.removeEventListener("resize", debouncedResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [maxSize, minSize, particleColor, particleDensity, speed, particleGlow]);

  return (
    <canvas
      ref={canvasRef}
      id={id}
      className={className}
      style={{ background }}
    />
  );
}