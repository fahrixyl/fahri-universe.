"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Github, MessageCircle, Mail, Copy, ExternalLink, Code2 } from "lucide-react";
import { profile, hobbies } from "@/data/fahri-profile";
import { skills } from "@/data/skills";
import { projects } from "@/data/projects";
import Portrait from "./Portrait";
import { sections } from "./Nav";

function Head({ title, text }: { title: string; text?: string }) {
  return (<div className="mb-10"><h2 className="h2">{title}</h2>{text && <p className="lead">{text}</p>}</div>);
}

export function About() {
  const info = [["Nama", profile.name], ["Brand", profile.brand], ["Domain", profile.domain.replace("https://", "")], ["Fokus", "Teknologi & dunia digital"]];
  return (
    <section id="tentang" className="section grid md:grid-cols-[.7fr_1.3fr] gap-10 items-center">
      <Portrait className="aspect-square rounded-3xl max-w-xs mx-auto w-full" />
      <div>
        <Head title="Tentang Saya" text={`${profile.description} Website ini adalah semesta pribadi tempat kamu mengenal Fahri lebih dekat.`} />
        <dl className="grid grid-cols-2 gap-3">
          {info.map(([k, v]) => (
            <div key={k} className="glass glow-border rounded-2xl p-4"><dt className="text-xs text-mute">{k}</dt><dd className="font-display mt-1 break-words">{v}</dd></div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function Skills() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="keahlian" className="section">
      <Head title="Keahlian" text="Bidang teknologi yang Fahri tekuni. Ketuk kartu untuk melihat detail." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((s, i) => (
          <button key={s.title} onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} className="glass glow-border rounded-2xl p-5 text-left hover:-translate-y-1 transition-transform">
            <div className="text-3xl">{s.icon}</div>
            <h3 className="font-display text-lg mt-3">{s.title}</h3>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <p className="text-sm text-mute mt-2">{s.text}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">{s.tags.map((t) => <span key={t} className="font-mono text-[11px] text-cyan border border-cyan/30 rounded-full px-2 py-0.5">{t}</span>)}</div>
                </motion.div>
              )}
            </AnimatePresence>
            {open !== i && <p className="text-xs text-mute mt-2">Ketuk untuk detail</p>}
          </button>
        ))}
      </div>
    </section>
  );
}

export function Hobbies() {
  return (
    <section id="hobi" className="section">
      <Head title="Hobi dan Minat" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {hobbies.map((h) => (
          <div key={h.title} className="glass glow-border rounded-2xl p-5 group">
            <div className="text-4xl group-hover:scale-110 transition-transform inline-block">{h.icon}</div>
            <h3 className="font-display mt-3">{h.title}</h3>
            <p className="text-sm text-mute mt-1">{h.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Projects() {
  return (
    <section id="proyek" className="section">
      <Head title="Proyek Saya" text="Karya digital milik Fahri." />
      {projects.length === 0 ? (
        <div className="glass rounded-2xl p-8 text-center text-mute">Proyek belum ditampilkan. Pantau terus, karya baru akan hadir di sini.</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" style={{ perspective: 1000 }}>
          {projects.map((p) => <ProjectCard key={p.name} p={p} />)}
        </div>
      )}
    </section>
  );
}

function ProjectCard({ p }: { p: (typeof projects)[number] }) {
  const [t, setT] = useState({ x: 0, y: 0 });
  return (
    <div onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); setT({ x: ((e.clientY - r.top) / r.height - 0.5) * -10, y: ((e.clientX - r.left) / r.width - 0.5) * 10 }); }} onMouseLeave={() => setT({ x: 0, y: 0 })}
      style={{ transform: `rotateX(${t.x}deg) rotateY(${t.y}deg)`, transition: "transform .15s" }} className="glass glow-border rounded-2xl overflow-hidden">
      {p.image && /* eslint-disable-next-line @next/next/no-img-element */ <img src={p.image} alt={`Pratinjau ${p.name}`} className="aspect-video w-full object-cover" loading="lazy" />}
      <div className="p-5">
        <span className="font-mono text-[11px] text-cyan">{p.category}</span>
        <h3 className="font-display text-lg mt-1">{p.name}</h3>
        <p className="text-sm text-mute mt-2">{p.description}</p>
        <div className="flex flex-wrap gap-1.5 mt-3">{p.tech.map((x) => <span key={x} className="font-mono text-[11px] border border-white/10 rounded-full px-2 py-0.5">{x}</span>)}</div>
        <div className="flex gap-2 mt-4">
          {p.demo && <a className="btn btn-primary !py-2 !px-4 text-xs" href={p.demo} target="_blank" rel="noopener noreferrer"><ExternalLink size={14} />Live Demo</a>}
          {p.source && <a className="btn btn-ghost !py-2 !px-4 text-xs" href={p.source} target="_blank" rel="noopener noreferrer"><Code2 size={14} />Source Code</a>}
        </div>
      </div>
    </div>
  );
}

const socials = [
  { name: "Instagram", href: profile.instagram, icon: Camera, handle: "@fahrixyl" },
  { name: "GitHub", href: profile.github, icon: Github, handle: "fahrixyl" },
  { name: "WhatsApp", href: profile.whatsapp, icon: MessageCircle, handle: profile.whatsappNumber },
  { name: "Email", href: `mailto:${profile.email}`, icon: Mail, handle: profile.email },
];

export function Social() {
  return (
    <section id="sosial" className="section">
      <Head title="Semesta Sosial" text="Temukan Fahri di platform berikut." />
      <div className="grid sm:grid-cols-2 gap-4">
        {socials.map(({ name, href, icon: I, handle }) => (
          <a key={name} href={href} target={name === "Email" ? undefined : "_blank"} rel="noopener noreferrer" data-magnetic className="glass glow-border rounded-2xl p-5 flex items-center gap-4 hover:-translate-y-1 transition-transform">
            <span className="grid place-items-center h-12 w-12 rounded-xl bg-electric/15 text-cyan"><I size={22} /></span>
            <span className="min-w-0"><span className="block font-display">{name}</span><span className="block text-sm text-mute truncate">{handle}</span></span>
          </a>
        ))}
      </div>
    </section>
  );
}

export function Contact() {
  const [msg, setMsg] = useState("");
  const copy = async (text: string, label: string) => {
    try { await navigator.clipboard.writeText(text); setMsg(`${label} berhasil disalin. Siap ditempel ✨`); }
    catch { setMsg(`Gagal menyalin. Salin manual: ${text}`); }
    setTimeout(() => setMsg(""), 3500);
  };
  return (
    <section id="kontak" className="section">
      <Head title="Hubungi Saya" text="Punya ide, pertanyaan, atau ingin berkolaborasi? Sapa Fahri langsung." />
      <div className="flex flex-wrap gap-3">
        <a className="btn btn-primary" data-magnetic href={profile.whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} />Chat WhatsApp</a>
        <a className="btn btn-ghost" data-magnetic href={`mailto:${profile.email}`}><Mail size={18} />Kirim Email</a>
        <button className="btn btn-ghost" onClick={() => copy(profile.email, "Email")}><Copy size={16} />Salin email</button>
        <button className="btn btn-ghost" onClick={() => copy(profile.whatsappNumber, "Nomor WhatsApp")}><Copy size={16} />Salin nomor WhatsApp</button>
      </div>
      <p role="status" className="mt-4 text-sm text-cyan min-h-[1.25rem]">{msg}</p>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 mt-10 px-5 py-10 pb-28">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-sm">
        <div><p className="font-display tracking-[0.3em] text-lg">FAHRI</p><p className="text-mute mt-2">{profile.tagline}</p></div>
        <ul className="grid grid-cols-2 gap-1 text-mute">{sections.map((s) => <li key={s.id}><a className="hover:text-cyan" href={`#${s.id}`}>{s.label}</a></li>)}</ul>
        <div className="flex gap-3 text-mute">{socials.map(({ name, href, icon: I }) => <a key={name} aria-label={name} href={href} target="_blank" rel="noopener noreferrer" className="hover:text-cyan"><I size={20} /></a>)}</div>
      </div>
      <p className="max-w-6xl mx-auto mt-8 text-xs text-mute">© {new Date().getFullYear()} Muhammad Fahri · {profile.domain.replace("https://", "")}</p>
    </footer>
  );
}
