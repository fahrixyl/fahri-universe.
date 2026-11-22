"use client";
import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Music2, ChevronDown } from "lucide-react";

const fmt = (s: number) => (isFinite(s) ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}` : "0:00");

export default function MusicPlayer() {
  const a = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [open, setOpen] = useState(false);
  const [vol, setVol] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const [t, setT] = useState(0);
  const [d, setD] = useState(0);
  const [err, setErr] = useState("");

  const play = async () => {
    try { await a.current?.play(); setErr(""); } catch { setPlaying(false); }
  };
  // Mulai hanya setelah pengunjung menekan "MASUK KE SEMESTA" (interaksi nyata).
  useEffect(() => { const h = () => { if (a.current && a.current.readyState >= 0) play(); }; window.addEventListener("fahri:enter", h); return () => window.removeEventListener("fahri:enter", h); }, []);
  useEffect(() => { if (a.current) { a.current.volume = vol; a.current.muted = muted; } }, [vol, muted]);

  return (
    <div className="fixed left-3 bottom-3 z-50">
      <audio ref={a} src="/audio/background-music.mp3" loop preload="none"
        onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setT(e.currentTarget.currentTime)} onLoadedMetadata={(e) => setD(e.currentTarget.duration)}
        onError={() => { setErr("File audio belum tersedia."); setPlaying(false); }} />
      {!open ? (
        <button onClick={() => setOpen(true)} aria-label="Buka pemutar musik" className="glass rounded-full h-12 px-4 flex items-center gap-2 text-sm">
          <Music2 size={16} className="text-cyan" /><span className={`eq ${playing ? "" : "paused"}`}><i /><i /><i /><i /></span>
        </button>
      ) : (
        <div className="glass rounded-2xl p-4 w-72 max-w-[calc(100vw-1.5rem)]">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0"><p className="text-sm font-display truncate">Merry Christmas, Please Don&apos;t Stop</p><p className="text-xs text-mute mt-0.5">{err || "Musik latar"}</p></div>
            <button onClick={() => setOpen(false)} aria-label="Ciutkan pemutar"><ChevronDown size={18} /></button>
          </div>
          <input type="range" min={0} max={d || 1} step={0.1} value={t} aria-label="Progres musik" onChange={(e) => { if (a.current) a.current.currentTime = Number(e.target.value); }} className="w-full mt-3 accent-cyan" />
          <div className="flex justify-between text-[11px] font-mono text-mute"><span>{fmt(t)}</span><span>{fmt(d)}</span></div>
          <div className="flex items-center gap-3 mt-2">
            <button onClick={() => (playing ? a.current?.pause() : play())} aria-label={playing ? "Jeda" : "Putar"} className="h-10 w-10 grid place-items-center rounded-full bg-gradient-to-br from-electric to-cyan text-space">{playing ? <Pause size={18} /> : <Play size={18} />}</button>
            <button onClick={() => setMuted((m) => !m)} aria-label={muted ? "Aktifkan suara" : "Bisukan"}>{muted || vol === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}</button>
            <input type="range" min={0} max={1} step={0.05} value={muted ? 0 : vol} aria-label="Volume" onChange={(e) => { setVol(Number(e.target.value)); setMuted(false); }} className="flex-1 accent-cyan" />
            <span className={`eq ${playing ? "" : "paused"}`}><i /><i /><i /><i /></span>
          </div>
        </div>
      )}
    </div>
  );
}
