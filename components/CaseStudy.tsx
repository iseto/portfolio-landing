import Image from "next/image";
import { notFound } from "next/navigation";
import {
  copy,
  dateLabel,
  pathFor,
  portfolioProjects,
  type Locale,
} from "@/data/portfolio";
export default function CaseStudy({
  slug,
  locale,
}: {
  slug: string;
  locale: Locale;
}) {
  const project = portfolioProjects.find((p) => p.slug === slug);
  if (!project) notFound();
  const t = copy[locale];
  const detail = project[locale];
  return (
    <article className="shell case-study">
      <a href={`${pathFor(locale)}#projects`}>{t.back}</a>
      <header className="case-header">
        <p className="eyebrow">{t.status}</p>
        <h1>{project.title}</h1>
        <p>
          {locale === "de" ? "Quellcode aktualisiert" : locale === "id" ? "Kode diperbarui" : "Source updated"}{" "}
          <time dateTime={project.sourceUpdated}>{dateLabel(locale, project.sourceUpdated)}</time>
        </p>
        <p className="hero-copy">{detail.description}</p>
        <div className="actions">
          <a className="button primary" href={project.url}>
            {t.demo}
          </a>
          {project.sourcePrivate ? (
            <span>
              {locale === "de"
                ? "Quellcode (privates Repository)"
                : locale === "id"
                  ? "Kode sumber (repositori privat)"
                  : "Source code (private repository)"}
            </span>
          ) : (
            <a className="button" href={project.repo}>
              {t.source}
            </a>
          )}
        </div>
      </header>
      <figure className="case-screenshot">
        <Image
          src={`/screenshots/${project.slug}.jpg`}
          alt={`${project.title} — ${locale === "de" ? "lokaler Entwicklungsstand" : locale === "id" ? "versi pengembangan lokal" : "local development version"}`}
          width={1265}
          height={712}
          sizes="(max-width: 900px) 100vw, 836px"
        />
        <figcaption>
          {locale === "de"
            ? "Lokaler Entwicklungsstand vom 14. Oktober 2026. Die bereitgestellte Demo kann abweichen."
            : locale === "id"
              ? "Versi pengembangan lokal, 14 Oktober 2026. Demo daring dapat berbeda."
              : "Local development version, 14 October 2026. The deployed demo may differ."}
        </figcaption>
      </figure>

      <section>
        <h2>{t.context}</h2>
        <p>{detail.context}</p>
      </section>
      <section>
        <h2>{t.existing}</h2>
        <p>{detail.description}</p>
        <ul className="tags">
          {project.stack.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2>{t.planned}</h2>
        <p>{detail.planned}</p>
      </section>
      <section>
        <h2>{t.decisions}</h2>
        <p>{detail.decisions}</p>
      </section>
      <section className="evidence-box">
        <h2>{t.audit}</h2>
        <p>{t.auditText}</p>
      </section>
      {slug === "template-editor" && (
        <section className="evidence-box">
          <h2>{t.ai}</h2>
          <p>{t.aiText}</p>
          <ol>
            {t.stages.map((s, i) => (
              <li key={s}>
                <strong>{s}.</strong> {t.stageText[i]}
              </li>
            ))}
          </ol>
        </section>
      )}
      <section>
        <h2>{t.evidence}</h2>
        <p>{t.limitations}</p>
      </section>
    </article>
  );
}
