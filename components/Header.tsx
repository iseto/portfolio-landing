import LanguageSwitch from "./LanguageSwitch";
import { copy, pathFor, type Locale } from "@/data/portfolio";
export default function Header({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <a className="wordmark" href={pathFor(locale)}>
          Ignatius Seto<span aria-hidden="true">.</span>
        </a>
        <nav aria-label={t.navigation} className="main-nav">
          {["projects", "now", "notes", "contact"].map((id, index) => (
            <a key={id} href={`${pathFor(locale)}#${id}`}>
              {t.nav[index]}
            </a>
          ))}
        </nav>
        <LanguageSwitch locale={locale} />
      </div>
    </header>
  );
}
