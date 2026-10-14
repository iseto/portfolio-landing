import { accessibilityCopy } from "@/data/accessibility";
import { copy, pathFor, type Locale } from "@/data/portfolio";
export default function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="site-footer shell">
      <p>© {new Date().getFullYear()} Ignatius Seto</p>
      <p>{copy[locale].footer}</p>
      <a href={pathFor(locale, "accessibility")}>
        {accessibilityCopy[locale].title}
      </a>
      <a href="https://github.com/iseto">GitHub</a>
    </footer>
  );
}
