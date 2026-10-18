"use client";

import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import { ReactNode, useEffect } from "react";

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

// This Lenis version doesn't animate #anchor links, so glide to them ourselves.
function AnchorScroll() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      const target = link && document.querySelector(link.hash || "body");
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { duration: 1.6, easing: easeOutExpo });
      history.replaceState(null, "", link.hash);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [lenis]);

  return null;
}

export default function LenisProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
      <AnchorScroll />
      {children}
    </ReactLenis>
  );
}
