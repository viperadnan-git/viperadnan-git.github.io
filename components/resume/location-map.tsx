"use client";

import { useEffect, useState } from "react";

const FALLBACK = { lat: 28.6139, lng: 77.209 }; // New Delhi
const ZOOM = 15;
const DISPLAY = 256; // Esri serves no @2x variant

type Center = { lat: number; lng: number };
type View = { center: Center; vw: number; vh: number; pageH: number };

function project(lat: number, lng: number, z: number) {
  const n = 2 ** z;
  const latRad = (lat * Math.PI) / 180;
  return {
    x: ((lng + 180) / 360) * n,
    y:
      ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) *
      n,
  };
}

export function LocationMap() {
  const [view, setView] = useState<View | null>(null);

  useEffect(() => {
    let active = true;
    const settle = (center: Center) =>
      active &&
      setView({
        center,
        vw: innerWidth,
        vh: innerHeight,
        pageH: document.documentElement.scrollHeight,
      });

    const run = () => {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 3000);
      fetch("https://ipwho.is/", { signal: ctrl.signal })
        .then((r) => r.json())
        .then((d) =>
          settle(
            d?.success && typeof d.latitude === "number"
              ? { lat: d.latitude, lng: d.longitude }
              : FALLBACK,
          ),
        )
        .catch(() => settle(FALLBACK))
        .finally(() => clearTimeout(timer));
    };

    const hasIdle = typeof window.requestIdleCallback === "function";
    const idle = hasIdle
      ? window.requestIdleCallback(run, { timeout: 2500 })
      : window.setTimeout(run, 800);
    return () => {
      active = false;
      if (hasIdle) window.cancelIdleCallback(idle as number);
      else clearTimeout(idle);
    };
  }, []);

  if (!view) return null;

  const { center, vw, vh, pageH } = view;
  const n = 2 ** ZOOM;
  const { x: cx, y: cy } = project(center.lat, center.lng, ZOOM);

  // place the coordinate at the first viewport's center; tiles fill the page
  const baseLeft = vw / 2 - (cx - Math.floor(cx)) * DISPLAY;
  const baseTop = vh / 2 - (cy - Math.floor(cy)) * DISPLAY;
  const iMin = Math.floor(-baseLeft / DISPLAY) - 1;
  const iMax = Math.ceil((vw - baseLeft) / DISPLAY) + 1;
  const jMin = Math.floor(-baseTop / DISPLAY) - 1;
  const jMax = Math.ceil((pageH - baseTop) / DISPLAY) + 1;

  const tiles = [];
  for (let j = jMin; j <= jMax; j++) {
    const ty = Math.floor(cy) + j;
    if (ty < 0 || ty >= n) continue; // no vertical wrap near the poles
    for (let i = iMin; i <= iMax; i++) {
      const tx = Math.floor(cx) + i;
      const wx = ((tx % n) + n) % n; // positive modulo → wrap x
      tiles.push({
        key: `${tx}-${ty}`,
        src: `https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/${ZOOM}/${ty}/${wx}`,
        left: baseLeft + i * DISPLAY,
        top: baseTop + j * DISPLAY,
      });
    }
  }

  return (
    <div className="location-map" aria-hidden="true">
      <div className="location-map__plane">
        {tiles.map((t) => (
          // biome-ignore lint/performance/noImgElement: raw tiles, next/image would rewrite them
          <img
            key={t.key}
            src={t.src}
            alt=""
            width={DISPLAY}
            height={DISPLAY}
            loading="eager"
            fetchPriority="low"
            decoding="async"
            draggable={false}
            style={{ left: t.left, top: t.top }}
          />
        ))}
      </div>
      <div className="location-map__veil" />
    </div>
  );
}
