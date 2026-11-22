"use client";
import { motion } from "framer-motion";
import { profile } from "@/data/fahri-profile";
import Clock from "./Clock";
import VisitorCounter from "./VisitorCounter";
import Portrait from "./Portrait";

export default function Hero() {
  return (
    <section id="beranda" className="relative min-h-screen max-w-6xl mx-auto px-5 pt-28 pb-16 grid lg:grid-cols-[1.2fr_.8fr] gap-10 items-center">
      <div>
        <p className="font-mono text-xs text-cyan flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-cyan animate-pulse" />Sedang online di semesta digital</p>
        <h1 className="font-display font-bold leading-[0.95] tracking-tight text-5xl sm:text-7xl mt-4">MUHAMMAD<br />FAHRI</h1>
        <p className="font-display text-xl sm:text-2xl mt-4 bg-gradient-to-r from-ink to-cyan bg-clip-text text-transparent">“{profile.tagline}”</p>
        <p className="text-mute mt-4 max-w-md leading-relaxed">{profile.description}</p>
        <div className="flex flex-wrap gap-3 mt-8">
          <a href="#tentang" data-magnetic className="btn btn-primary">JELAJAHI DUNIA SAYA</a>
          <a href="#kontak" data-magnetic className="btn btn-ghost">HUBUNGI SAYA</a>
        </div>
        <div className="flex flex-wrap gap-3 mt-8 text-xs"><Clock /><VisitorCounter /></div>
      </div>
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="mx-auto w-64 sm:w-80 lg:w-full max-w-sm">
        <Portrait className="aspect-[4/5] rounded-3xl" />
      </motion.div>
    </section>
  );
}
