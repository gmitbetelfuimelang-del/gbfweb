/* ============================================================================
   PUSAT KONFIGURASI — GMIT BETEL FUIMELANG
   ----------------------------------------------------------------------------
   HANYA FILE INI yang perlu Anda ubah untuk memperbarui isi situs.
   Tidak perlu menyentuh index.html atau file lain.

   Cara pakai:
   1. Buka file ini di editor teks (Notepad / VS Code / dsb).
   2. Ganti teks di antara tanda kutip "..." saja.
   3. Simpan, lalu unggah ulang (atau commit & push bila memakai GitHub).
   4. Muat ulang halaman (Ctrl+F5) — perubahan langsung tampil.

   Tips: jangan menghapus tanda koma ( , ) dan tanda kutip ( " ).
   ========================================================================== */

window.SITE_CONFIG = {

  /* ---------------------------------------------------------------------
     1. AUDIO INSTRUMEN ROHANI
     --------------------------------------------------------------------- */
  audio: {
    // Taruh berkas MP3 Anda di folder assets/audio/ lalu tulis namanya di sini.
    src: "assets/audio/instrumen-rohani.mp3",
    volume: 0.55,          // 0.0 – 1.0  (0.55 = sedang)
    label: "Alunan Instrumen",
    labelAktif: "Instrumen Aktif"
  },

  /* ---------------------------------------------------------------------
     2. LAYANAN FORMULIR DOA
     Pilih salah satu: "email" | "formspree" | "netlify" | "whatsapp"
     ---------------------------------------------------------------------
     • "email"     → formulir membuka aplikasi email pengunjung, ditujukan ke
                     email resmi jemaat. Tidak perlu mendaftar layanan apa pun.
     • "formspree" → kiriman masuk ke email Anda. Daftar gratis di formspree.io,
                     lalu tempel kode formulir (contoh: "mzzbqkdo").
     • "netlify"   → otomatis bekerja bila situs di-hosting di Netlify dan
                     formulir sudah punya atribut netlify (lihat README).
     • "whatsapp"  → isi formulir dikirim sebagai pesan WhatsApp ke sekretariat.
                     Paling praktis untuk jemaat di Indonesia.
     --------------------------------------------------------------------- */
  prayer: {
    mode: "whatsapp",                    // ← ganti sesuai kebutuhan
    email: "gmitbetelfuimelang@gmail.com",
    formspreeId: "",                     // isi bila mode = "formspree"
    whatsapp: "6285173095482",           // format internasional tanpa tanda +
    whatsappText: "Shalom, saya mengirim permohonan doa melalui situs GMIT Betel Fuimelang."
  },

  /* ---------------------------------------------------------------------
     3. PETUGAS IBADAH MINGGU INI
     --------------------------------------------------------------------- */
  petugas: {
    pengkhotbah: "[Nama Pendeta / Pelayan Firman]",
    organis: "[Nama Organis]",
    singer: "[Nama Singer]",
    operator: "[Nama Operator]",
    tema: "[Tema Ibadah Minggu Ini]"
  },

  /* ---------------------------------------------------------------------
     4. MAJELIS JEMAAT HARIAN — periode 2024–2028
     Urutan tampil mengikuti urutan di daftar ini.
     `lead: true` membuat kartu berwarna emas (untuk KMJ).
     --------------------------------------------------------------------- */
  majelis: [
    { nama: "Pdt. Sonya W. Isu, S.Th.",  jabatan: "Ketua Majelis Jemaat (KMJ)", lead: true },
    { nama: "Dkn. Mariana Malaimani",    jabatan: "Sekretaris Jemaat" },
    { nama: "Pnt. Apolos Maulang",       jabatan: "Bendahara Jemaat" },
    { nama: "[Nama Anggota Majelis]",    jabatan: "Anggota Majelis / Penatua" }
  ],

  /* ---------------------------------------------------------------------
     5. PROFIL GEMBALA SIDANG
     --------------------------------------------------------------------- */
  gembala: {
    nama: "Pdt. Sonya W. Isu, S.Th.",
    profil: "Pdt. Sonya W. Isu, S.Th. melayani sebagai Ketua Majelis Jemaat GMIT Betel " +
            "Fuimelang periode 2024–2028, bersama Dkn. Mariana Malaimani (Sekretaris Jemaat) " +
            "dan Pnt. Apolos Maulang (Bendahara Jemaat). Pelayanan digembalakan dengan semangat " +
            "membina, mendampingi, dan menguatkan warga jemaat di Fuimelang. " +
            "[Tambahkan riwayat pelayanan, pendidikan teologi, dan tahun penugasan di sini.]"
  },

  /* ---------------------------------------------------------------------
     6. AYAT HARIAN & RENUNGAN YANG TAMPIL DI BERANDA
     --------------------------------------------------------------------- */
  ayatHarian: {
    teks: "“Segala perkara dapat kutanggung di dalam Dia yang memberi kekuatan kepadaku.”",
    ref: "Filipi 4:13"
  },

  renungan: {
    judul: "“Rumah yang Beribadah kepada TUHAN”",
    nats: "Yosua 24:14–18"
  },

  /* ---------------------------------------------------------------------
     7. DATA RENUNGAN (untuk halaman renungan.html + hasil pencarian Google)
     Tambahkan objek baru untuk renungan minggu berikutnya.
     `slug`   = alamat unik, pakai huruf kecil dan tanda minus.
     `tanggal`= format TTTT-BB-HH (dipakai untuk urutan & sitemap).
     --------------------------------------------------------------------- */
  renunganList: [
    {
      slug: "rumah-yang-beribadah-kepada-tuhan",
      tanggal: "2026-10-31",
      judul: "Rumah yang Beribadah kepada TUHAN",
      nats: "Yosua 24:14–18",
      ayat: "“Tetapi aku dan seisi rumahku, kami akan beribadah kepada TUHAN!”",
      ringkas: "Iman tidak diwariskan lewat bangunan megah, tetapi lewat keluarga yang setia berdoa dan membaca firman bersama.",
      refleksi: [
        "Ketika Yosua menutup masa kepemimpinannya, ia tidak memulai dengan program besar, melainkan dengan sebuah pertanyaan iman: “Pilihlah pada hari ini kepada siapa kamu akan beribadah.” Pertanyaan itu diarahkan kepada keluarga-keluarga Israel yang telah lama hidup dalam pergumulan.",
        "Jawaban mereka tegas: “Tetapi aku dan seisi rumahku, kami akan beribadah kepada TUHAN.” Inilah pengakuan yang menjadikan rumah bukan sekadar tempat tinggal, tetapi rumah ibadah — tempat nama Tuhan dipanggil, firman dibaca, dan kasih dipraktikkan.",
        "Di Fuimelang, pengakuan itu masih relevan. Iman tidak diwariskan melalui bangunan gereja yang megah, tetapi melalui kesetiaan keluarga yang berdoa bersama, orang tua yang mengantar anak ke Sekolah Minggu, dan jemaat yang hadir dalam persekutuan rayon. Setiap rumah dapat menjadi “Betel” — rumah Allah — ketika Kristus diberi tempat utama di dalamnya."
      ],
      pertanyaan: [
        "Kepada siapa keluarga saya benar-benar beribadah dalam keseharian — bukan hanya di hari Minggu?",
        "Kebiasaan kecil apa yang dapat saya mulai agar rumah menjadi tempat firman Tuhan dibaca bersama?",
        "Siapa di lingkungan rayon saya yang perlu didampingi dan dikuatkan minggu ini?"
      ],
      doa: "Ya Tuhan, jadikanlah rumah dan hidup kami tempat Engkau berkenan hadir. Kuatkan kami untuk setia beribadah kepada-Mu, di dalam suka maupun duka, sampai hari kesudahan. Di dalam nama Yesus Kristus, amin.",
      bacaan: ["Yosua 24:14–18", "Mazmur 84:1–7", "Filipi 4:10–13", "Matius 11:25–30"]
    }
  ],

  /* ---------------------------------------------------------------------
     8. WARTA JEMAAT (untuk halaman renungan.html)
     --------------------------------------------------------------------- */
  warta: [
    {
      tanggal: "2026-10-31",
      judul: "Baptisan Kudus Anak & Dewasa",
      tag: "Sakramen",
      isi: [
        "Pendaftaran dilayani di sekretariat jemaat.",
        "Membawa fotokopi akta kelahiran (anak) atau kartu keluarga.",
        "Calon dewasa mengikuti percakapan pelayanan dengan majelis.",
        "Pelayanan baptisan dilaksanakan pada ibadah Minggu yang ditetapkan."
      ]
    },
    {
      tanggal: "2026-10-31",
      judul: "Katekisasi & Peneguhan Sidi",
      tag: "Pembinaan Warga",
      isi: [
        "Kelas katekisasi dibuka untuk remaja dan dewasa muda.",
        "Jadwal kelas disepakati bersama pelayan katekisasi.",
        "Peneguhan Sidi dilaksanakan pada ibadah jemaat."
      ]
    },
    {
      tanggal: "2026-10-24",
      judul: "Aksi Kasih Diakonia",
      tag: "Diakonia",
      isi: [
        "Persembahan diakonia dikelola oleh majelis diakonia.",
        "Penyaluran bagi warga jemaat yang membutuhkan.",
        "Laporan penggunaan dana disampaikan dalam warta."
      ]
    }
  ],

  /* ---------------------------------------------------------------------
     9. MEDIA SOSIAL
     --------------------------------------------------------------------- */
  sosial: {
    youtube: "https://www.youtube.com/@gmitbetelfuimelang",
    facebook: "https://www.facebook.com/search/top?q=GMIT%20Betel%20Fuimelang",
    instagram: "https://www.instagram.com/explore/tags/gmitbetelfuimelang/"
  }
};
