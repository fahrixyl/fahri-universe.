"use client";
import { useEffect, useState } from "react";
export default function VisitorCounter() {
  const [total, setTotal] = useState<number | null>(null);
  useEffect(() => {
    const counted = sessionStorage.getItem("fahri-counted");
    fetch("/api/visitors", { method: counted ? "GET" : "POST" })
      .then((r) => r.json()).then((d) => { if (typeof d.total === "number") setTotal(d.total); sessionStorage.setItem("fahri-counted", "1"); })
      .catch(() => {});
  }, []);
  if (total === null) return null;
  return (
    <div className="glass rounded-2xl px-4 py-2.5">
      <div className="font-mono text-lg tabular-nums">{total.toLocaleString("id-ID")}</div>
      <div className="text-mute">Total kunjungan</div>
    </div>
  );
}
