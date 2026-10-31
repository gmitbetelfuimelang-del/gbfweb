# GMIT Betel Fuimelang — Situs Profil Jemaat

Situs statis siap deploy (tanpa build step, tanpa database, tanpa biaya hosting).
Semua konten ada di `index.html`; gaya di `assets/css/styles.css`; interaksi di `assets/js/app.js`.

---

## 1. Struktur proyek

```
gmit-betel/
├── index.html                  ← halaman utama (semua konten)
├── renungan.html               ← halaman arsip Renungan & Warta (URL sendiri per renungan)
├── 404.html                    ← halaman error kustom
├── situs-satu-berkas.html      ← versi 1-file (hasil build, untuk pratinjau/unggah cepat)
├── robots.txt                  ← arahan mesin pencari
├── sitemap.xml                 ← peta situs untuk Google
├── site.webmanifest            ← metadata PWA (nama, ikon, warna)
├── netlify.toml                ← konfigurasi Netlify (header, cache, redirect, 404)
├── _headers / _redirects       ← konfigurasi Netlify alternatif (drag & drop)
├── vercel.json                 ← konfigurasi Vercel
├── .github/workflows/
│   └── deploy-pages.yml        ← auto-deploy ke GitHub Pages
├── .gitignore
├── scripts/
│   ├── set-domain.sh           ← ganti domain placeholder sekali jalan
│   ├── build-sitemap.js        ← buat ulang sitemap.xml dari config.js
│   └── build-single-file.py    ← buat versi 1-file
└── assets/
    ├── css/styles.css
    ├── js/config.js            ← ★ PUSAT KONFIGURASI (edit di sini saja)
    ├── js/app.js               ← logika beranda
    ├── js/renungan.js          ← logika halaman renungan
    ├── audio/instrumen-rohani.mp3   ← GANTI dengan audio Anda
    └── img/ (og-image.jpg, favicon.svg, icon-192.png, icon-512.png, apple-touch-icon.png)
```

---

## 2. Mengganti audio dengan milik Anda

1. Siapkan berkas audio (MP3, sebaiknya **≤ 5 MB**, 96–128 kbps, mono/stereo).
2. Timpa berkas `assets/audio/instrumen-rohani.mp3` dengan berkas Anda **dengan nama yang sama**, atau
3. Bila nama berbeda, ubah di `assets/js/config.js`:

```js
audio: {
  src: "assets/audio/instrumen-rohani.mp3",  // ← ganti path di sini
  volume: 0.55,                              // 0 = senyap, 1 = paling keras
  label: "Alunan Instrumen",
  labelAktif: "Instrumen Aktif"
}
```
5. Selesai — tombol “Alunan Instrumen” di kanan bawah akan memakai audio Anda.

**Perilaku otomatis:**
- Audio **di-loop** dan baru diputar setelah pengguna menekan tombol (mematuhi kebijakan autoplay peramban).
- Bila berkas belum ada / gagal dimuat → situs otomatis beralih ke **sintesis akord himne** (Web Audio API)
  dan menampilkan notifikasi kecil. Jadi situs tidak pernah “terlihat rusak”.
- Audio berhenti otomatis saat tab berpindah (hemat kuota & baterai), lalu lanjut saat tab kembali.

> Catatan: berkas MP3 contoh yang ada sekarang adalah placeholder hasil sintesis (±96 detik).
> Silakan timpa kapan saja.

---

## 3. Mengganti domain (penting untuk SEO)

Domain placeholder saat ini: `https://gmit-betel-fuimelang.netlify.app`

Setelah situs online dan Anda tahu alamat akhirnya, jalankan **satu perintah** di folder proyek:

```bash
./scripts/set-domain.sh https://alamat-akhir-anda.com
```

Perintah ini memperbarui `canonical`, Open Graph, JSON-LD, `sitemap.xml`, `robots.txt` sekaligus.
Bila memakai Windows tanpa bash, cukup *Find & Replace* di editor: cari
`https://gmit-betel-fuimelang.netlify.app` → ganti dengan domain Anda (semua berkas).

---

## 4. Deploy — pilih salah satu

> **Paling cepat:** baca **`ONLINE-SEKARANG.md`** (3 langkah, ±5 menit) atau jalankan
> `bash deploy-sekarang.sh` untuk memeriksa proyek + membuat ZIP siap unggah.
> **Menambahkan proyek ke GitHub?** Ikuti **`CARA-GITHUB.md`** (tersedia versi tanpa terminal).

### A. Netlify (paling mudah, rekomendasi)

**Cara 1 — tanpa akun teknis (drag & drop):**
1. Buka <https://app.netlify.com/drop>.
2. Tarik **seluruh folder** `gmit-betel` ke halaman tersebut.
3. Situs langsung online dengan alamat acak, mis. `https://cerah-bunga-123.netlify.app`.
4. Masuk ke **Site configuration → Change site name** untuk mengganti menjadi
   `gmit-betel-fuimelang` → alamat menjadi `https://gmit-betel-fuimelang.netlify.app`.
5. **Domain management → Add a domain** bila ingin memakai domain sendiri (mis. `gmitbetelfuimelang.org`),
   lalu arahkan DNS: `A 75.2.60.5` dan `CNAME www → <situs>.netlify.app`. HTTPS otomatis (Let's Encrypt).

**Cara 2 — otomatis dari GitHub (setiap `git push` langsung ter-deploy):**
0. Jalankan `bash scripts/push-ke-github.sh` — satu perintah untuk init, commit, dan push
   (panduan rinci: `ONLINE-SEKARANG.md` bagian CARA B).
1. Unggah folder ini ke repositori GitHub.
2. Di Netlify: **Add new site → Import an existing project → GitHub** → pilih repo.
3. Build command: *(kosongkan)* · Publish directory: `.` → **Deploy**.
4. `netlify.toml` sudah menyiapkan header keamanan, cache aset, dan halaman 404.

### B. GitHub Pages

1. Buat repositori publik, unggah semua berkas (`git init` → commit → push).
2. **Settings → Pages → Source: GitHub Actions**.
3. Workflow `.github/workflows/deploy-pages.yml` akan berjalan otomatis pada setiap push ke `main`.
4. Alamat: `https://<username>.github.io/<nama-repo>/`.
   Karena situs berada di subfolder, **jalankan** `./scripts/set-domain.sh https://<username>.github.io/<nama-repo>`
   agar `canonical` & `sitemap` tepat.

### C. Vercel

1. Buka <https://vercel.com/new> → **Import Git Repository** (atau `vercel` CLI: `npx vercel`).
2. Framework preset: **Other** · Build command: *(kosong)* · Output directory: `.`
3. `vercel.json` sudah menyiapkan header keamanan, cache, dan redirect.
4. Tambahkan domain sendiri di **Settings → Domains** (cukup tambah TXT/CNAME sesuai petunjuk Vercel).

### D. Hosting cPanel / Niagahoster / Rumahweb (shared hosting)

1. Masuk cPanel → **File Manager** → folder `public_html`.
2. Unggah seluruh isi folder `gmit-betel` (bukan foldernya, tapi isinya), atau unggah ZIP lalu **Extract**.
3. Pastikan `index.html` berada langsung di `public_html/index.html`.
4. Aktifkan **Let's Encrypt SSL** di menu SSL/TLS Status agar situs memakai `https://`.
5. Buat file `.htaccess` bila ingin redirect HTTP→HTTPS dan URL rapi (opsional).

---

## 5. Agar terbaca di Google (SEO checklist)

Yang **sudah** dipasang di proyek ini:

- `<title>` & `<meta name="description">` yang memuat nama gereja + lokasi + kata kunci lokal.
- `lang="id"`, canonical, robots meta, geo meta (`ID-NT`).
- **Open Graph + Twitter Card** dengan gambar `assets/img/og-image.jpg` (1200×630) — tautan yang dibagikan
  ke WhatsApp/Facebook akan tampil dengan gambar, bukan tautan kosong.
- **Structured data (JSON-LD)**: `Church` (nama, alamat, telepon, email, tahun berdiri, jam ibadah,
  kanal YouTube), `WebSite`, dan `FAQPage` — memungkinkan *rich result* di Google.
- Heading hierarkis (satu `<h1>`, `<h2>` per bagian), teks alternatif gambar, `aria-*` untuk aksesibilitas.
- `sitemap.xml`, `robots.txt`, `site.webmanifest`, favicon, halaman 404 kustom.

**Langkah yang harus Anda lakukan setelah online (30 menit, sekali saja):**

1. **Google Search Console** — <https://search.google.com/search-console>
   - Tambahkan properti **Domain** (atau URL prefix), verifikasi (biasanya cukup TXT record atau file HTML).
   - Menu **Sitemaps** → kirim `sitemap.xml`.
   - Menu **URL Inspection** → tempel alamat situs → **Request indexing**.
   - Menu **Performance** akan mulai menampilkan kata kunci setelah beberapa hari.
2. **Google Business Profile** — <https://business.google.com>
   - Buat profil “GMIT Betel Fuimelang”, kategori *Gereja Protestan*, alamat Dusun II Fuimelang,
     jam ibadah Minggu 07.30, dan tautan website. Ini yang membuat gereja muncul di **Google Maps**.
   - Lokasi hasil pencarian Google Maps: salin URL **Embed** (`https://www.google.com/maps/embed?pb=…`)
     lalu ganti `src` pada `#mapTemplate` di `index.html`.
3. **Bing Webmaster Tools** — <https://www.bing.com/webmasters> (impor langsung dari Search Console).
4. **Daftarkan di direktori gereja/denominasi** (situs GMIT sinodal, daftar gereja Alor, dsb.) — tautan masuk
   (*backlink*) mempercepat peringkat.
5. **Bagikan tautan** di WhatsApp jemaat, Facebook, dan Instagram. Tautan yang benar-benar diklik/dibagikan
   mempercepat Google menemukan situs.
6. **Konsistensi NAP** — pastikan Nama, Alamat, dan Telepon sama persis di situs, Google Business Profile,
   dan media sosial.
7. **Perbarui konten mingguan** (renungan + warta). Google menyukai situs yang diperbarui; perbarui juga
   `<lastmod>` di `sitemap.xml`.

> Hasil nyata di Google biasanya muncul **beberapa hari sampai 2–4 minggu** setelah indexing diminta.
> Situs baru tidak langsung berada di halaman pertama; backlink + konten rutin adalah faktornya.

---

## 6. Pusat konfigurasi — `assets/js/config.js`

**Semua data yang perlu diperbarui ada di satu file ini.** Setelah diubah, isi situs langsung berganti
tanpa menyentuh html. Rincian langkah per langkah ada di **`PANDUAN-PENGELOLA.md`**.

| Bagian di `config.js` | Yang diatur |
|---|---|
| `audio` | berkas MP3, volume, label tombol musik |
| `prayer` | cara pengiriman formulir doa (`whatsapp` / `email` / `formspree` / `netlify`) |
| `petugas` | pengkhotbah, organis, singer, operator, tema ibadah |
| `majelis` | daftar majelis jemaat 2024–2028 (jumlah bebas) |
| `gembala` | profil singkat gembala sidang |
| `ayatHarian`, `renungan` | ayat & judul renungan yang tampil di beranda |
| `renunganList` | arsip renungan → otomatis jadi halaman `renungan.html?refleksi=…` |
| `warta` | pengumuman jemaat |
| `sosial` | tautan YouTube, Facebook, Instagram |

Yang masih manual (karena berupa berkas gambar): **foto galeri** dan **URL embed Google Maps**.

### Mengisi galeri foto

Ganti seluruh isi `<figure class="photo">` menjadi:

```html
<figure class="photo" style="margin:0">
  <img src="assets/img/foto-presbiter-2026.jpg" alt="Presbiter GMIT Betel Fuimelang periode 2024–2028" loading="lazy" />
</figure>
```

Simpan foto di `assets/img/` (ukuran ideal lebar 1200 px, < 300 KB per foto, format JPG/WebP).

### Mengaktifkan peta secara otomatis

Peta saat ini dimuat setelah tombol “Muat Peta Interaktif” ditekan (hemat kuota jemaat). Untuk memuat langsung:
hapus `<div class="map__ph">…</div>` dan tambahkan kelas `is-loaded` pada `<div class="map" id="mapBox">`.

---

## 7. Formulir doa — sudah benar-benar terkirim

Formulir kini **mengirim data**, bukan hanya menampilkan konfirmasi. Cara pengiriman dipilih di
`config.js` → `prayer.mode`:

| Mode | Yang terjadi | Persiapan |
|---|---|---|
| `"whatsapp"` *(aktif)* | Isi formulir menjadi pesan WhatsApp ke sekretariat `0851-7309-5482` | — |
| `"email"` | Aplikasi email pengunjung terbuka, ditujukan ke `gmitbetelfuimelang@gmail.com` | — |
| `"formspree"` | Terkirim ke email tanpa membuka aplikasi apa pun | Daftar gratis di formspree.io → isi `formspreeId` |
| `"netlify"` | Masuk ke dasbor **Forms** Netlify | Hosting di Netlify |

Pengaman yang sudah terpasang:
- **Validasi** nama / kategori / pokok doa / persetujuan, dengan pesan error per kolom.
- **Honeypot** `_gotcha` — kiriman bot diabaikan tanpa mengganggu pengunjung.
- **Status tombol** dinonaktifkan saat mengirim, dan pesan gagal menampilkan tautan WhatsApp sekretariat.
- **Anti dobel klik** pada tombol “Saya Mendoakan” (disimpan di `localStorage`).

## 8. Perintah harian

```bash
# pratinjau lokal (buka http://localhost:8080)
python3 -m http.server 8080

# ganti domain sekali jalan
./scripts/set-domain.sh https://domain-anda.com

# buat ulang sitemap.xml setelah menambah renungan
node scripts/build-sitemap.js

# buat ulang versi satu berkas setelah mengedit
python3 scripts/build-single-file.py
```

---

## 9. Identitas jemaat yang sudah terpasang

- **Nama**: GMIT Betel Fuimelang (Gereja Masehi Injili di Timor)
- **KMJ**: Pdt. Sonya W. Isu, S.Th. · **Sekretaris**: Dkn. Mariana Malaimani · **Bendahara**: Pnt. Apolos Maulang
- **Alamat**: Dusun II Fuimelang, Desa Lembur Tengah, Kabupaten Alor, Nusa Tenggara Timur
- **Email**: gmitbetelfuimelang@gmail.com
- **WhatsApp Sekretariat**: 0851-7309-5482
- **Moto**: “Tetapi aku dan seisi rumahku, kami akan beribadah kepada TUHAN!” — Yosua 24:15
- **Kebaktian Minggu**: 07.30 WITA
- **Perintisan**: 1958 · **Warga**: 350+ KK dalam 4 rayon
