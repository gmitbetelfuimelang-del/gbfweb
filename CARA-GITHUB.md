# CARA MENAMBAHKAN PROYEK INI KE GITHUB

Panduan ini khusus untuk situs GMIT Betel Fuimelang. Pilih **satu** cara:
**Cara 1** (tanpa terminal, paling mudah) atau **Cara 2** (lewat terminal, satu perintah).

---

## Persiapan: siapkan berkasnya dulu

Unduh **`gmit-betel-fuimelang-siap-unggah.zip`** dari panel, lalu:

- **Windows** → klik kanan ZIP → *Extract All…* → ingat lokasi foldernya
- **macOS** → klik dua kali ZIP

Setelah diekstrak, isi foldernya terlihat seperti ini (36 berkas, ±1,2 MB):

```
index.html          renungan.html       404.html
situs-satu-berkas.html                   robots.txt
sitemap.xml         site.webmanifest     .nojekyll
netlify.toml        vercel.json          package.json
_headers            _redirects           .gitignore
assets/  (css, js, audio, img)
scripts/ (4 skrip bantu)
.github/workflows/deploy-pages.yml
README.md  DEPLOY-CEPAT.md  ONLINE-SEKARANG.md  PANDUAN-PENGELOLA.md
```

> ⚠️ **Penting:** yang diunggah adalah **isi** folder, bukan foldernya.
> `index.html` harus berada tepat di akar repositori.

---

## CARA 1 — Lewat browser (tanpa terminal)

### Langkah 1 · Buat repositori
1. Masuk ke <https://github.com> (buat akun gratis bila belum punya).
2. Klik tombol **+** di kanan atas → **New repository**.
3. Isi:
   - **Repository name**: `gmit-betel-fuimelang`
   - **Description** *(opsional)*: `Situs profil resmi GMIT Betel Fuimelang, Kabupaten Alor, NTT`
   - Pilih **Public** *(wajib bila ingin GitHub Pages gratis)*
   - **JANGAN** centang *Add a README file*, *Add .gitignore*, atau *Choose a license*
4. Klik **Create repository**.

### Langkah 2 · Unggah berkas
1. Di halaman repositori baru, klik tautan **uploading an existing file**
   (atau buka `https://github.com/USERNAME/gmit-betel-fuimelang/upload/main`).
2. Buka folder hasil ekstrak di komputer Anda → **pilih semua isi** (Ctrl+A / Cmd+A) →
   **tarik ke halaman GitHub**.
   - Cara alternatif: tarik **folder `assets`** dan **folder `scripts`** secara terpisah,
     lalu tarik semua berkas satuan (HTML, XML, JSON, TOML, MD).
3. Tunggu sampai semua berkas selesai diunggah (ada indikator hijau).
   > Batas unggah lewat browser: **100 berkas per sekali unggah** — proyek ini hanya 36 berkas,
   > jadi aman sekali jalan.
4. Di kotak **Commit changes**, tulis: `Situs profil GMIT Betel Fuimelang`
5. Klik **Commit changes**.

### Langkah 3 · Pastikan berhasil
Buka halaman utama repo. Yang harus terlihat di daftar teratas:
`index.html`, `renungan.html`, `assets`, `scripts`, `sitemap.xml`, `robots.txt`.
Folder tersembunyi `.github` dan `.nojekyll` mungkin tidak tampil — itu normal.

### Langkah 4 · Online-kan (pilih salah satu)

**A. GitHub Pages — gratis, semua di GitHub**
1. Repo → tab **Settings** → menu kiri **Pages**
2. Bagian **Source** → pilih **GitHub Actions**
3. Buka tab **Actions** → workflow *Deploy ke GitHub Pages* berjalan otomatis (±1 menit)
4. Alamat situs: **`https://USERNAME.github.io/gmit-betel-fuimelang/`**

Karena alamatnya berada di subfolder, samakan domain di seluruh berkas agar SEO tepat.
Jalankan di folder proyek:

```bash
./scripts/set-domain.sh https://USERNAME.github.io/gmit-betel-fuimelang
```

lalu unggah ulang berkas yang berubah (`index.html`, `renungan.html`, `sitemap.xml`,
`robots.txt`) — atau pakai Cara 2 agar otomatis.

**B. Netlify — alamat lebih rapi + domain sendiri mudah**
1. <https://app.netlify.com> → **Add new site** → **Import an existing project**
2. Pilih **GitHub** → izinkan akses → pilih repo `gmit-betel-fuimelang`
3. **Build command**: *(kosongkan)* · **Publish directory**: `.` → **Deploy site**
4. Situs online di `https://<nama-acak>.netlify.app` → ganti di **Change site name**
5. Setiap kali GitHub diperbarui, situs ikut terbarui otomatis.

---

## CARA 2 — Lewat terminal (satu perintah)

Cocok bila Anda ingin memperbarui situs dengan `git push` di kemudian hari.

### Langkah 1 · Buat repositori kosong
Sama seperti Cara 1 Langkah 1: <https://github.com/new> → nama `gmit-betel-fuimelang` → **Public**
→ **Create repository** (tanpa README/gitignore/license).

### Langkah 2 · Jalankan skrip
Buka terminal di folder proyek:

- **Windows**: klik folder → ketik `cmd` di address bar → Enter (atau buka *Git Bash*)
- **macOS**: klik kanan folder → *Services* → *New Terminal at Folder*

Lalu:

```bash
bash scripts/push-ke-github.sh
```

Skrip akan bertanya:
1. **Username GitHub** → contoh: `sonya-isu`
2. **Email** dan **Nama** (sekali saja, untuk menandai commit)

Kemudian otomatis melakukan: `git init` → `commit` → pasang remote → `push` ke branch `main`.

Tanpa dialog (langsung):

```bash
bash scripts/push-ke-github.sh USERNAME gmit-betel-fuimelang
```

### Langkah 3 · Saat diminta password
GitHub **tidak menerima password akun**. Pilih salah satu:

| Cara | Langkah |
|---|---|
| **Personal Access Token** (termudah) | Buka <https://github.com/settings/tokens> → *Generate new token (classic)* → centang **repo** → *Generate* → salin token → tempel sebagai **password** di terminal |
| **SSH** | `git remote set-url origin git@github.com:USERNAME/gmit-betel-fuimelang.git` (perlu kunci SSH terpasang) |
| **GitHub CLI** | `gh auth login` lalu jalankan skrip lagi — repositori dibuat otomatis |

> 🔒 **Keamanan:** jangan pernah mengirim token/password ke siapa pun, termasuk ke asisten AI.
> Token hanya untuk dipakai di komputer Anda sendiri. Bila token bocor, segera **Revoke** di halaman token.

### Langkah 4 · Online-kan
Ikuti **Cara 1 Langkah 4** (GitHub Pages atau Netlify).

---

## Memperbarui situs setelah terhubung

| Yang diubah | Perintah |
|---|---|
| Isi situs (petugas, majelis, renungan) → `assets/js/config.js` | `git add -A && git commit -m "Perbarui data jemaat" && git push` |
| Menambah renungan baru | tambah di `config.js` → `node scripts/build-sitemap.js` → commit + push |
| Mengganti audio | timpa `assets/audio/instrumen-rohani.mp3` → commit + push |
| Memakai Cara 1 (browser) | buka berkas di GitHub → ikon pensil → ubah → **Commit changes** |

Setelah `git push`, GitHub Pages/Netlify otomatis memperbarui situs dalam ±1 menit.

---

## Masalah yang sering muncul

| Pesan / gejala | Penyebab & solusi |
|---|---|
| `remote: Repository not found` | Nama repo/username salah, atau repo belum dibuat di GitHub. Periksa URL: `git remote -v` |
| `Authentication failed` | Memakai password akun. Ganti dengan **Personal Access Token** (centang `repo`) |
| `failed to push some refs` | Repo di GitHub sudah punya berkas (mis. README). Jalankan `git pull --rebase origin main` lalu `git push` |
| `Permission denied (publickey)` | Remote masih memakai SSH tapi kunci belum terpasang → ganti ke HTTPS: `git remote set-url origin https://github.com/USERNAME/REPO.git` |
| Halaman GitHub Pages menampilkan **404** | Pastikan `index.html` ada di **akar** repo (bukan di dalam folder), dan Source sudah diset **GitHub Actions** |
| Situs tampil tanpa CSS/gambar | Folder `assets` tidak ikut terunggah. Unggah ulang folder `assets` secara utuh |
| GitHub Pages tidak jalan pada repo **Private** | Pages gratis hanya untuk repo **Public** |
| `empty ident name` saat commit | Isi identitas: `git config user.name "Nama"` dan `git config user.email "email@anda.com"` |

---

## Ringkasan cepat

```bash
# Sekali saja
bash scripts/push-ke-github.sh USERNAME gmit-betel-fuimelang

# Kemudian, setiap ada perubahan
git add -A && git commit -m "Perbarui renungan" && git push
```

Setelah repo ada, jangan lupa **Settings → Pages → Source: GitHub Actions**
lalu daftarkan sitemap di Google Search Console (lihat `DEPLOY-CEPAT.md`).
