import OfflineControls from "./OfflineControls";
import { accessibilityCopy } from "@/data/accessibility";
import { pathFor, type Locale } from "@/data/portfolio";
export default function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="site-footer shell">
      <p>© 2025–{new Date().getFullYear()} Ignatius Seto</p>
      <a href={pathFor(locale, "accessibility")}>
        {accessibilityCopy[locale].title}
      </a>
      <a href="https://github.com/iseto">GitHub</a>
      <OfflineControls locale={locale} />
    </footer>
  );
}
