import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { redis, redisReady } from "@/lib/redis";
import { clientIp } from "@/lib/utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const TOTAL = "fahri:visitors:total";

export async function GET() {
  if (!redisReady) return NextResponse.json({ total: null, error: "not-configured" });
  try { return NextResponse.json({ total: Number(await redis(["GET", TOTAL])) || 0 }); }
  catch { return NextResponse.json({ total: null, error: "unavailable" }); }
}

// Satu kunjungan per pengunjung per 24 jam. IP hanya dipakai sebagai hash, tidak disimpan/ditampilkan.
export async function POST(req: Request) {
  if (!redisReady) return NextResponse.json({ total: null, error: "not-configured" });
  try {
    const ua = req.headers.get("user-agent") || "";
    const id = createHash("sha256").update(`${process.env.VISITOR_SALT || "salt"}|${clientIp(req)}|${ua}`).digest("hex").slice(0, 32);
    const first = await redis(["SET", `fahri:seen:${id}`, "1", "NX", "EX", 86400]);
    if (first === "OK") await redis(["INCR", TOTAL]);
    return NextResponse.json({ total: Number(await redis(["GET", TOTAL])) || 0 });
  } catch { return NextResponse.json({ total: null, error: "unavailable" }); }
}
