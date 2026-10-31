(function () {
  "use strict";
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* =========================================================
     0. TERAPKAN PUSAT KONFIGURASI (assets/js/config.js)
     ========================================================= */
  var CFG = window.SITE_CONFIG || {};
  function cfgGet(path) {
    return path.split(".").reduce(function (o, k) {
      return (o && typeof o === "object") ? o[k] : undefined;
    }, CFG);
  }
  function initialOf(name) {
    var clean = String(name || "").replace(/[\[\]]/g, "").trim();
    return clean ? clean.charAt(0).toUpperCase() : "•";
  }

  // teks tunggal
  $$("[data-config]").forEach(function (el) {
    var val = cfgGet(el.getAttribute("data-config"));
    if (typeof val === "string" && val.trim()) el.textContent = val;
  });

  // daftar majelis
  var majelisGrid = $("#majelisGrid");
  if (majelisGrid && Array.isArray(CFG.majelis) && CFG.majelis.length) {
    majelisGrid.innerHTML = CFG.majelis.map(function (m) {
      return '<div class="person' + (m.lead ? " person--lead" : "") + '">' +
        '<div class="person__ava">' + initialOf(m.nama) + '</div>' +
        '<b>' + (m.nama || "") + '</b>' +
        '<span>' + (m.jabatan || "") + '</span></div>';
    }).join("");
  }

  // tautan media sosial
  if (CFG.sosial) {
    var socMap = { "social--yt": "youtube", "social--fb": "facebook", "social--ig": "instagram" };
    Object.keys(socMap).forEach(function (cls) {
      var el = $("." + cls), url = CFG.sosial[socMap[cls]];
      if (el && url) el.setAttribute("href", url);
    });
  }

  // audio
  var cfgAudio = CFG.audio || {};

  /* ---------------- Tahun & tanggal ---------------- */
  var tahunEl = $("#tahun");
  if (tahunEl) tahunEl.textContent = new Date().getFullYear();
  var tglEl = $("#tanggalHariIni");
  if (tglEl) {
    tglEl.textContent = new Date().toLocaleDateString("id-ID", {
      weekday: "long", day: "numeric", month: "long", year: "numeric"
    });
  }

  /* ---------------- Header sticky shadow ---------------- */
  var header = $("#header");
  var onScroll = function () {
    header.classList.toggle("is-stuck", window.scrollY > 8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------------- Menu mobile ---------------- */
  var burger = $("#burger"), nav = $("#nav");
  var closeNav = function () {
    nav.classList.remove("is-open");
    burger.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Buka menu");
  };
  burger.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    burger.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
  });
  $$("a", nav).forEach(function (a) { a.addEventListener("click", closeNav); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeNav(); });

  /* ---------------- Active link on scroll ---------------- */
  var sections = $$("main section[id], .hero[id]");
  var navLinks = $$("a", nav);
  var setActive = function (id) {
    navLinks.forEach(function (a) {
      a.classList.toggle("is-active", a.getAttribute("href") === "#" + id);
    });
  };
  if ("IntersectionObserver" in window) {
    var navObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) setActive(en.target.id); });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    sections.forEach(function (s) { navObs.observe(s); });
  }

  /* ---------------- Reveal animation ---------------- */
  var revealEls = $$(".reveal");
  if ("IntersectionObserver" in window) {
    var revObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); revObs.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealEls.forEach(function (el) { revObs.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------------- Filter + pencarian jadwal ---------------- */
  var tabs = $$(".tab");
  var cards = $$("#schedGrid .sched-card");
  var emptyState = $("#schedEmpty");
  var searchInput = $("#jadwalSearch");
  var activeFilter = "semua";

  function applyScheduleFilter() {
    var q = (searchInput.value || "").toLowerCase().trim();
    var shown = 0;
    cards.forEach(function (card) {
      var catOk = activeFilter === "semua" || card.dataset.cat === activeFilter;
      var key = (card.dataset.key || "") + " " + card.textContent.toLowerCase();
      var qOk = !q || key.indexOf(q) !== -1;
      var show = catOk && qOk;
      card.style.display = show ? "" : "none";
      if (show) shown++;
    });
    emptyState.hidden = shown !== 0;
  }
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) {
        t.classList.remove("is-active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");
      activeFilter = tab.dataset.filter;
      applyScheduleFilter();
    });
  });
  if (searchInput) searchInput.addEventListener("input", applyScheduleFilter);

  /* ---------------- Modal Tata Ibadah ---------------- */
  var modal = $("#liturgiModal");
  var lastFocus = null;
  function openModal() {
    lastFocus = document.activeElement;
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
    var closeBtn = $(".modal__close", modal);
    if (closeBtn) closeBtn.focus();
  }
  function closeModal() {
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }
  $$("[data-open-liturgi]").forEach(function (btn) {
    btn.addEventListener("click", function (e) { e.preventDefault(); openModal(); });
  });
  $$("[data-close-modal]").forEach(function (el) { el.addEventListener("click", closeModal); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });
  var printBtn = $("#printLiturgi");
  if (printBtn) printBtn.addEventListener("click", function () { window.print(); });

  /* ---------------- Salin nats firman ---------------- */
  var copyBtn = $("#copyAyat"), copyOk = $("#copyOk");
  function legacyCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    return ok;
  }
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var text = copyBtn.dataset.copy;
      var done = function (ok) {
        if (!ok) { window.prompt("Salin nats berikut:", text); return; }
        copyOk.classList.add("show");
        copyBtn.innerHTML = copyBtn.innerHTML.replace("Salin Nats Firman", "Tersalin!");
        setTimeout(function () {
          copyOk.classList.remove("show");
          copyBtn.innerHTML = copyBtn.innerHTML.replace("Tersalin!", "Salin Nats Firman");
        }, 2200);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { done(true); }).catch(function () { done(legacyCopy(text)); });
      } else {
        done(legacyCopy(text));
      }
    });
  }

  /* ---------------- Peta (lazy load) ---------------- */
  var mapBox = $("#mapBox"), loadMap = $("#loadMap");
  if (loadMap) {
    loadMap.addEventListener("click", function () {
      var tpl = $("#mapTemplate");
      var node = tpl.content ? tpl.content.cloneNode(true) : null;
      if (node) {
        mapBox.appendChild(node);
        mapBox.classList.add("is-loaded");
      }
    });
  }

  /* ---------------- Tembok doa: tombol "Saya Mendoakan" ---------------- */
  var STORE = "gmit-betel-prayed-v1";
  var prayed = {};
  try { prayed = JSON.parse(localStorage.getItem(STORE) || "{}") || {}; } catch (e) { prayed = {}; }
  function savePrayed() {
    try { localStorage.setItem(STORE, JSON.stringify(prayed)); } catch (e) {}
  }
  $$(".pray-btn").forEach(function (btn) {
    var id = btn.dataset.pray;
    var countEl = $("[data-count]", btn);
    var base = parseInt(countEl.textContent, 10) || 0;
    if (prayed[id]) {
      btn.classList.add("is-on");
      countEl.textContent = base + 1;
    }
    btn.addEventListener("click", function () {
      var n = parseInt(countEl.textContent, 10) || 0;
      if (prayed[id]) {
        delete prayed[id];
        btn.classList.remove("is-on");
        countEl.textContent = Math.max(0, n - 1);
      } else {
        prayed[id] = true;
        btn.classList.add("is-on");
        countEl.textContent = n + 1;
      }
      savePrayed();
    });
  });
  var wallList = $("#wallList"), wallCount = $("#wallCount");
  function updateWallCount() {
    var n = $$(".wall-card", wallList).length;
    wallCount.textContent = n + " pokok doa";
  }
  updateWallCount();

  /* ---------------- Utilitas ---------------- */
  function safeScroll(el, block) {
    if (!el || typeof el.scrollIntoView !== "function") return;
    try { el.scrollIntoView({ behavior: "smooth", block: block || "center" }); } catch (e) {}
  }

  /* ---------------- Formulir permohonan doa ---------------- */
  var form = $("#prayerForm");
  var okBox = $("#formOk"), errBox = $("#formErr"), okMsg = $("#formOkMsg");
  var fields = {
    nama: { wrap: $("#f-nama"), input: $("#nama"), test: function (v) { return (v || "").trim().length >= 2; } },
    kategori: { wrap: $("#f-kategori"), input: $("#kategori"), test: function (v) { return (v || "") !== ""; } },
    pesan: { wrap: $("#f-pesan"), input: $("#pesan"), test: function (v) { return (v || "").trim().length >= 10; } },
    setuju: { wrap: $("#f-setuju"), input: $("#setuju"), test: function () { return $("#setuju").checked; } },
    kontak: { wrap: $("#f-doaKontak"), input: $("#doaKontak"), test: function (v) {
      v = v || "";
      if (!v.trim()) return true;
      return /^[0-9+\-\s()]{8,20}$/.test(v.trim()) || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
    } }
  };
  Object.keys(fields).forEach(function (k) {
    var f = fields[k];
    if (!f.input) return;
    var evt = f.input.type === "checkbox" || f.input.tagName === "SELECT" ? "change" : "input";
    f.input.addEventListener(evt, function () {
      var valid = f.test(f.input.value);
      f.wrap.classList.toggle("invalid", !valid);
      return valid;
    });
  });
  function nameInitial(str) {
    var s = (str || "").trim();
    return s ? s.charAt(0).toUpperCase() : "A";
  }
  /* ---------- Pengiriman permohonan doa sesuai mode di config.js ---------- */
  function buildLines(d) {
    return [
      "Nama: " + d.nama,
      "Kontak: " + (d.kontak || "-"),
      "Kategori: " + d.kategori,
      "Kerahasiaan: " + (d.publik ? "Tembok Doa Publik" : "Private (Majelis Doa)"),
      "",
      "Pokok Doa:",
      d.pesan,
      "",
      "Dikirim melalui situs GMIT Betel Fuimelang."
    ].join("\n");
  }

  function deliverPrayer(d) {
    var P = CFG.prayer || {};
    var mode = P.mode || "email";
    var text = buildLines(d);

    // peringatan bila konfigurasi belum lengkap (tidak menghentikan pengguna)
    if (mode === "formspree" && !P.formspreeId && window.console) {
      console.warn("[GMIT Betel] prayer.mode = \"formspree\" tetapi formspreeId masih kosong. " +
                   "Sementara memakai mode email. Isi formspreeId di assets/js/config.js.");
    }
    if (mode === "whatsapp" && !P.whatsapp && window.console) {
      console.warn("[GMIT Betel] prayer.mode = \"whatsapp\" tetapi nomor WhatsApp belum diisi di config.js.");
    }

    if (mode === "whatsapp") {
      var num = String(P.whatsapp || "").replace(/\D/g, "");
      var url = "https://wa.me/" + num + "?text=" +
        encodeURIComponent((P.whatsappText ? P.whatsappText + "\n\n" : "") + text);
      window.open(url, "_blank", "noopener");
      return Promise.resolve("WhatsApp sekretariat telah dibuka — tekan tombol kirim di aplikasi WhatsApp Anda.");
    }

    if (mode === "formspree" && P.formspreeId) {
      var fd = new FormData();
      fd.append("nama", d.nama);
      fd.append("kontak", d.kontak || "");
      fd.append("kategori", d.kategori);
      fd.append("privasi", d.publik ? "publik" : "private");
      fd.append("pesan", d.pesan);
      fd.append("_subject", "Permohonan Doa — " + d.nama);
      return fetch("https://formspree.io/f/" + P.formspreeId, {
        method: "POST", headers: { Accept: "application/json" }, body: fd
      }).then(function (r) {
        if (!r.ok) throw new Error("Kiriman gagal");
        return "Pokok doa Anda telah dikirim ke email Majelis Doa jemaat.";
      });
    }

    if (mode === "netlify") {
      var body = new URLSearchParams();
      body.append("form-name", "doa");
      body.append("nama", d.nama);
      body.append("kontak", d.kontak || "");
      body.append("kategori", d.kategori);
      body.append("privasi", d.publik ? "publik" : "private");
      body.append("pesan", d.pesan);
      return fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString()
      }).then(function (r) {
        if (!r.ok) throw new Error("Kiriman gagal");
        return "Pokok doa Anda telah diterima dan tercatat di dasbor Netlify jemaat.";
      });
    }

    // mode "email" (bawaan): buka aplikasi email pengunjung
    var subject = "Permohonan Doa — " + d.nama;
    window.location.href = "mailto:" + (P.email || "") +
      "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(text);
    return Promise.resolve("Aplikasi email Anda telah dibuka. Silakan tekan kirim untuk mengirimkan pokok doa kepada sekretariat.");
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var allValid = true;
      Object.keys(fields).forEach(function (k) {
        var f = fields[k];
        var valid = f.test(f.input.value);
        f.wrap.classList.toggle("invalid", !valid);
        if (!valid) allValid = false;
      });
      if (!allValid) {
        errBox.classList.add("show");
        okBox.classList.remove("show");
        var firstInvalid = $(".field.invalid");
        if (firstInvalid) {
          safeScroll(firstInvalid, "center");
          var inp = firstInvalid.querySelector("input,select,textarea");
          if (inp) setTimeout(function () { inp.focus({ preventScroll: true }); }, 300);
        }
        return;
      }
      errBox.classList.remove("show");

      var isPublic = (form.querySelector('input[name="privasi"]:checked') || {}).value === "public";
      var pesan = $("#pesan").value.trim();
      var nama = $("#nama").value.trim();

      if (isPublic && wallList) {
        var card = document.createElement("article");
        card.className = "wall-card";
        var id = "new" + Date.now();
        card.setAttribute("data-id", id);
        card.innerHTML =
          '<p></p>' +
          '<div class="who"><span class="ava">' + nameInitial(nama) + '</span>Anonim <time>Baru saja</time></div>' +
          '<button class="pray-btn" data-pray="' + id + '">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 20s-6.5-4.3-6.5-9.3A3.7 3.7 0 0 1 12 8.2a3.7 3.7 0 0 1 6.5 2.5c0 5-6.5 9.3-6.5 9.3Z"></path></svg>' +
          ' Saya Mendoakan <b data-count>0</b></button>';
        card.querySelector("p").textContent = pesan;
        wallList.insertBefore(card, wallList.firstChild);
        var newBtn = card.querySelector(".pray-btn");
        var newCount = card.querySelector("[data-count]");
        newBtn.addEventListener("click", function () {
          var n = parseInt(newCount.textContent, 10) || 0;
          if (newBtn.classList.toggle("is-on")) { newCount.textContent = n + 1; }
          else { newCount.textContent = Math.max(0, n - 1); }
        });
        updateWallCount();
        okMsg.textContent = "Pokok doa Anda juga telah ditampilkan di Tembok Doa Syafaat jemaat.";
      } else {
        okMsg.textContent = "Pokok doa Anda diserahkan secara privat kepada Majelis Doa jemaat.";
      }

      // honeypot: bila terisi, hentikan diam-diam (indikasi bot)
      var trap = $("#website");
      if (trap && trap.value) return;

      var submitBtn = form.querySelector('button[type="submit"]');
      var originalBtn = submitBtn ? submitBtn.innerHTML : "";
      if (submitBtn) { submitBtn.disabled = true; submitBtn.style.opacity = ".7"; }

      deliverPrayer({ nama: nama, kontak: ($("#doaKontak") ? $("#doaKontak").value.trim() : ""),
                      kategori: $("#kategori").value, pesan: pesan, publik: isPublic })
        .then(function (note) {
          okMsg.textContent = (isPublic ? "Pokok doa Anda juga ditampilkan di Tembok Doa Syafaat jemaat. " : "") + note;
          okBox.classList.add("show");
          safeScroll(okBox, "center");
          form.reset();
          $$(".field.invalid").forEach(function (f) { f.classList.remove("invalid"); });
        })
        .catch(function () {
          errBox.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16.5v.5"/></svg>' +
            '<div>Maaf, pengiriman gagal. Silakan coba lagi, atau hubungi sekretariat melalui WhatsApp <a href="https://wa.me/6285173095482" target="_blank" rel="noopener">0851-7309-5482</a>.</div>';
          errBox.classList.add("show");
          okBox.classList.remove("show");
        })
        .then(function () {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.style.opacity = ""; submitBtn.innerHTML = originalBtn; }
        });
    });
  }

  /* =========================================================
     Alunan Instrumen Rohani
     1) Utamakan berkas audio milik jemaat: assets/audio/instrumen-rohani.mp3
     2) Bila berkas belum tersedia / gagal dimuat → otomatis memakai
        sintesis akord himne (Web Audio API) sebagai cadangan.
     ========================================================= */
  var musicBtn   = $("#musicBtn");
  var musicLabel = $("#musicLabel");
  var musicIco   = $(".music__ico svg", musicBtn);

  var AUDIO_SRC   = cfgAudio.src || "assets/audio/instrumen-rohani.mp3";
  var AUDIO_VOL   = (typeof cfgAudio.volume === "number") ? cfgAudio.volume : 0.55;

  var audioEl = new Audio();
  audioEl.src = AUDIO_SRC;
  audioEl.loop = true;
  audioEl.preload = "none";
  audioEl.volume = AUDIO_VOL;

  var fileAvailable = null;   // null = belum diketahui
  var playing = false;
  var wanted  = false;
  var usingSynth = false;

  /* ---------- toast kecil untuk pesan ke pengguna ---------- */
  var toastEl = document.createElement("div");
  toastEl.className = "toast";
  toastEl.setAttribute("role", "status");
  toastEl.setAttribute("aria-live", "polite");
  document.body.appendChild(toastEl);
  var toastTimer = null;
  function toast(html, ms) {
    toastEl.innerHTML = html;
    toastEl.classList.add("show");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("show"); }, ms || 5200);
  }

  function setUIActive(on) {
    playing = on;
    musicBtn.classList.toggle("is-on", on);
    musicBtn.setAttribute("aria-pressed", String(on));
    musicLabel.textContent = on ? (cfgAudio.labelAktif || "Instrumen Aktif") : (cfgAudio.label || "Alunan Instrumen");
    musicBtn.title = on ? "Matikan alunan instrumen" : "Nyalakan alunan instrumen rohani";
    if (musicIco) {
      musicIco.innerHTML = on
        ? '<path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/>'
        : '<path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/>';
    }
  }

  /* ---------- sintesis cadangan (Web Audio API) ---------- */
  var actx = null, master = null, timer = null, step = 0;
  var PROG = [
    [146.83, 185.00, 220.00, 293.66], // D
    [110.00, 146.83, 220.00, 277.18], // A
    [123.47, 146.83, 185.00, 246.94], // Bm
    [98.00, 123.47, 146.83, 196.00],  // G
    [146.83, 185.00, 220.00, 293.66], // D
    [110.00, 146.83, 220.00, 277.18], // A
    [98.00, 123.47, 146.83, 196.00],  // G
    [146.83, 220.00, 293.66, 369.99]  // D (oktaf atas)
  ];

  function initSynth() {
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    actx = new AC();
    master = actx.createGain();
    master.gain.value = 0;
    var delay = actx.createDelay(1.2);
    delay.delayTime.value = 0.42;
    var fb = actx.createGain(); fb.gain.value = 0.28;
    var wet = actx.createGain(); wet.gain.value = 0.3;
    var lp = actx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 2600;
    master.connect(lp);
    lp.connect(actx.destination);
    lp.connect(delay);
    delay.connect(fb); fb.connect(delay);
    delay.connect(wet); wet.connect(actx.destination);
    return true;
  }

  function playChord(freqs, when, dur) {
    freqs.forEach(function (f, i) {
      var osc = actx.createOscillator();
      var g = actx.createGain();
      osc.type = i === 0 ? "sine" : "triangle";
      osc.frequency.value = f;
      var peak = i === 0 ? 0.16 : 0.075;
      var hold = Math.max(dur, 0.6) + 0.6;
      g.gain.setValueAtTime(0.0001, when);
      g.gain.exponentialRampToValueAtTime(peak, when + 1.1);
      g.gain.exponentialRampToValueAtTime(0.0001, when + hold);
      osc.connect(g); g.connect(master);
      osc.start(when);
      osc.stop(when + hold + 0.2);
    });
  }

  function scheduleLoop() {
    var chord = PROG[step % PROG.length];
    var when = actx.currentTime + 0.06;
    playChord(chord, when, 3.4);
    if (step % 2 === 0) {
      var top = chord[chord.length - 1] * 2;
      var osc = actx.createOscillator(), g = actx.createGain();
      osc.type = "sine";
      osc.frequency.value = top;
      g.gain.setValueAtTime(0.0001, when + 1.2);
      g.gain.exponentialRampToValueAtTime(0.05, when + 1.7);
      g.gain.exponentialRampToValueAtTime(0.0001, when + 3.2);
      osc.connect(g); g.connect(master);
      osc.start(when + 1.2); osc.stop(when + 3.4);
    }
    step++;
  }

  function startSynth() {
    if (!actx && !initSynth()) return false;
    if (actx.state === "suspended") actx.resume();
    usingSynth = true;
    master.gain.cancelScheduledValues(actx.currentTime);
    master.gain.setValueAtTime(master.gain.value || 0.0001, actx.currentTime);
    master.gain.exponentialRampToValueAtTime(0.42, actx.currentTime + 1.6);
    step = 0;
    scheduleLoop();
    timer = setInterval(scheduleLoop, 3800);
    return true;
  }

  function stopSynth() {
    usingSynth = false;
    if (timer) { clearInterval(timer); timer = null; }
    if (actx && master) {
      master.gain.cancelScheduledValues(actx.currentTime);
      master.gain.setValueAtTime(master.gain.value, actx.currentTime);
      master.gain.exponentialRampToValueAtTime(0.0001, actx.currentTime + 0.9);
    }
  }

  /* ---------- deteksi berkas audio (HEAD request) ---------- */
  function checkAudioFile() {
    if (fileAvailable !== null) return Promise.resolve(fileAvailable);
    if (typeof fetch !== "function" || location.protocol === "file:") {
      // file:// tidak mendukung HEAD — coba langsung memuat
      fileAvailable = true;
      return Promise.resolve(true);
    }
    return fetch(AUDIO_SRC, { method: "HEAD", cache: "no-store" })
      .then(function (r) {
        var type = (r.headers.get("content-type") || "").toLowerCase();
        fileAvailable = r.ok && type.indexOf("text/html") === -1;
        return fileAvailable;
      })
      .catch(function () { fileAvailable = false; return false; });
  }

  function playWithSynth() {
    if (startSynth()) {
      setUIActive(true);
      toast('Berkas audio belum tersedia. Alunan instrumen otomatis memakai <b>sintesis lembut</b>. Letakkan berkas MP3 Anda di <b>' + AUDIO_SRC + '</b>.', 8000);
    } else {
      toast('Peramban ini belum mendukung pemutaran audio.');
    }
  }

  function startMusic() {
    wanted = true;
    checkAudioFile().then(function (ok) {
      if (!wanted) return;
      if (!ok) { playWithSynth(); return; }
      var p = audioEl.play();
      if (p && p.then) {
        p.then(function () {
          usingSynth = false;
          setUIActive(true);
        }).catch(function () {
          // berkas ada tetapi gagal diputar (format/kodek) → cadangan synth
          playWithSynth();
        });
      } else {
        setUIActive(true);
      }
    });
  }

  function stopMusic() {
    wanted = false;
    audioEl.pause();
    stopSynth();
    setUIActive(false);
  }

  musicBtn.addEventListener("click", function () {
    if (playing) { stopMusic(); } else { startMusic(); }
  });

  // beri tahu bila berkas audio bermasalah di tengah pemutaran
  audioEl.addEventListener("error", function () {
    fileAvailable = false;
    if (wanted && !usingSynth) {
      stopSynth();
      playWithSynth();
    }
  });

  // hemat baterai: jeda saat tab tidak aktif, lanjutkan saat kembali
  document.addEventListener("visibilitychange", function () {
    if (!playing) return;
    if (document.hidden) {
      if (!usingSynth) audioEl.pause();
      else if (actx && actx.state === "running") actx.suspend();
    } else {
      if (!usingSynth) { var pr = audioEl.play(); if (pr && pr.catch) pr.catch(function () {}); }
      else if (actx && actx.state === "suspended") actx.resume();
    }
  });
})();
