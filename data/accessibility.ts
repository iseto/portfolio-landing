import type { Locale } from "./portfolio";
export const accessibilityCopy = {
  en: {
    title: "Accessibility & verification",
    intro:
      "Evidence you can inspect: automated checks, dated observations, and the work that still needs human review.",
    automated: "Automated coverage",
    coverage:
      "All portfolio homepages, case studies, and this report are scanned with axe-core on desktop and mobile Chromium. Regression checks cover document language, headings, keyboard navigation, reflow, text spacing, reduced motion, internal links, and offline browsing.",
    schedule:
      "The configured workflow runs on main pushes, pull requests, and every Monday at 08:00 UTC. Reports are retained for 90 days on every run, including failures. The schedule becomes active after publication to the default branch.",
    latest: "View workflow runs and dated reports",
    manual: "Human review",
    manualText:
      "A real screen reader audit and review by people who use assistive technology are still pending. Automated results are evidence of the checks performed, not certification or full WCAG conformance.",
    scope: "Scope & limitations",
    scopeText:
      "This report covers the portfolio, not the linked apps. Screenshots show local development versions. Project-specific accessibility reports remain separate. Offline browsing serves saved pages; it cannot open external demos or guarantee fresh content.",
    feedback: "Report an accessibility barrier",
    feedbackText:
      "Please include the page, task, browser, assistive technology if used, and what prevented you from continuing. Contact me on LinkedIn or open an issue in the portfolio repository.",
    method: "Evaluation method (W3C)",
    template: "Audit template and review checklist",
    baseline: "Recorded local verification",
    baselineText:
      "14 October 2026: keyboard skip navigation and locale switching tested; desktop and mobile layouts reviewed. Latest automated evidence is attached to each workflow run.",
    securityVerification: "15 October 2026: local production-build tests passed for security headers, CSP compatibility, cache expiry, entry limits, query exclusion, clearing and offline use. These checks do not assess hosting configuration or replace a manual screen reader audit.",
    pwa: "Install & offline access",
    pwaText:
      "Use your browser’s install option where available. Visited portfolio pages and their assets can be read offline. Saved entries expire after seven days; storage is limited to 40 entries of at most 2 MiB each. Expired data is removed when the service worker next runs, not while the browser is closed. The footer’s “Clear offline data” button removes the portfolio cache; subsequent visits can save pages again. An uncached or expired page shows the multilingual fallback if that fallback is still saved. External projects require a connection. New versions activate after the previous tabs close; reconnect to refresh saved content.",
  },
  de: {
    title: "Barrierefreiheit & Überprüfung",
    intro:
      "Nachvollziehbare Nachweise: automatische Prüfungen, datierte Beobachtungen und offene manuelle Tests.",
    automated: "Automatische Prüfungen",
    coverage:
      "Alle Portfolio-Startseiten, Projektbeschreibungen und dieser Bericht werden mit axe-core in Desktop- und mobilem Chromium geprüft. Regressionstests prüfen Seitensprache, Überschriften, Tastaturbedienung, Umbruch, Textabstände, reduzierte Bewegung, interne Links und Offline-Nutzung.",
    schedule:
      "Der konfigurierte Workflow läuft bei Pushes auf main, Pull Requests und jeden Montag um 08:00 UTC. Berichte werden bei jedem Lauf einschließlich Fehlern 90 Tage gespeichert. Der Zeitplan wird nach Veröffentlichung im Standardbranch aktiv.",
    latest: "Workflow-Läufe und datierte Berichte ansehen",
    manual: "Manuelle Prüfung",
    manualText:
      "Ein Audit mit einem echten Screenreader und eine Prüfung durch Menschen, die assistive Technologien nutzen, stehen noch aus. Automatische Ergebnisse belegen einzelne Prüfungen, keine Zertifizierung oder vollständige WCAG-Konformität.",
    scope: "Umfang & Grenzen",
    scopeText:
      "Dieser Bericht betrifft das Portfolio, nicht die verlinkten Apps. Screenshots zeigen lokale Entwicklungsstände. Projektspezifische Berichte bleiben getrennt. Offline-Nutzung zeigt gespeicherte Seiten; externe Demos und aktuelle Inhalte sind damit nicht garantiert.",
    feedback: "Eine Barriere melden",
    feedbackText:
      "Bitte nennen Sie Seite, Aufgabe, Browser, gegebenenfalls assistive Technologie und das konkrete Hindernis. Schreiben Sie mir auf LinkedIn oder eröffnen Sie ein Issue im Portfolio-Repository.",
    method: "Prüfmethode (W3C)",
    template: "Auditvorlage und Prüfliste",
    baseline: "Dokumentierte lokale Prüfung",
    baselineText:
      "14. Oktober 2026: Sprunglink und Sprachwechsel getestet; Desktop- und mobile Layouts geprüft. Aktuelle automatische Nachweise liegen bei jedem Workflow-Lauf.",
    securityVerification: "15. Oktober 2026: Lokale Tests des Produktionsbuilds für Sicherheitsheader, CSP-Kompatibilität, Cache-Ablauf, Eintragsgrenzen, Ausschluss von URLs mit Suchparametern, Löschen und Offline-Nutzung waren erfolgreich. Diese Tests prüfen keine Hosting-Konfiguration und ersetzen kein manuelles Screenreader-Audit.",
    pwa: "Installation & Offline-Nutzung",
    pwaText:
      "Nutzen Sie die Installationsfunktion Ihres Browsers, sofern verfügbar. Besuchte Portfolioseiten und ihre Dateien können offline gelesen werden. Gespeicherte Einträge sind sieben Tage gültig; der Speicher ist auf 40 Einträge mit jeweils höchstens 2 MiB begrenzt. Abgelaufene Daten werden beim nächsten Ausführen des Service Workers gelöscht, nicht bei geschlossenem Browser. „Offline-Daten löschen“ im Footer entfernt den Portfolio-Cache; spätere Besuche können Seiten erneut speichern. Für nicht gespeicherte oder abgelaufene Seiten erscheint die mehrsprachige Offline-Seite, sofern diese noch gespeichert ist. Externe Projekte benötigen eine Verbindung. Neue Versionen werden nach dem Schließen alter Tabs aktiv; stellen Sie die Verbindung wieder her, um Inhalte zu aktualisieren.",
  },
  id: {
    title: "Aksesibilitas & verifikasi",
    intro:
      "Bukti yang dapat ditinjau: pemeriksaan otomatis, pengamatan bertanggal, dan hal-hal yang masih memerlukan tinjauan manusia.",
    automated: "Cakupan pemeriksaan otomatis",
    coverage:
      "Semua beranda portofolio, studi kasus, dan laporan ini dipindai dengan axe-core di Chromium desktop dan seluler. Pemeriksaan regresi mencakup bahasa halaman, judul, navigasi keyboard, aliran ulang, jarak teks, pengurangan gerakan, tautan internal, dan akses luring.",
    schedule:
      "Workflow dikonfigurasi untuk push ke main, pull request, dan setiap Senin pukul 08.00 UTC. Laporan disimpan selama 90 hari pada setiap proses, termasuk kegagalan. Jadwal aktif setelah dipublikasikan ke branch utama.",
    latest: "Lihat riwayat workflow dan laporan bertanggal",
    manual: "Tinjauan manusia",
    manualText:
      "Audit dengan pembaca layar nyata serta tinjauan oleh pengguna teknologi bantu masih menunggu pelaksanaan. Hasil otomatis menunjukkan pemeriksaan yang dilakukan, bukan sertifikasi atau kepatuhan WCAG secara menyeluruh.",
    scope: "Cakupan & keterbatasan",
    scopeText:
      "Laporan ini mencakup portofolio, bukan aplikasi yang ditautkan. Tangkapan layar menampilkan versi pengembangan lokal. Laporan aksesibilitas tiap proyek tetap terpisah. Akses luring menampilkan halaman tersimpan; demo eksternal dan konten terkini tetap membutuhkan koneksi.",
    feedback: "Laporkan hambatan aksesibilitas",
    feedbackText:
      "Sertakan halaman, tugas, browser, teknologi bantu jika digunakan, serta hambatan yang Anda alami. Hubungi saya melalui LinkedIn atau buat issue di repositori portofolio.",
    method: "Metode evaluasi (W3C)",
    template: "Templat audit dan daftar pemeriksaan",
    baseline: "Verifikasi lokal yang tercatat",
    baselineText:
      "14 Oktober 2026: tautan lompat dan pergantian bahasa diuji; tata letak desktop serta seluler ditinjau. Bukti otomatis terbaru dilampirkan pada setiap proses workflow.",
    securityVerification: "15 Oktober 2026: pengujian build produksi lokal berhasil untuk header keamanan, kompatibilitas CSP, kedaluwarsa cache, batas entri, pengecualian URL dengan parameter kueri, penghapusan, dan akses luring. Pemeriksaan ini tidak menilai konfigurasi hosting atau menggantikan audit manual dengan pembaca layar.",
    pwa: "Instalasi & akses luring",
    pwaText:
      "Gunakan opsi instalasi browser jika tersedia. Halaman portofolio yang telah dikunjungi beserta asetnya dapat dibaca tanpa koneksi. Entri tersimpan berlaku selama tujuh hari; penyimpanan dibatasi hingga 40 entri dengan ukuran maksimal 2 MiB per entri. Data kedaluwarsa dihapus saat service worker berjalan kembali, bukan saat browser ditutup. Tombol “Hapus data luring” di footer menghapus cache portofolio; kunjungan berikutnya dapat menyimpan halaman lagi. Halaman yang belum tersimpan atau kedaluwarsa menampilkan halaman luring multibahasa jika halaman cadangan tersebut masih tersimpan. Proyek eksternal memerlukan koneksi. Versi baru aktif setelah tab lama ditutup; hubungkan kembali untuk memperbarui konten tersimpan.",
  },
} satisfies Record<Locale, Record<string, string>>;
