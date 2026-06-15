"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const raf = useRef<number>();

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      if (ringRef.current) {
        ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
        ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;
        ringRef.current.style.transform = `translate(${ringPos.current.x - 16}px, ${ringPos.current.y - 16}px)`;
      }
      raf.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    raf.current = requestAnimationFrame(animate);

    const addHover = () => {
      ringRef.current?.classList.add("cursor-hover");
      dotRef.current?.classList.add("cursor-hover");
    };
    const removeHover = () => {
      ringRef.current?.classList.remove("cursor-hover");
      dotRef.current?.classList.remove("cursor-hover");
    };

    // Use event delegation so dynamically-rendered elements are covered
    const onOverBody = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest("a, button, [data-cursor]")) {
        addHover();
      }
    };
    const onOutBody = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest("a, button, [data-cursor]")) {
        removeHover();
      }
    };

    document.body.addEventListener("mouseover", onOverBody);
    document.body.addEventListener("mouseout", onOutBody);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.body.removeEventListener("mouseover", onOverBody);
      document.body.removeEventListener("mouseout", onOutBody);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <style>{`
        * { cursor: none !important; }
        .cursor-dot {
          position: fixed; top: 0; left: 0; width: 8px; height: 8px;
          background: #00E5FF; border-radius: 50%; pointer-events: none;
          z-index: 99999; transition: background 0.2s, width 0.3s, height 0.3s;
          will-change: transform;
        }
        .cursor-ring {
          position: fixed; top: 0; left: 0; width: 32px; height: 32px;
          border: 1px solid rgba(0,229,255,0.5); border-radius: 50%;
          pointer-events: none; z-index: 99998;
          transition: width 0.3s, height 0.3s, border-color 0.3s, opacity 0.3s, box-shadow 0.3s;
          will-change: transform;
        }
        .cursor-ring.cursor-hover {
          width: 48px; height: 48px;
          border-color: rgba(0,229,255,0.9);
          margin-left: -8px; margin-top: -8px;
          box-shadow: 0 0 15px rgba(0,229,255,0.3), 0 0 30px rgba(0,229,255,0.1);
        }
        .cursor-dot.cursor-hover {
          background: white;
          box-shadow: 0 0 8px rgba(255,255,255,0.6);
        }
        @media (pointer: coarse) {
          .cursor-dot, .cursor-ring { display: none; }
          * { cursor: auto !important; }
        }
      `}</style>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}