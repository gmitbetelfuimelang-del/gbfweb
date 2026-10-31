# PANDUAN PENGELOLA — GMIT Betel Fuimelang

Panduan ini ditulis untuk **pengurus jemaat, bukan programmer**. Semua perubahan isi situs
dilakukan di **satu file saja**: `assets/js/config.js`.

---

## Aturan emas (3 hal yang perlu diingat)

1. Ubah **hanya teks di antara tanda kutip** `"..."`.
2. Jangan hapus tanda **koma** `,` dan tanda **kutip** `"`.
3. Setelah menyimpan: unggah ulang situs → buka halaman → tekan **Ctrl + F5** (muat ulang tanpa cache).

Bila situs tiba-tiba kosong/rusak setelah diedit, kemungkinan besar ada tanda kutip atau koma yang terhapus.
Kembalikan file `config.js` dari cadangan (selalu simpan salinan sebelum mengedit).

---

## 1. Petugas ibadah minggu ini

```js
petugas: {
  pengkhotbah: "Pdt. Yohanes Nama Lengkap, S.Th",
  organis: "Ibu Maria Fuimelang",
  singer: "Sdr. Yosua Lembur",
  operator: "Sdr. Daniel Alor",
  tema: "Hidup Berpadanan dengan Injil"
},
```

---

## 2. Majelis jemaat 2024–2028

Data yang sudah terpasang:

```js
majelis: [
  { nama: "Pdt. Sonya W. Isu, S.Th.",  jabatan: "Ketua Majelis Jemaat (KMJ)", lead: true },
  { nama: "Dkn. Mariana Malaimani",    jabatan: "Sekretaris Jemaat" },
  { nama: "Pnt. Apolos Maulang",       jabatan: "Bendahara Jemaat" },
  { nama: "[Nama Anggota Majelis]",    jabatan: "Anggota Majelis / Penatua" }
],
```

- `lead: true` → kartu berwarna emas (untuk KMJ). Hanya satu yang perlu `true`.
- Mengganti/menambah anggota: salin satu baris `{ ... },`, ubah isinya. Jumlah kartu otomatis menyesuaikan.
- Untuk mengisi **Anggota Majelis / Penatua** lainnya, ganti `"[Nama Anggota Majelis]"` dengan nama sebenarnya,
  atau hapus baris tersebut bila belum ada.

Saat mengubah daftar ini, sebaiknya samakan juga bagian profil gembala sidang:

```js
gembala: {
  nama: "Pdt. Sonya W. Isu, S.Th.",
  profil: "Pdt. Sonya W. Isu, S.Th. melayani sebagai Ketua Majelis Jemaat … [riwayat pelayanan]"
}
```

---

## 3. Menambah renungan baru (setiap minggu)

Di bagian `renunganList`, **tambahkan satu blok baru di paling atas**:

```js
{
  slug: "kasih-yang-tidak-berkesudahan",   // huruf kecil, tanpa spasi
  tanggal: "2026-11-07",                    // TTTT-BB-HH
  judul: "Kasih yang Tidak Berkesudahan",
  nats: "1 Korintus 13:1–13",
  ayat: "“Kasih itu sabar; kasih itu murah hati.”",
  ringkas: "Satu kalimat ringkas untuk deskripsi Google.",
  refleksi: [
    "Paragraf pertama…",
    "Paragraf kedua…"
  ],
  pertanyaan: [
    "Pertanyaan perenungan pertama?",
    "Pertanyaan kedua?"
  ],
  doa: "Ya Tuhan, … amin.",
  bacaan: ["1 Korintus 13:1–13", "Mazmur 103:1–8", "Yohanes 13:34–35"]
}
```

Setelah menambah renungan:

```bash
node scripts/build-sitemap.js
```

Perintah itu memperbarui `sitemap.xml` sehingga Google mengenali halaman renungan baru.

Renungan otomatis muncul di:
- halaman `renungan.html` (daftar sidebar + tautan langsung `renungan.html?refleksi=kasih-yang-tidak-berkesudahan`),
- hasil pencarian Google (dengan judul & deskripsi sendiri),
- kotak "Ayat Alkitab Hari Ini" di beranda **bila** Anda juga memperbarui bagian `ayatHarian` dan `renungan`.

---

## 4. Warta jemaat

```js
warta: [
  {
    tanggal: "2026-11-07",
    judul: "Baptisan Kudus Anak & Dewasa",
    tag: "Sakramen",
    isi: [
      "Pendaftaran dibuka sampai tanggal …",
      "Membawa fotokopi akta kelahiran."
    ]
  }
]
```

---

## 5. Mengganti audio instrumen

1. Simpan berkas MP3 Anda (idealnya < 5 MB).
2. Timpa berkas `assets/audio/instrumen-rohani.mp3`.
3. Bila nama berkas berbeda, ubah di `config.js`:

```js
audio: {
  src: "assets/audio/nama-berkas-baru.mp3",
  volume: 0.45,          // 0 = senyap, 1 = paling keras
  label: "Alunan Instrumen",
  labelAktif: "Instrumen Aktif"
}
```

Bila berkas gagal dimuat, situs otomatis memakai alunan sintesis lembut agar tidak terjadi kesalahan.

---

## 6. Formulir permohonan doa — pilih cara pengiriman

Di bagian `prayer`, ubah `mode`:

| Mode | Yang terjadi | Perlu persiapan? |
|---|---|---|
| `"whatsapp"` *(aktif sekarang)* | Isi formulir terkirim sebagai pesan WhatsApp ke sekretariat | Tidak — sudah terisi nomor 0851-7309-5482 |
| `"email"` | Aplikasi email pengunjung terbuka, ditujukan ke `gmitbetelfuimelang@gmail.com` | Tidak |
| `"formspree"` | Data masuk ke email Anda tanpa membuka aplikasi apa pun | Daftar gratis di formspree.io, lalu isi `formspreeId` |
| `"netlify"` | Data tersimpan di dasbor Netlify (bila hosting di Netlify) | Aktifkan Forms di dasbor Netlify |

Kerahasiaan tetap dijaga: pokok doa **pribadi** tidak pernah ditampilkan di situs; hanya pokok doa
yang dipilih "Tembok Doa Publik" yang muncul di halaman.

---

## 7. Media sosial

```js
sosial: {
  youtube: "https://www.youtube.com/@akun-resmi",
  facebook: "https://www.facebook.com/akun-resmi",
  instagram: "https://www.instagram.com/akun-resmi"
}
```

---

## 8. Foto galeri (masih manual)

Foto belum bisa lewat `config.js`. Caranya:

1. Simpan foto di `assets/img/` (lebar ±1200 px, ukuran < 300 KB).
2. Buka `index.html`, cari `GANTI FOTO`, lalu ganti isi salah satu `<figure class="photo">` menjadi:

```html
<figure class="photo" style="margin:0">
  <img src="assets/img/foto-presbiter-2026.jpg" alt="Presbiter GMIT Betel Fuimelang 2024–2028" loading="lazy" />
</figure>
```

---

## 9. Membagikan renungan ke jemaat

Setiap renungan punya tautan sendiri. Contoh:

```
https://gmit-betel-fuimelang.netlify.app/renungan.html?refleksi=kasih-yang-tidak-berkesudahan
```

Buka halaman itu → tekan **Bagikan ke WhatsApp** (sudah tersedia tombolnya), atau **Salin Tautan**
lalu tempel di grup jemaat. Tautan yang dibagikan akan tampil dengan judul + gambar di WhatsApp/Facebook.

---

## 10. Setelah mengubah apa pun — 3 langkah

```bash
node scripts/build-sitemap.js        # perbarui peta situs
python3 scripts/build-single-file.py # perbarui versi satu berkas (opsional)
```

Lalu unggah ulang (Netlify: tarik folder ke app.netlify.com/drop, atau `git push` bila memakai GitHub).

---

## Butuh bantuan cepat?

- Daftar perintah lengkap & cara deploy: `README.md`
- Langkah online + Google Search Console: `DEPLOY-CEPAT.md`
- Ada yang rusak setelah edit? Bandingkan `config.js` dengan contoh di dokumen ini.
