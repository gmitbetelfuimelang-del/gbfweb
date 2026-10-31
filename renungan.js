/* ============================================================================
   HALAMAN RENUNGAN & WARTA — GMIT BETEL FUIMELANG
   Membaca data dari assets/js/config.js lalu:
   • menampilkan renungan sesuai parameter URL (?refleksi=slug)
   • membuat daftar renungan & leksionari di sidebar
   • menampilkan warta jemaat
   • menyiapkan tautan bagikan (WhatsApp) & salin tautan
   • menyuntikkan JSON-LD Article agar terbaca mesin pencari
   Tidak perlu diubah saat menambah renungan — cukup edit config.js.
   ========================================================================== */
(function () {
  "use strict";
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var CFG = window.SITE_CONFIG || {};

  /* ---------- util ---------- */
  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function fmtTanggal(iso) {
    var d = new Date(iso + "T00:00:00");
    if (isNaN(d)) return iso || "";
    return d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  }
  function slugToParam() {
    try {
      return new URLSearchParams(window.location.search).get("refleksi");
    } catch (e) { return null; }
  }

  var list = Array.isArray(CFG.renunganList) ? CFG.renunganList.slice() : [];
  list.sort(function (a, b) { return String(b.tanggal).localeCompare(String(a.tanggal)); });

  /* ---------- pilih renungan aktif ---------- */
  var wanted = slugToParam();
  var aktif = list.filter(function (r) { return r.slug === wanted; })[0] || list[0];

  var elJudul = $("#artJudul");
  if (!aktif) {
    if (elJudul) elJudul.textContent = "Belum ada renungan";
  } else {
    document.title = aktif.judul + " — Renungan GMIT Betel Fuimelang";

    // meta description & canonical per renungan (SEO)
    var desc = (aktif.ringkas || "").slice(0, 155);
    var md = $('meta[name="description"]');
    if (md) md.setAttribute("content", desc);
    var canon = $('link[rel="canonical"]');
    if (canon) canon.setAttribute("href", "https://gmit-betel-fuimelang.netlify.app/renungan.html?refleksi=" + aktif.slug);
    var ogT = document.querySelector('meta[property="og:title"]');
    if (ogT) ogT.setAttribute("content", aktif.judul + " — GMIT Betel Fuimelang");
    var ogD = document.querySelector('meta[property="og:description"]');
    if (ogD) ogD.setAttribute("content", desc);
    var ogU = document.querySelector('meta[property="og:url"]');
    if (ogU) ogU.setAttribute("content", "https://gmit-betel-fuimelang.netlify.app/renungan.html?refleksi=" + aktif.slug);

    // isi artikel
    $("#artTanggal").textContent = fmtTanggal(aktif.tanggal);
    elJudul.textContent = aktif.judul;
    $("#artNats").innerHTML = "<strong>Nats:</strong> " + esc(aktif.nats);
    $("#artAyat").textContent = aktif.ayat || "";
    $("#artRefleksi").innerHTML = (aktif.refleksi || []).map(function (p) {
      return "<p>" + esc(p) + "</p>";
    }).join("");
    $("#artPertanyaan").innerHTML = (aktif.pertanyaan || []).map(function (q) {
      return "<li>" + esc(q) + "</li>";
    }).join("");
    $("#artDoa").textContent = aktif.doa || "";
    var tagEl = $("#artTag");
    if (tagEl) tagEl.textContent = "Renungan · " + (aktif.nats || "").split(/[0-9]/)[0].trim();

    // sidebar: daftar renungan
    var listEl = $("#listRenungan");
    if (listEl) {
      listEl.innerHTML = list.map(function (r) {
        var active = r.slug === aktif.slug;
        return '<li><a href="renungan.html?refleksi=' + encodeURIComponent(r.slug) + '"' +
          (active ? ' class="is-active" aria-current="page"' : "") + ">" +
          esc(r.judul) + "<small>" + esc(r.nats) + "</small></a></li>";
      }).join("");
    }

    // sidebar: leksionari
    var bacaanEl = $("#listBacaan");
    if (bacaanEl && Array.isArray(aktif.bacaan)) {
      bacaanEl.innerHTML = aktif.bacaan.map(function (b) {
        return "<li><span>" + esc(b) + "</span></li>";
      }).join("");
    }

    // bagikan
    var shareUrl = "https://gmit-betel-fuimelang.netlify.app/renungan.html?refleksi=" + aktif.slug;
    var shareText = aktif.judul + " (" + aktif.nats + ") — " + shareUrl;
    var wa = $("#shareWa");
    if (wa) wa.setAttribute("href", "https://wa.me/?text=" + encodeURIComponent(shareText));

    // JSON-LD Article
    var ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: aktif.judul,
      description: desc,
      datePublished: aktif.tanggal,
      dateModified: aktif.tanggal,
      inLanguage: "id-ID",
      articleSection: "Renungan",
      author: { "@type": "Organization", name: "GMIT Betel Fuimelang" },
      publisher: {
        "@type": "Organization",
        name: "GMIT Betel Fuimelang",
        url: "https://gmit-betel-fuimelang.netlify.app/"
      },
      mainEntityOfPage: shareUrl,
      about: { "@type": "Thing", name: aktif.nats }
    });
    document.head.appendChild(ld);
  }

  /* ---------- warta ---------- */
  var wartaEl = $("#listWarta");
  if (wartaEl && Array.isArray(CFG.warta)) {
    var warta = CFG.warta.slice().sort(function (a, b) {
      return String(b.tanggal).localeCompare(String(a.tanggal));
    });
    wartaEl.innerHTML = warta.map(function (w) {
      return '<article class="warta-card">' +
        '<div class="bar"></div>' +
        '<span class="pill">' + esc(w.tag || "Warta") + "</span>" +
        "<h3>" + esc(w.judul) + "</h3>" +
        '<p class="small muted" style="margin:.1rem 0 .5rem">' + fmtTanggal(w.tanggal) + "</p>" +
        "<ul>" + (w.isi || []).map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul>" +
        "</article>";
    }).join("");
  }

  /* ---------- salin tautan ---------- */
  var copyBtn = $("#copyLink"), copyOk = $("#copyLinkOk");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var url = window.location.href;
      var done = function (ok) {
        if (!ok) { window.prompt("Salin tautan renungan ini:", url); return; }
        if (copyOk) {
          copyOk.classList.add("show");
          setTimeout(function () { copyOk.classList.remove("show"); }, 2200);
        }
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(function () { done(true); })
          .catch(function () { done(false); });
      } else if (typeof document.execCommand === "function") {
        var ta = document.createElement("textarea");
        ta.value = url; ta.style.position = "fixed"; ta.style.opacity = "0";
        document.body.appendChild(ta); ta.select();
        var ok = false;
        try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
        document.body.removeChild(ta);
        done(ok);
      } else { done(false); }
    });
  }

  /* ---------- header, menu, tahun ---------- */
  var tahunEl = $("#tahun");
  if (tahunEl) tahunEl.textContent = new Date().getFullYear();

  var burger = $("#burger"), nav = $("#nav");
  if (burger && nav) {
    burger.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      burger.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
    });
    $$("a", nav).forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("is-open");
        burger.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }
})();
