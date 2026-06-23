"use client";

import React, { useEffect, useRef } from "react";

export default function AbstractBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create small drifting stars
    const starsCount = 40;
    const stars: Array<{ x: number; y: number; size: number; speed: number; alpha: number }> = [];
    
    for (let i = 0; i < starsCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.15 + 0.05,
        alpha: Math.random() * 0.5 + 0.2
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid lines
      ctx.strokeStyle = "rgba(6, 182, 212, 0.02)";
      ctx.lineWidth = 1;
      const gridSize = 40;
      
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw drifting particles
      for (let i = 0; i < starsCount; i++) {
        const s = stars[i];
        ctx.fillStyle = `rgba(0, 229, 255, ${s.alpha})`;
        ctx.shadowBlur = s.size * 3;
        ctx.shadowColor = "rgba(0, 229, 255, 0.8)";
        
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        
        s.y -= s.speed;
        if (s.y < -10) {
          s.y = canvas.height + 10;
          s.x = Math.random() * canvas.width;
        }
      }
      
      ctx.shadowBlur = 0; // reset
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen -z-10 bg-zinc-950">
      {/* Volumetric Radial Gradient behind active content */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(6, 182, 212, 0.08) 0%, rgba(9, 9, 11, 1) 75%)"
        }}
      />
      <canvas ref={canvasRef} className="w-full h-full opacity-60" />
    </div>
  );
}
