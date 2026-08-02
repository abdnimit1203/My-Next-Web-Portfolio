"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Frame-sequence hero visual (Apple-product-page style).
 *
 * To activate: drop sequentially numbered frames into `public/hero-frames/`
 * named `frame_0001.webp`, `frame_0002.webp`, ... and set HERO_FRAME_COUNT
 * below to match. Until frames exist, this renders the gradient fallback.
 */
const HERO_FRAME_COUNT = 0;
export const HAS_HERO_FRAMES = HERO_FRAME_COUNT > 0;
const FRAME_PATH = (i: number) => `/hero-frames/frame_${String(i).padStart(4, "0")}.webp`;

export function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [framesReady, setFramesReady] = useState(false);

  useEffect(() => {
    if (HERO_FRAME_COUNT === 0) return;

    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 1; i <= HERO_FRAME_COUNT; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        loaded += 1;
        if (loaded === HERO_FRAME_COUNT) setFramesReady(true);
      };
      images.push(img);
    }

    const state = { frame: 0 };

    const draw = () => {
      const img = images[Math.round(state.frame)];
      if (!img?.complete) return;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
      const x = (canvas.width - img.width * scale) / 2;
      const y = (canvas.height - img.height * scale) / 2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    const trigger = gsap.to(state, {
      frame: HERO_FRAME_COUNT - 1,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      onUpdate: draw,
    });

    return () => {
      trigger.scrollTrigger?.kill();
      trigger.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative aspect-square w-full max-w-md">
      <canvas ref={canvasRef} className={`h-full w-full ${framesReady ? "opacity-100" : "opacity-0"} transition-opacity`} />
    </div>
  );
}
