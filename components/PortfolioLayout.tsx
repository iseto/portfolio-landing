/* eslint-disable @next/next/no-head-element -- App Router root layouts own the document head. */
import { appearanceBootstrap } from "@/lib/appearance";
import PWARegistration from "./PWARegistration";
import type { Metadata } from "next";
import Header from "./Header";
import Footer from "./Footer";
import { copy, pathFor, type Locale } from "@/data/portfolio";
export const localizedMetadata = (locale: Locale): Metadata => ({
  metadataBase: new URL("https://portfolio-landing-gamma.vercel.app"),
  title: {
    default:
      locale === "de"
        ? "Ignatius Seto — Frontend, Barrierefreiheit & KI"
        : locale === "id"
          ? "Ignatius Seto — Frontend, Aksesibilitas & AI"
          : "Ignatius Seto — Frontend, Accessibility & AI",
    template: "%s | Ignatius Seto",
  },
  description: copy[locale].intro,
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "Seto Portfolio" },
  alternates: {
    canonical: pathFor(locale),
    languages: { en: "/", de: "/de", id: "/id", "x-default": "/" },
  },
});
export default function PortfolioLayout({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: appearanceBootstrap("portfolio") }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main">
          {copy[locale].skip}
        </a>
        <Header locale={locale} />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer locale={locale} />
        <PWARegistration />
      </body>
    </html>
  );
}
