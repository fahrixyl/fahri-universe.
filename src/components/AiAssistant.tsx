"use client";
import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Trash2, Copy, Check } from "lucide-react";

type Msg = { role: "user" | "model"; content: string };
const WELCOME = "Halo! Saya **FAHRI AI**.\n\nSaya asisten virtual Muhammad Fahri. Saya siap membantu kamu mengenal Fahri lebih dekat.\n\nSilakan tanyakan apa saja mengenai identitas, hobi, keahlian, proyek, dan media sosial Fahri.";
const QUICK = ["Siapa Muhammad Fahri?", "Apa hobi Fahri?", "Apa keahlian Fahri?", "Apa saja proyek Fahri?", "Bagaimana menghubungi Fahri?"];

function esc(s: string) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
function md(src: string) {
  const inline = (t: string) => esc(t)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(/\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/(^|\s)(https?:\/\/[^\s<]+)/g, '$1<a href="$2" target="_blank" rel="noopener noreferrer">$2</a>');
  const out: string[] = []; let list = false;
  for (const line of src.split("\n")) {
    const li = line.match(/^\s*[-*]\s+(.*)/);
    if (li) { if (!list) { out.push("<ul>"); list = true; } out.push(`<li>${inline(li[1])}</li>`); continue; }
    if (list) { out.push("</ul>"); list = false; }
    if (line.trim()) out.push(`<p>${inline(line)}</p>`);
  }
  if (list) out.push("</ul>");
  return out.join("");
}

export default function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [copied, setCopied] = useState<number | null>(null);
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => { try { const s = sessionStorage.getItem("fahri-ai"); if (s) setMsgs(JSON.parse(s)); } catch {} }, []);
  useEffect(() => { try { sessionStorage.setItem("fahri-ai", JSON.stringify(msgs.slice(-20))); } catch {} end.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, busy, open]);

  const send = async (raw: string) => {
    const content = raw.trim().slice(0, 500);
    if (!content || busy) return;
    const next: Msg[] = [...msgs, { role: "user", content }];
    setMsgs(next); setText(""); setBusy(true); setErr("");
    try {
      const r = await fetch("/api/ai/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: next.slice(-10) }) });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "FAHRI AI sedang tidak tersedia.");
      setMsgs([...next, { role: "model", content: d.reply }]);
    } catch (e) { setErr(e instanceof Error ? e.message : "Koneksi bermasalah. Coba lagi."); }
    finally { setBusy(false); }
  };
  const copy = async (c: string, i: number) => { try { await navigator.clipboard.writeText(c); setCopied(i); setTimeout(() => setCopied(null), 1500); } catch {} };

  return (
    <>
      <button onClick={() => setOpen(true)} aria-label="Buka FAHRI AI" className={`fixed right-4 bottom-4 z-50 h-14 w-14 rounded-full orb grid place-items-center ${open ? "hidden" : ""}`}>
        <MessageCircle className="text-space" />
      </button>
      {open && (
        <section role="dialog" aria-label="FAHRI AI" className="fixed z-[60] inset-0 sm:inset-auto sm:right-4 sm:bottom-4 sm:w-[24rem] sm:h-[34rem] flex flex-col bg-space/95 sm:glass sm:rounded-3xl border border-white/10 overflow-hidden">
          <header className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
            <span className="h-9 w-9 rounded-full orb" />
            <div className="flex-1 min-w-0"><p className="font-display leading-tight">FAHRI AI</p><p className="text-[11px] text-mute flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />Online · Asisten Virtual Muhammad Fahri</p></div>
            <button onClick={() => { setMsgs([]); setErr(""); }} aria-label="Hapus percakapan" className="p-2 text-mute hover:text-ink"><Trash2 size={17} /></button>
            <button onClick={() => setOpen(false)} aria-label="Tutup" className="p-2 text-mute hover:text-ink"><X size={19} /></button>
          </header>
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" aria-live="polite">
            <Bubble role="model"><div className="md" dangerouslySetInnerHTML={{ __html: md(WELCOME) }} /></Bubble>
            {msgs.length === 0 && <div className="flex flex-wrap gap-2">{QUICK.map((q) => <button key={q} onClick={() => send(q)} className="text-xs border border-cyan/30 text-cyan rounded-full px-3 py-1.5 hover:bg-cyan/10">{q}</button>)}</div>}
            {msgs.map((m, i) => (
              <Bubble key={i} role={m.role}>
                {m.role === "model" ? <><div className="md" dangerouslySetInnerHTML={{ __html: md(m.content) }} /><button onClick={() => copy(m.content, i)} aria-label="Salin jawaban" className="mt-1 text-mute hover:text-cyan">{copied === i ? <Check size={14} /> : <Copy size={14} />}</button></> : m.content}
              </Bubble>
            ))}
            {busy && <Bubble role="model"><span className="typing"><span /><span /><span /></span></Bubble>}
            {err && <p role="alert" className="text-xs text-red-300 bg-red-500/10 border border-red-400/20 rounded-xl px-3 py-2">{err}</p>}
            <div ref={end} />
          </div>
          <form onSubmit={(e) => { e.preventDefault(); send(text); }} className="p-3 border-t border-white/10 flex gap-2">
            <input value={text} onChange={(e) => setText(e.target.value)} maxLength={500} placeholder="Tulis pertanyaanmu…" aria-label="Pesan" className="flex-1 bg-navy2 rounded-full px-4 py-2.5 text-base sm:text-sm outline-none focus:ring-1 ring-cyan" />
            <button disabled={busy || !text.trim()} aria-label="Kirim" className="h-11 w-11 rounded-full bg-gradient-to-br from-electric to-cyan text-space grid place-items-center disabled:opacity-40"><Send size={18} /></button>
          </form>
        </section>
      )}
    </>
  );
}

function Bubble({ role, children }: { role: "user" | "model"; children: React.ReactNode }) {
  return <div className={`flex ${role === "user" ? "justify-end" : ""}`}><div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${role === "user" ? "bg-electric text-white rounded-br-md" : "bg-navy2 border border-white/5 rounded-bl-md"}`}>{children}</div></div>;
}
