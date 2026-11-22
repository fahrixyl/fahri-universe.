"use client";
import { Search } from "lucide-react";
export const sections = [
  { id: "beranda", label: "Beranda" }, { id: "tentang", label: "Tentang Saya" }, { id: "keahlian", label: "Keahlian" },
  { id: "hobi", label: "Hobi" }, { id: "proyek", label: "Proyek" }, { id: "sosial", label: "Sosial" }, { id: "kontak", label: "Kontak" },
];
export default function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-40">
      <nav className="max-w-6xl mt-3 mx-3 sm:mx-auto glass rounded-full flex items-center justify-between px-5 py-2.5" aria-label="Navigasi utama">
        <a href="#beranda" className="font-display font-bold tracking-[0.25em] text-sm">FAHRI</a>
        <ul className="hidden md:flex gap-6 text-sm text-mute">
          {sections.slice(1).map((s) => <li key={s.id}><a className="hover:text-cyan transition-colors" href={`#${s.id}`}>{s.label}</a></li>)}
        </ul>
        <button onClick={() => window.dispatchEvent(new Event("fahri:cmd"))} className="flex items-center gap-2 text-xs text-mute border border-white/10 rounded-full px-3 py-1.5 hover:border-cyan" aria-label="Buka Command Center">
          <Search size={14} /><span className="hidden sm:inline">Cari</span><kbd className="hidden sm:inline font-mono text-[10px] opacity-70">Ctrl K</kbd>
        </button>
      </nav>
    </header>
  );
}
