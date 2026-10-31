# ONLINE SEKARANG — 3 Langkah, ±5 Menit

Paket ini sudah **diperiksa dan siap unggah**. Tidak perlu install apa pun.
Pilih **satu** dari dua cara di bawah.

---

## CARA A — Paling cepat (tanpa akun, tanpa Git)

1. Buka **<https://app.netlify.com/drop>**
2. Tarik **folder `gmit-betel`** — atau berkas **`gmit-betel-fuimelang-siap-unggah.zip`** — ke halaman itu.
3. Tunggu ±30 detik. Situs **sudah online** dengan alamat acak, mis. `https://cerah-bunga-123.netlify.app`.
4. Ganti alamat agar mudah diingat:
   **Site configuration → Change site name** → isi `gmit-betel-fuimelang`
   → alamat tetap: **https://gmit-betel-fuimelang.netlify.app**
5. Buka alamat itu di HP dan laptop. Selesai.

> Ingin memakai domain sendiri (mis. `gmitbetelfuimelang.org`)? Di Netlify:
> **Domain management → Add a domain**. HTTPS otomatis aktif.

---

## CARA B — Simpan di GitHub + auto-deploy

> **Tidak bisa saya lakukan dari sini:** Arena tidak menyediakan konektor GitHub, dan saya tidak punya
> akses login ke akun Anda. Berikut cara tercepat — **satu perintah** setelah Anda siapkan repositori kosong.
> Panduan lebih rinci (termasuk cara **tanpa terminal** lewat browser): **`CARA-GITHUB.md`**.

### B1. Buat repositori kosong (1 menit)
Buka <https://github.com/new> → nama: `gmit-betel-fuimelang` → **Public** → **Create repository**
(jangan centang "Add a README", "Add .gitignore", atau license).

### B2. Jalankan satu perintah ini
Di folder proyek:

```bash
bash scripts/push-ke-github.sh
```

Skrip akan menanyakan **username GitHub** Anda (dan sekali saja: nama + email untuk commit),
lalu otomatis: `git init` → commit → pasang remote → push ke branch `main`.

Bisa juga tanpa dialog:

```bash
bash scripts/push-ke-github.sh USERNAME gmit-betel-fuimelang
# atau lewat npm:
npm run push:github
```

**Saat diminta password**, GitHub tidak menerima password akun. Gunakan salah satu:
- **Personal Access Token** → <https://github.com/settings/tokens> (centang `repo`) → tempel sebagai password; atau
- **SSH** → `git remote set-url origin git@github.com:USERNAME/gmit-betel-fuimelang.git`
- **GitHub CLI** (`gh auth login`) → bila terpasang, skrip bahkan membuat repositorinya otomatis.

> ⚠️ Jangan pernah menempelkan token/password ke dalam chat dengan saya. Token hanya untuk di komputer Anda.

### B3. Online-kan — pilih salah satu

**B3-a. GitHub Pages** (semua di GitHub, gratis)
- Repo → **Settings → Pages → Source: GitHub Actions**
- Workflow `.github/workflows/deploy-pages.yml` langsung berjalan (±1 menit).
- Alamat: `https://USERNAME.github.io/gmit-betel-fuimelang/`
- Karena ber-subfolder, samakan domain sekali:
  ```bash
  ./scripts/set-domain.sh https://USERNAME.github.io/gmit-betel-fuimelang
  ```

**B3-b. Netlify** (auto-deploy + domain lebih mudah)
- <https://app.netlify.com> → **Add new site → Import an existing project → GitHub**
- Pilih repo → Build command: **(kosongkan)** → Publish directory: `.` → **Deploy**
- Setiap `git push` berikutnya otomatis memperbarui situs.

### B4. Memperbarui situs nanti
```bash
git add -A && git commit -m "Perbarui renungan minggu ini" && git push
```

## CARA C — Hosting cPanel (Niagahoster / Rumahweb / dsb.)

1. cPanel → **File Manager** → masuk folder `public_html`
2. **Upload** berkas `gmit-betel-fuimelang-siap-unggah.zip` → klik kanan → **Extract**
3. Pastikan `index.html` berada langsung di dalam `public_html`
4. cPanel → **SSL/TLS Status** → aktifkan **Let's Encrypt** agar situs memakai `https://`

---

## Setelah online — agar muncul di Google (10 menit)

| # | Langkah | Tautan |
|---|---|---|
| 1 | Tambah properti situs & verifikasi | <https://search.google.com/search-console> |
| 2 | Menu **Sitemaps** → kirim `sitemap.xml` | — |
| 3 | Menu **URL Inspection** → tempel alamat situs → **Request indexing** | — |
| 4 | Buat profil gereja agar muncul di Google Maps | <https://business.google.com> |
| 5 | Impor situs ke Bing (opsional, 1 klik) | <https://www.bing.com/webmasters> |
| 6 | Bagikan tautan di WhatsApp jemaat, Facebook, Instagram | — |

**Penting:** bila alamat akhirnya **bukan** `https://gmit-betel-fuimelang.netlify.app`,
sinkronkan dulu seluruh berkas (canonical, sitemap, OG, JSON-LD):

```bash
./scripts/set-domain.sh https://alamat-akhir-anda
```

---

## Yang masih perlu diisi (tidak menghalangi online)

Semua di **`assets/js/config.js`**:

- `petugas` → pengkhotbah, organis, singer, operator, tema ibadah minggu ini
- `majelis` → baris `[Nama Anggota Majelis]` (tambahan penatua), bila ada
- `gembala.profil` → riwayat pelayanan / pendidikan teologi Pdt. Sonya W. Isu

Dan yang masih manual: **foto galeri** (`index.html` → cari `GANTI FOTO`) serta
**URL embed Google Maps** (`#mapTemplate`).

---

## Perintah bantu

```bash
bash deploy-sekarang.sh      # periksa + siapkan ZIP siap unggah
npm run check                # pemeriksaan kesehatan proyek
npm run build                # sitemap + versi satu berkas + pemeriksaan
./scripts/set-domain.sh URL  # samakan domain di seluruh berkas
```

**Status paket ini:** struktur HTML seimbang · JSON-LD valid · tidak ada id ganda ·
semua aset ada · 3 berkas JS valid · sitemap 9 URL · uji fungsional 40/40 lolos.
