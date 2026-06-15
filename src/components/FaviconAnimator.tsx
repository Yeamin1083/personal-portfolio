"use client";

import { useEffect } from "react";

export default function FaviconAnimator({
  frames = ["/favicon-0.svg", "/favicon-1.svg"],
  interval = 500,
}: {
  frames?: string[];
  interval?: number;
}) {
  useEffect(() => {
    let idx = 0;
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = frames[0];
    const t = setInterval(() => {
      link!.href = frames[idx % frames.length];
      idx++;
    }, interval);
    return () => clearInterval(t);
  }, [frames, interval]);

  return null;
}
