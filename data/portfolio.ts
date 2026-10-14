import projects from "./projects.json";

export type Locale = "en" | "de" | "id";
export const reviewed = "2026-10-14";
export const notePublished = "2026-10-14";
export const pathFor = (locale: Locale, path = "") =>
  path
    ? `${locale === "en" ? "" : `/${locale}`}/${path}`
    : locale === "en"
      ? "/"
      : `/${locale}`;
export const dateLabel = (locale: Locale, date: string) =>
  new Intl.DateTimeFormat(
    locale === "de" ? "de-DE" : locale === "id" ? "id-ID" : "en-GB",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }
  ).format(new Date(`${date}T12:00:00Z`));
export const copy = {
  en: {
    role: "Frontend developer · Accessibility · Applied AI",
    headline: "Thoughtful interfaces. Built for people.",
    intro:
      "I’m Ignatius Seto. I build frontend interfaces with React, TypeScript, and web components. My focus: clear interactions, accessible experiences, and practical AI features that people can review and control.",
    work: "Explore my work",
    contact: "Connect on LinkedIn",
    nav: ["Work", "Now", "Notes", "Contact"],
    workTitle: "Selected work",
    workIntro:
      "Three projects, with room to show the decisions behind the code. Each case study separates the existing implementation from the next improvements.",
    directions: ["Frontend engineering", "Accessibility", "Applied AI"],
    directionText: [
      "Interfaces, component boundaries, and reliable states. Explore the React and web component projects below.",
      "A focus on keyboard interaction, clear feedback, and documented testing. Project audits are the next evidence to publish.",
      "The next experiment: reviewable, validated template drafts. The feature is planned; no model integration is claimed yet.",
    ],
    study: "Read case study",
    demo: "Deployed demo",
    source: "Source code",
    status: "Existing demo · expansion planned",
    now: "Now",
    nowIntro: "A small, dated view of where my work is heading.",
    focus: "Current direction",
    focusText:
      "Turn the Template Editor into a documented example of frontend engineering, accessibility, and useful AI.",
    next: "Next evidence to publish",
    nextText:
      "A baseline case study and a manual accessibility report before starting the AI-assisted drafting experiment.",
    reviewed: "Direction reviewed",
    notes: "Engineering notes",
    noteTitle: "A portfolio that shows its working",
    noteText:
      "This update introduces multilingual pages, clearer project context, and a roadmap with evidence gates. Accessibility findings and AI results will be published after testing, rather than presented as finished work.",
    noteType: "Portfolio development · Decision note",
    roadmap: "What comes next",
    roadmapIntro:
      "A sequence of small releases. Each milestone is complete when its evidence is published, not simply when its code is written.",
    stages: [
      "Document the baseline",
      "Test and improve accessibility",
      "Build reviewable AI drafts",
      "Evaluate and publish",
    ],
    stageText: [
      "Explain the editor’s user task, architecture, ownership, and limitations.",
      "Test complete keyboard and screen reader tasks; fix and retest findings.",
      "Validate structured output, show a draft preview, and require explicit application.",
      "Publish quality, latency, cost, failures, and a dated maintenance note.",
    ],
    about: "About this portfolio",
    aboutText:
      "This is a growing record of my work and learning. The project pages link to demos and source, explain planned improvements, and will accumulate dated evidence as the work develops.",
    contactTitle: "Let’s talk about useful interfaces.",
    contactText:
      "For professional conversations, connect with me on LinkedIn. For code and experiments, visit GitHub.",
    skip: "Skip to content",
    navigation: "Main navigation",
    language: "Language",
    footer: "Built to evolve. Evidence added as the work develops.",
    back: "Back to selected work",
    context: "Project context",
    existing: "Existing implementation",
    planned: "Planned improvements",
    decisions: "Decisions to document",
    evidence: "Evidence and limitations",
    limitations:
      "The project links and original technology descriptions are available below. No production outcomes, performance improvements, or completed accessibility audit are claimed on this page.",
    audit: "Accessibility testing",
    auditText:
      "Status: not yet audited for this case study. The next report will record date, browser, assistive technology, tasks, findings, fixes, and remaining limitations.",
    ai: "AI-assisted drafting · planned",
    aiText:
      "Describe a template, receive a validated draft, review the proposed changes, and choose whether to apply them. Invalid output, cancellation, provider failure, and keyboard/screen reader feedback are part of the acceptance criteria.",
  },
  de: {
    role: "Frontend-Entwickler · Barrierefreiheit · Angewandte KI",
    headline: "Durchdachte Oberflächen. Für Menschen entwickelt.",
    intro:
      "Ich bin Ignatius Seto. Ich entwickle Frontend-Oberflächen mit React, TypeScript und Web Components. Mein Fokus: klare Interaktionen, barrierefreie Nutzung und praktische KI-Funktionen, deren Ergebnisse Menschen prüfen und steuern können.",
    work: "Projekte ansehen",
    contact: "Auf LinkedIn vernetzen",
    nav: ["Projekte", "Aktuell", "Notizen", "Kontakt"],
    workTitle: "Ausgewählte Projekte",
    workIntro:
      "Drei Projekte – und die Entscheidungen hinter dem Code. Jede Projektbeschreibung unterscheidet zwischen der bestehenden Umsetzung und den geplanten Verbesserungen.",
    directions: ["Frontend-Entwicklung", "Barrierefreiheit", "Angewandte KI"],
    directionText: [
      "Oberflächen, Komponentengrenzen und verlässliche Zustände. Die React- und Web-Component-Projekte zeigen den bisherigen Stand.",
      "Mein Fokus liegt auf Tastaturbedienung, verständlichen Rückmeldungen und dokumentierten Tests. Projektaudits sind der nächste Nachweis.",
      "Das nächste Experiment: prüfbare, validierte Vorlagenentwürfe. Die Funktion ist geplant; eine Modellintegration wird noch nicht behauptet.",
    ],
    study: "Projektbeschreibung lesen",
    demo: "Bereitgestellte Demo",
    source: "Quellcode",
    status: "Demo vorhanden · Erweiterung geplant",
    now: "Aktuell",
    nowIntro: "Ein datierter Einblick in meine nächsten Schritte.",
    focus: "Aktuelle Richtung",
    focusText:
      "Den Template Editor zu einem dokumentierten Beispiel für Frontend-Entwicklung, Barrierefreiheit und sinnvolle KI weiterentwickeln.",
    next: "Nächster Nachweis",
    nextText:
      "Eine Beschreibung des Ist-Zustands und ein manueller Barrierefreiheitsbericht, bevor das Experiment mit KI-Entwürfen beginnt.",
    reviewed: "Ausrichtung überprüft",
    notes: "Entwicklungsnotizen",
    noteTitle: "Ein Portfolio, das seinen Weg zeigt",
    noteText:
      "Dieses Update führt mehrsprachige Seiten, mehr Projektkontext und einen Fahrplan mit überprüfbaren Zielen ein. Ergebnisse zur Barrierefreiheit und KI werden erst nach Tests veröffentlicht.",
    noteType: "Portfolio-Entwicklung · Entscheidungsnotiz",
    roadmap: "Die nächsten Schritte",
    roadmapIntro:
      "Eine Reihe kleiner Veröffentlichungen. Ein Meilenstein ist abgeschlossen, wenn die Nachweise veröffentlicht sind – nicht nur, wenn der Code fertig ist.",
    stages: [
      "Ist-Zustand dokumentieren",
      "Barrierefreiheit testen und verbessern",
      "Prüfbare KI-Entwürfe entwickeln",
      "Evaluieren und veröffentlichen",
    ],
    stageText: [
      "Nutzeraufgabe, Architektur, eigenen Beitrag und Grenzen des Editors erklären.",
      "Vollständige Aufgaben mit Tastatur und Screenreader testen; Fehler beheben und erneut prüfen.",
      "Strukturierte Ausgaben validieren, Entwürfe anzeigen und nur nach Bestätigung übernehmen.",
      "Qualität, Antwortzeit, Kosten, Fehlerfälle und eine datierte Wartungsnotiz veröffentlichen.",
    ],
    about: "Über dieses Portfolio",
    aboutText:
      "Hier dokumentiere ich meine Arbeit und meine Lernschritte. Die Projektseiten verlinken Demos und Quellcode, erklären geplante Verbesserungen und werden im Laufe der Entwicklung um datierte Nachweise ergänzt.",
    contactTitle: "Über hilfreiche Oberflächen sprechen.",
    contactText:
      "Für beruflichen Austausch erreichen Sie mich auf LinkedIn. Code und Experimente finden Sie auf GitHub.",
    skip: "Zum Inhalt springen",
    navigation: "Hauptnavigation",
    language: "Sprache",
    footer: "Wächst mit meiner Arbeit. Nachweise folgen mit der Entwicklung.",
    back: "Zurück zu den Projekten",
    context: "Projektkontext",
    existing: "Bestehende Umsetzung",
    planned: "Geplante Verbesserungen",
    decisions: "Zu dokumentierende Entscheidungen",
    evidence: "Nachweise und Grenzen",
    limitations:
      "Die Projektlinks und die ursprünglichen Technologiebeschreibungen stehen unten. Diese Seite behauptet keine Produktionsergebnisse, Leistungsverbesserungen oder abgeschlossenen Barrierefreiheitsaudits.",
    audit: "Tests zur Barrierefreiheit",
    auditText:
      "Status: Für diese Projektbeschreibung noch nicht auditiert. Der nächste Bericht dokumentiert Datum, Browser, assistive Technologie, Aufgaben, Befunde, Korrekturen und verbleibende Einschränkungen.",
    ai: "KI-gestützte Entwürfe · geplant",
    aiText:
      "Eine Vorlage beschreiben, einen validierten Entwurf erhalten, Änderungen prüfen und bewusst übernehmen. Ungültige Ausgaben, Abbruch, Anbieterfehler und Rückmeldungen für Tastatur und Screenreader gehören zu den Abnahmekriterien.",
  },
  id: {
    role: "Pengembang frontend · Aksesibilitas · AI terapan",
    headline: "Antarmuka yang matang. Dirancang untuk manusia.",
    intro:
      "Saya Ignatius Seto. Saya membangun antarmuka frontend dengan React, TypeScript, dan Web Components. Fokus saya: interaksi yang jelas, pengalaman yang aksesibel, serta fitur AI praktis yang hasilnya dapat ditinjau dan dikendalikan pengguna.",
    work: "Lihat proyek saya",
    contact: "Terhubung di LinkedIn",
    nav: ["Proyek", "Saat ini", "Catatan", "Kontak"],
    workTitle: "Proyek pilihan",
    workIntro:
      "Tiga proyek beserta keputusan di balik kodenya. Setiap studi kasus membedakan implementasi yang sudah ada dari perbaikan berikutnya.",
    directions: ["Pengembangan frontend", "Aksesibilitas", "AI terapan"],
    directionText: [
      "Antarmuka, batas komponen, dan status aplikasi yang andal. Jelajahi proyek React dan Web Components di bawah ini.",
      "Fokus pada navigasi keyboard, umpan balik yang jelas, dan pengujian terdokumentasi. Audit proyek menjadi bukti berikutnya yang akan diterbitkan.",
      "Eksperimen berikutnya: draf templat yang tervalidasi dan dapat ditinjau. Fitur ini masih direncanakan; integrasi model belum tersedia.",
    ],
    study: "Baca studi kasus",
    demo: "Demo daring",
    source: "Kode sumber",
    status: "Demo tersedia · pengembangan direncanakan",
    now: "Saat ini",
    nowIntro: "Ringkasan bertanggal tentang arah pekerjaan saya.",
    focus: "Fokus saat ini",
    focusText:
      "Mengembangkan Template Editor menjadi contoh terdokumentasi untuk frontend, aksesibilitas, dan AI yang bermanfaat.",
    next: "Bukti berikutnya",
    nextText:
      "Studi kasus awal dan laporan aksesibilitas manual sebelum memulai eksperimen penyusunan draf dengan AI.",
    reviewed: "Arah pekerjaan ditinjau",
    notes: "Catatan pengembangan",
    noteTitle: "Portofolio yang menunjukkan prosesnya",
    noteText:
      "Pembaruan ini menghadirkan halaman multibahasa, konteks proyek yang lebih jelas, dan rencana dengan kriteria berbasis bukti. Temuan aksesibilitas dan hasil AI akan diterbitkan setelah pengujian.",
    noteType: "Pengembangan portofolio · Catatan keputusan",
    roadmap: "Langkah berikutnya",
    roadmapIntro:
      "Serangkaian rilis kecil. Sebuah tonggak selesai ketika buktinya diterbitkan, bukan hanya ketika kodenya selesai ditulis.",
    stages: [
      "Dokumentasikan kondisi awal",
      "Uji dan tingkatkan aksesibilitas",
      "Bangun draf AI yang dapat ditinjau",
      "Evaluasi dan terbitkan",
    ],
    stageText: [
      "Jelaskan tugas pengguna, arsitektur, kontribusi pribadi, dan keterbatasan editor.",
      "Uji tugas lengkap dengan keyboard dan pembaca layar; perbaiki temuan lalu uji ulang.",
      "Validasi keluaran terstruktur, tampilkan pratinjau draf, dan minta persetujuan sebelum menerapkan.",
      "Terbitkan kualitas, waktu respons, biaya, kegagalan, dan catatan pemeliharaan bertanggal.",
    ],
    about: "Tentang portofolio ini",
    aboutText:
      "Ini adalah catatan yang terus berkembang tentang pekerjaan dan pembelajaran saya. Halaman proyek menautkan demo dan kode sumber, menjelaskan rencana perbaikan, dan akan dilengkapi bukti bertanggal seiring perkembangan pekerjaan.",
    contactTitle: "Mari membahas antarmuka yang bermanfaat.",
    contactText:
      "Untuk percakapan profesional, hubungi saya di LinkedIn. Untuk kode dan eksperimen, kunjungi GitHub.",
    skip: "Lewati ke konten",
    navigation: "Navigasi utama",
    language: "Bahasa",
    footer:
      "Berkembang bersama pekerjaan saya. Bukti ditambahkan seiring pengembangan.",
    back: "Kembali ke proyek pilihan",
    context: "Konteks proyek",
    existing: "Implementasi yang tersedia",
    planned: "Perbaikan yang direncanakan",
    decisions: "Keputusan yang perlu didokumentasikan",
    evidence: "Bukti dan keterbatasan",
    limitations:
      "Tautan proyek dan deskripsi teknologi awal tersedia di bawah. Halaman ini tidak mengklaim hasil produksi, peningkatan kinerja, atau audit aksesibilitas lengkap.",
    audit: "Pengujian aksesibilitas",
    auditText:
      "Status: belum diaudit untuk studi kasus ini. Laporan berikutnya akan mencatat tanggal, browser, teknologi bantu, tugas, temuan, perbaikan, dan keterbatasan yang tersisa.",
    ai: "Penyusunan draf dengan AI · direncanakan",
    aiText:
      "Jelaskan sebuah templat, dapatkan draf tervalidasi, tinjau perubahan, lalu pilih apakah akan menerapkannya. Keluaran tidak valid, pembatalan, kegagalan penyedia, dan umpan balik untuk keyboard serta pembaca layar termasuk dalam kriteria penerimaan.",
  },
};
const details = [
  {
    slug: "template-editor",
    stack: ["React", "TypeScript", "Vite"],
    en: {
      description:
        "A dynamic template editor built with React, TypeScript, and Vite.",
      context:
        "A project centered on editing templates. The next case study will document the actual user workflow and implementation boundaries.",
      planned:
        "Document editing and preview behavior, then improve validation, keyboard access, and recovery from errors. Add AI-assisted drafts only after the baseline is tested.",
      decisions:
        "State ownership, the template schema, preview updates, validation feedback, and the boundary between generated drafts and user-approved changes.",
    },
    de: {
      description:
        "Ein dynamischer Vorlageneditor mit React, TypeScript und Vite.",
      context:
        "Ein Projekt rund um das Bearbeiten von Vorlagen. Die nächste Projektbeschreibung dokumentiert den tatsächlichen Nutzerablauf und die Grenzen der Umsetzung.",
      planned:
        "Bearbeitung und Vorschau dokumentieren, danach Validierung, Tastaturbedienung und Fehlerbehandlung verbessern. KI-Entwürfe erst nach Tests des Ist-Zustands ergänzen.",
      decisions:
        "Zustandsverwaltung, Vorlagenschema, Vorschauaktualisierung, Validierungsfeedback und die Grenze zwischen generierten Entwürfen und bestätigten Änderungen.",
    },
  },
  {
    slug: "cineflix",
    stack: ["StencilJS", "Web Components", "TMDB API"],
    en: {
      description:
        "A movie finder web component built with StencilJS and the TMDB API.",
      context:
        "A movie-search project using a web component and an external API.",
      planned:
        "Document the component API and demonstrate loading, empty, and error states. Test the search-to-result workflow with keyboard and screen reader.",
      decisions:
        "Public properties and events, host application integration, API failures, and accessible result announcements.",
    },
    de: {
      description:
        "Eine Filmsuche als Web Component mit StencilJS und der TMDB-API.",
      context:
        "Ein Filmsuchprojekt mit einer Web Component und einer externen API.",
      planned:
        "Die Komponenten-API dokumentieren und Lade-, Leer- und Fehlerzustände zeigen. Den Weg von der Suche zum Ergebnis mit Tastatur und Screenreader testen.",
      decisions:
        "Öffentliche Eigenschaften und Events, Integration in die Host-Anwendung, API-Fehler und zugängliche Ergebnismeldungen.",
    },
  },
  {
    slug: "weather",
    stack: ["React", "TypeScript", "Open-Meteo", "PWA"],
    en: {
      description:
        "The local Atmos preview uses React, TypeScript, and Open-Meteo. The linked deployed demo is the earlier weather app.",
      context: "A weather interface backed by an external data provider.",
      planned:
        "Document responsive behavior and explore clear feedback for unavailable or stale weather data. Measure before making performance claims.",
      decisions:
        "Data freshness, API error recovery, responsive layout, and the presentation of units and weather information.",
    },
    de: {
      description:
        "Die lokale Atmos-Vorschau nutzt React, TypeScript und Open-Meteo. Die verlinkte Demo zeigt die frühere Wetter-App.",
      context: "Eine Wetteroberfläche mit Daten eines externen Anbieters.",
      planned:
        "Responsives Verhalten dokumentieren und verständliche Rückmeldungen für fehlende oder veraltete Wetterdaten entwickeln. Vor Leistungsaussagen zuerst messen.",
      decisions:
        "Datenaktualität, Fehlerbehandlung bei API-Aufrufen, responsives Layout sowie die Darstellung von Einheiten und Wetterinformationen.",
    },
  },
];
const indonesianDetails = [
  {
    description: "Editor templat dinamis dengan React, TypeScript, dan Vite.",
    context:
      "Proyek untuk menyunting templat. Studi kasus berikutnya akan mendokumentasikan alur pengguna dan batas implementasi yang sebenarnya.",
    planned:
      "Dokumentasikan penyuntingan dan pratinjau, lalu tingkatkan validasi, akses keyboard, dan pemulihan dari kesalahan. Tambahkan draf AI setelah kondisi awal diuji.",
    decisions:
      "Kepemilikan state, skema templat, pembaruan pratinjau, umpan balik validasi, dan batas antara draf AI dengan perubahan yang disetujui pengguna.",
  },
  {
    description:
      "Komponen pencarian film dengan StencilJS dan gambar dari TMDB.",
    context: "Proyek penemuan film menggunakan Web Components.",
    planned:
      "Dokumentasikan API komponen dan tunjukkan status pemuatan, hasil kosong, dan kesalahan. Uji pencarian hingga pemilihan hasil dengan keyboard dan pembaca layar.",
    decisions:
      "Properti dan event publik, integrasi aplikasi induk, kegagalan API, dan pengumuman hasil yang aksesibel.",
  },
  {
    description:
      "Pratinjau Atmos lokal menggunakan React, TypeScript, dan Open-Meteo. Demo daring yang ditautkan adalah versi aplikasi cuaca sebelumnya.",
    context:
      "Antarmuka prakiraan cuaca yang menggunakan layanan data eksternal.",
    planned:
      "Dokumentasikan perilaku responsif dan umpan balik untuk data yang tidak tersedia atau sudah lama. Ukur sebelum mengklaim peningkatan kinerja.",
    decisions:
      "Kesegaran data, pemulihan dari kesalahan API, tata letak responsif, dan penyajian satuan serta informasi cuaca.",
  },
];
export const portfolioProjects = projects.map((project, index) => ({
  ...project,
  ...details[index],
  id: indonesianDetails[index],
}));
