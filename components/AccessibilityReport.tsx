import { accessibilityCopy } from "@/data/accessibility";
import { copy, pathFor, type Locale } from "@/data/portfolio";
export default function AccessibilityReport({ locale }: { locale: Locale }) {
  const t = accessibilityCopy[locale];
  return (
    <article className="shell case-study">
      <a href={pathFor(locale)}>← {copy[locale].back}</a>
      <header className="case-header">
        <h1>{t.title}</h1>
        <p className="hero-copy">{t.intro}</p>
      </header>
      <section>
        <h2>{t.automated}</h2>
        <p>{t.coverage}</p>
        <p>{t.schedule}</p>
        <div className="actions">
          <a
            href="https://github.com/iseto/portfolio-landing/actions/workflows/ci.yml"
            className="button primary"
          >
            {t.latest}
          </a>
        </div>
      </section>
      <section>
        <h2>{t.baseline}</h2>
        <p>{t.baselineText}</p>
      </section>
      <section className="evidence-box">
        <h2>{t.manual}</h2>
        <p>{t.manualText}</p>
      </section>
      <section>
        <h2>{t.scope}</h2>
        <p>{t.scopeText}</p>
      </section>
      <section>
        <h2>{t.pwa}</h2>
        <p>{t.pwaText}</p>
      </section>
      <section>
        <h2>{t.feedback}</h2>
        <p>{t.feedbackText}</p>
        <div className="actions">
          <a className="button" href="https://www.linkedin.com/in/iseto">
            LinkedIn
          </a>
          <a
            className="button"
            href="https://github.com/iseto/portfolio-landing/issues"
          >
            GitHub Issues
          </a>
        </div>
      </section>
      <section>
        <h2>{t.template}</h2>
        <ul>
          <li>
            <a href="/accessibility-report-template.md" download>
              {t.template} (English, Markdown)
            </a>
          </li>
          <li>
            <a href="https://www.w3.org/WAI/test-evaluate/">{t.method}</a>
          </li>
        </ul>
      </section>
    </article>
  );
}
