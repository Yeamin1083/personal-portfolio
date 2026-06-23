"use client";

import React, { useEffect, useRef, useState } from "react";

export default function MatrixRain() {
  const [isActive, setIsActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleTrigger = () => {
      setIsActive(true);
      // Auto disable after 6 seconds
      setTimeout(() => {
        setIsActive(false);
      }, 6000);
    };

    window.addEventListener("trigger-matrix", handleTrigger);
    return () => window.removeEventListener("trigger-matrix", handleTrigger);
  }, []);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const katakana = "ｱｲｳｴｵｶｷｸｹｺｻシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const alphabet = katakana + latin;

    const fontSize = 16;
    const columns = canvas.width / fontSize;

    const rainDrops: number[] = [];
    for (let x = 0; x < columns; x++) {
      rainDrops[x] = 1;
    }

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0F0"; // Green text
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    const interval = setInterval(draw, 30);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen z-[99999] bg-black/90 pointer-events-auto cursor-pointer"
      onClick={() => setIsActive(false)}
      title="Click to dismiss Matrix override"
    />
  );
}
