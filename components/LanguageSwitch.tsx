"use client";
import { usePathname } from "next/navigation";
import { copy, pathFor, type Locale } from "@/data/portfolio";
export default function LanguageSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const base = pathname.replace(/^\/(de|id)(?=\/|$)/, "").replace(/^\//, "");
  const languages = [
    { code: "en", label: "English" },
    { code: "de", label: "Deutsch" },
    { code: "id", label: "Bahasa Indonesia" },
  ] as const;
  return (
    <nav className="languages" aria-label={copy[locale].language}>
      {languages.map(({ code, label }, index) => (
        <span className="language-item" key={code}>
          {index > 0 && (
            <span className="language-separator" aria-hidden="true">
              /
            </span>
          )}
          <a
            href={pathFor(code, base)}
            hrefLang={code}
            lang={code}
            aria-current={locale === code ? "page" : undefined}
          >
            {code.toUpperCase()}
            <span className="sr-only"> — {label}</span>
          </a>
        </span>
      ))}
    </nav>
  );
}
