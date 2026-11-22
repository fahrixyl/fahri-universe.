# FAHRI PERSONAL UNIVERSE

Next.js 14 · TypeScript · Tailwind · Framer Motion · React Three Fiber · Gemini API · PWA

## 1. Aset yang harus kamu ganti
- `public/images/fahri-portrait.jpg` → foto portrait aslimu (tanpa file ini tampil huruf "F").
- `public/audio/background-music.mp3` → musik yang kamu punya haknya (tanpa file ini player menampilkan "File audio belum tersedia").
- `src/data/projects.ts` → isi proyek aslimu (kosong = tampil "Proyek belum ditampilkan").

## 2. Jalankan lokal
```bash
cp .env.example .env.local   # isi nilainya
npm install
npm run dev
```

## 3. Deploy GRATIS (Vercel Hobby) + domain sendiri
1. Push folder ini ke repo GitHub (private boleh).
2. vercel.com → Add New → Project → pilih repo → Deploy.
3. Settings → Environment Variables, isi:
   - `GEMINI_API_KEY` (gratis: aistudio.google.com/apikey)
   - `GEMINI_MODEL` = `gemini-2.5-flash`
   - `NEXT_PUBLIC_SITE_URL` = `https://fahriofficiall.my.id`
   - `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` (upstash.com → Redis → buat database gratis → tab REST API)
   - `VISITOR_SALT` = teks acak panjang
   Lalu Deployments → Redeploy.
4. Settings → Domains → tambah `fahriofficiall.my.id` dan `www.fahriofficiall.my.id`.
5. Di panel DNS myclouden.com untuk domainmu:
   - `A` | `@` | `76.76.21.21`
   - `CNAME` | `www` | `cname.vercel-dns.com`
   (pakai nilai persis yang ditampilkan Vercel jika berbeda). Tunggu propagasi, HTTPS aktif otomatis.

Jika panel myclouden tidak menyediakan pengaturan DNS, pindahkan nameserver domain ke Cloudflare (gratis) lalu atur record di sana.

## 4. Keamanan
- API key hanya di server (`/api/ai/chat`), tidak pernah ke browser.
- Rate limit 12 pesan/menit dan 120/hari per pengunjung, pesan maks 500 karakter, riwayat maks 12 giliran.
- Riwayat chat hanya di `sessionStorage` browser, tidak disimpan di server.
- Visitor counter menyimpan hash (bukan IP), 1 hitungan per pengunjung per 24 jam.

## 5. Uji cepat setelah deploy
Buka domain → klik MASUK → tanya FAHRI AI → cek counter bertambah → coba `/halaman-ngawur` (404) → "Pasang aplikasi" (PWA).
