# Deploy Cepat — 15 Menit Sampai Online

Panduan ringkas untuk GMIT Betel Fuimelang. Detail lengkap ada di `README.md`.

---

## Langkah 0 — Ganti audio (2 menit)

1. Siapkan berkas MP3 Anda (idealnya ≤ 5 MB).
2. Ganti berkas `assets/audio/instrumen-rohani.mp3` dengan berkas Anda, **nama tetap sama**.
3. Bila nama berbeda, ubah di `assets/js/config.js` → bagian `audio.src`.
4. Tombol “Alunan Instrumen” di kanan bawah otomatis memutar audio Anda.
   Bila berkas hilang, situs beralih ke sintesis lembut (tidak pernah error).

---

## Langkah 1 — Online dalam 3 menit (Netlify Drop)

1. Buka **<https://app.netlify.com/drop>**
2. Tarik **folder `gmit-betel`** (seluruh folder) ke halaman itu.
3. Tunggu ±20 detik → situs sudah online di alamat acak.
4. Masuk **Site configuration → Change site name** → isi `gmit-betel-fuimelang`
   → alamat tetap: **https://gmit-betel-fuimelang.netlify.app**

> Ingin otomatis update setiap kali diedit? Hubungkan repositori GitHub di
> **Add new site → Import an existing project**. Build command dikosongkan,
> publish directory `.` — `netlify.toml` sudah mengurus header, cache, dan 404.

**Host lain:**
- GitHub Pages → Settings → Pages → Source: *GitHub Actions* (workflow sudah disiapkan).
- Vercel → <https://vercel.com/new> → Framework: *Other*, output `.`.
- cPanel → unggah isi folder ke `public_html`, aktifkan SSL.

---

## Langkah 2 — Samakan domain (1 menit)

Setelah tahu alamat akhirnya, jalankan dari folder proyek:

```bash
./scripts/set-domain.sh https://gmit-betel-fuimelang.netlify.app
```

Perintah ini memperbarui canonical, Open Graph, JSON-LD, `sitemap.xml`, dan `robots.txt` sekaligus.

---

## Langkah 3 — Minta Google mengindeks (10 menit)

| # | Tindakan | Tautan |
|---|---|---|
| 1 | Tambahkan properti situs, verifikasi kepemilikan | <https://search.google.com/search-console> |
| 2 | Kirim `sitemap.xml` (menu **Sitemaps**) | — |
| 3 | Menu **URL Inspection** → tempel alamat situs → **Request indexing** | — |
| 4 | Buat profil gereja agar muncul di Google Maps | <https://business.google.com> |
| 5 | Impor situs ke Bing (opsional, 1 klik) | <https://www.bing.com/webmasters> |
| 6 | Bagikan tautan ke WhatsApp jemaat, Facebook, Instagram | — |

**Setelah punya URL embed Google Maps** (dari Google Business Profile):
ganti `src` di `<template id="mapTemplate">` pada `index.html`.

---

## Langkah 4 — Rutinitas mingguan (agar peringkat naik)

- [ ] Perbarui **Renungan** (nats + refleksi) setiap minggu.
- [ ] Perbarui **Warta Jemaat** dan **Petugas Ibadah**.
- [ ] Tambahkan renungan baru di `config.js` → jalankan `node scripts/build-sitemap.js`.
- [ ] Unggah foto kegiatan terbaru ke `assets/img/` dan tampilkan di galeri.
- [ ] Bagikan tautan renungan ke media sosial jemaat (mendatangkan kunjungan + sinyal ke Google).

---

## Yang masih perlu diisi

**Cukup satu file: `assets/js/config.js`** (petugas, majelis, profil gembala, ayat & renungan,
daftar renungan, warta, media sosial, audio, mode formulir doa).
Panduan rinci: **`PANDUAN-PENGELOLA.md`**.

Masih manual karena berupa berkas gambar:
- 6 slot `<figure class="photo">` di `index.html` → isi `<img src="assets/img/…" alt="…" loading="lazy">`
- `src` peta di `#mapTemplate` → URL embed Google Maps

---

## Perintah yang sering dipakai

```bash
python3 -m http.server 8080          # pratinjau lokal → http://localhost:8080
./scripts/set-domain.sh https://…    # ganti domain sekali jalan
node scripts/build-sitemap.js        # perbarui sitemap setelah menambah renungan
python3 scripts/build-single-file.py # buat versi 1 berkas (situs-satu-berkas.html)
```

---

## Hasil yang realistis

- Situs **tayang seketika** setelah deploy.
- Muncul di pencarian Google: **beberapa hari hingga 2–4 minggu** setelah *Request indexing*.
- Untuk kata kunci “GMIT Betel Fuimelang” peluangnya besar karena nama unik.
  Untuk kata kunci umum seperti “gereja di Alor”, perlu waktu, konten rutin, dan backlink
  (daftar di situs sinodal GMIT, direktori gereja, media sosial resmi).
