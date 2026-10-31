#!/usr/bin/env bash
# ============================================================================
# SIAPKAN PROYEK UNTUK ONLINE — GMIT BETEL FUIMELANG
#
# Jalankan:  bash deploy-sekarang.sh
#
# Skrip ini:
#   1. memeriksa kesehatan proyek (tag HTML, id, JSON-LD, aset, JS)
#   2. memperbarui sitemap.xml dari config.js
#   3. memperbarui versi satu berkas (situs-satu-berkas.html)
#   4. membuat paket ZIP siap unggah ke Netlify Drop / cPanel
#   5. mencetak langkah online + indexing Google
#
# Tidak mengunggah apa pun secara otomatis — langkah unggah tetap di tangan Anda
# karena memerlukan login akun GitHub/Netlify/hosting.
# ============================================================================
set -uo pipefail
cd "$(dirname "$0")"

BOLD=$'\033[1m'; GREEN=$'\033[32m'; YELLOW=$'\033[33m'; RED=$'\033[31m'; OFF=$'\033[0m'
step() { echo; echo "${BOLD}$1${OFF}"; }

step "1/4  Memeriksa kesehatan proyek"
if command -v node >/dev/null 2>&1; then
  node scripts/check-site.js || { echo "${RED}Pemeriksaan gagal — perbaiki dulu sebelum online.${OFF}"; exit 1; }
else
  echo "${YELLOW}Node.js tidak ditemukan — pemeriksaan dilewati (situs tetap bisa diunggah).${OFF}"
fi

step "2/4  Memperbarui sitemap.xml"
if command -v node >/dev/null 2>&1; then
  node scripts/build-sitemap.js
else
  echo "${YELLOW}Dilewati (butuh Node.js).${OFF}"
fi

step "3/4  Memperbarui versi satu berkas"
if command -v python3 >/dev/null 2>&1; then
  python3 scripts/build-single-file.py
else
  echo "${YELLOW}Dilewati (butuh Python 3).${OFF}"
fi

step "4/4  Membuat paket ZIP siap unggah"
ZIP_NAME="gmit-betel-fuimelang-siap-unggah.zip"
rm -f "$ZIP_NAME"
if command -v zip >/dev/null 2>&1; then
  zip -rq "$ZIP_NAME" . \
    -x "*.git/*" -x "node_modules/*" -x "$ZIP_NAME" -x ".DS_Store" -x "*.log"
  echo "${GREEN}Paket dibuat:${OFF} $ZIP_NAME ($(du -h "$ZIP_NAME" | cut -f1))"
else
  echo "${YELLOW}Perintah 'zip' tidak tersedia. Unggah folder ini apa adanya.${OFF}"
fi

cat <<TXT

${BOLD}════════════════════════════════════════════════════════════════${OFF}
${BOLD}SEKARANG TINGGAL 3 LANGKAH DI BROWSER (sekali saja, ±5 menit)${OFF}
${BOLD}════════════════════════════════════════════════════════════════${OFF}

${BOLD}A. PALING CEPAT — tanpa akun apa pun${OFF}
   1. Buka  https://app.netlify.com/drop
   2. Tarik SELURUH folder ini (atau file ZIP di atas) ke halaman itu
   3. Selesai — situs online dalam ±30 detik dengan alamat acak
   4. Ganti alamat: Site configuration → Change site name → ${BOLD}gmit-betel-fuimelang${OFF}
      menjadi: https://gmit-betel-fuimelang.netlify.app

${BOLD}B. INGIN TERSIMPAN DI GITHUB + AUTO-DEPLOY ${OFF}
   Perlu akun GitHub & Netlify (gratis). Di folder ini jalankan:

     git init
     git add .
     git commit -m "Situs profil GMIT Betel Fuimelang"
     git branch -M main
     git remote add origin https://github.com/USERNAME/gmit-betel-fuimelang.git
     git push -u origin main

   Lalu di Netlify: Add new site → Import an existing project → GitHub
     → pilih repo → Build command: (kosong) → Publish directory: .  → Deploy

   Setiap 'git push' berikutnya akan otomatis memperbarui situs.
   Alternatif GitHub Pages: Settings → Pages → Source: GitHub Actions
   (workflow .github/workflows/deploy-pages.yml sudah disiapkan).

${BOLD}C. SESUDAH ONLINE — agar muncul di Google${OFF}
   1. Buka https://search.google.com/search-console → tambah properti
   2. Menu Sitemaps → kirim: ${BOLD}sitemap.xml${OFF}
   3. Menu URL Inspection → tempel alamat situs → Request indexing
   4. Buat profil di https://business.google.com agar muncul di Google Maps

   Bila alamat akhirnya berbeda, samakan dulu:
     ./scripts/set-domain.sh https://alamat-akhir-anda

${BOLD}Panduan lengkap:${OFF} DEPLOY-CEPAT.md · README.md · PANDUAN-PENGELOLA.md
TXT
