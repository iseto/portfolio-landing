import { copy, notePublished, type Locale } from "./portfolio";

const securityNote = {
  en: {
    title: "Keeping offline storage bounded",
    type: "Portfolio maintenance · Security and storage",
    text: "I added browser security headers and limits to the portfolio’s offline cache: seven-day expiry, 40 entries, and a clear-data control. Expired entries are removed when the service worker next runs. Production dependency checks found no known vulnerabilities; an unpatched issue remains in development lint tooling. The behavior was verified locally. Hosting logs and manual screen reader review remain separate work.",
  },
  de: {
    title: "Offline-Speicher begrenzen",
    type: "Portfolio-Wartung · Sicherheit und Speicherung",
    text: "Ich habe Sicherheitsheader und Grenzen für den Offline-Cache ergänzt: sieben Tage Gültigkeit, 40 Einträge und eine Funktion zum Löschen. Abgelaufene Einträge werden entfernt, wenn der Service Worker das nächste Mal ausgeführt wird. Die Prüfung der Produktionsabhängigkeiten fand keine bekannten Sicherheitslücken; im Entwicklungswerkzeug für Lint-Prüfungen bleibt eine ungepatchte Schwachstelle. Das Verhalten wurde lokal geprüft. Hosting-Protokolle und die manuelle Screenreader-Prüfung sind separate Aufgaben.",
  },
  id: {
    title: "Membatasi penyimpanan luring",
    type: "Pemeliharaan portofolio · Keamanan dan penyimpanan",
    text: "Saya menambahkan header keamanan browser dan batas cache luring: masa berlaku tujuh hari, 40 entri, serta kontrol untuk menghapus data. Entri kedaluwarsa dihapus saat service worker berjalan kembali. Pemeriksaan dependensi produksi tidak menemukan kerentanan yang diketahui; satu masalah tanpa patch masih ada pada alat lint pengembangan. Perilaku ini telah diuji secara lokal. Log hosting dan tinjauan manual dengan pembaca layar tetap menjadi pekerjaan terpisah.",
  },
} satisfies Record<Locale, { title: string; type: string; text: string }>;

export const notesFor = (locale: Locale) => [
  { date: "2026-10-15", ...securityNote[locale] },
  {
    date: notePublished,
    title: copy[locale].noteTitle,
    type: copy[locale].noteType,
    text: copy[locale].noteText,
  },
];
