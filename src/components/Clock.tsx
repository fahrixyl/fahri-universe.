"use client";
import { useEffect, useState } from "react";
export default function Clock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => { setNow(new Date()); const t = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(t); }, []);
  const tz = "Asia/Makassar";
  const time = now?.toLocaleTimeString("id-ID", { timeZone: tz, hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }).replace(/\./g, ":") ?? "--:--:--";
  const date = now?.toLocaleDateString("id-ID", { timeZone: tz, weekday: "long", day: "numeric", month: "long", year: "numeric" }) ?? "";
  return (
    <div className="glass rounded-2xl px-4 py-2.5" aria-live="off">
      <div className="font-mono text-lg text-ink tabular-nums">{time} <span className="text-[10px] text-cyan">WITA</span></div>
      <div className="text-mute min-h-[1rem]">{date}</div>
    </div>
  );
}
