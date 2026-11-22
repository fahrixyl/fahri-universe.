"use client";
import { useState } from "react";
export default function Portrait({ className = "" }: { className?: string }) {
  const [err, setErr] = useState(false);
  return (
    <div className={`relative overflow-hidden glass glow-border ${className}`}>
      {!err ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/images/fahri-portrait.jpg" alt="Foto Muhammad Fahri" onError={() => setErr(true)} className="h-full w-full object-cover grayscale contrast-125" loading="eager" />
      ) : (
        <div className="h-full w-full grid place-items-center font-display text-6xl text-cyan/70">F</div>
      )}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(160deg, #22D3EE22, transparent 45%, #2563EB33), linear-gradient(to top, #05070Dcc, transparent 40%)", mixBlendMode: "screen" }} />
    </div>
  );
}
