import { accessibilityCopy } from "@/data/accessibility";
import ProjectCard from "./ProjectCard";
import {
  copy,
  dateLabel,
  pathFor,
  portfolioProjects,
  reviewed,
  notePublished,
  type Locale,
} from "@/data/portfolio";
export default function PortfolioHome({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <div className="shell">
      <section className="hero" aria-labelledby="intro-title">
        <p className="eyebrow">{t.role}</p>
        <h1 id="intro-title">{t.headline}</h1>
        <p className="hero-copy">{t.intro}</p>
        <div className="actions">
          <a className="button primary" href="#projects">
            {t.work}
            <span aria-hidden="true"> ↘</span>
          </a>
          <a className="button" href="https://www.linkedin.com/in/iseto">
            {t.contact}
          </a>
        </div>
        <div className="hero-mark" aria-hidden="true">
          <span>
            {"{"}
            <b>is</b>
            {"}"}
          </span>
          <small>build · test · learn</small>
        </div>
      </section>
      <section
        className="focus-grid"
        aria-label={
          locale === "de"
            ? "Schwerpunkte"
            : locale === "id"
              ? "Bidang fokus"
              : "Areas of focus"
        }
      >
        {t.directions.map((title, i) => (
          <div key={title}>
            <span className="index">0{i + 1}</span>
            <h2>{title}</h2>
            <p>{t.directionText[i]}</p>
          </div>
        ))}
      </section>
      <section id="projects" className="section" aria-labelledby="work-title">
        <div className="section-heading">
          <p className="eyebrow">01 / {t.nav[0]}</p>
          <h2 id="work-title">{t.workTitle}</h2>
          <p>{t.workIntro}</p>
        </div>
        <div className="project-grid">
          {portfolioProjects.map((p) => (
            <ProjectCard key={p.slug} project={p} locale={locale} />
          ))}
        </div>
        <p className="caption">
          {locale === "de"
            ? "Screenshots lokaler Entwicklungsstände; die bereitgestellten Demos können abweichen."
            : locale === "id"
              ? "Tangkapan layar versi pengembangan lokal; demo daring dapat berbeda."
              : "Screenshots of local development versions; deployed demos may differ."}
        </p>
      </section>
      <section
        id="now"
        className="section now-section"
        aria-labelledby="now-title"
      >
        <div>
          <p className="eyebrow">02 / {t.nav[1]}</p>
          <h2 id="now-title">{t.now}</h2>
          <p>{t.nowIntro}</p>
          <p className="date">
            {t.reviewed}:{" "}
            <time dateTime={reviewed}>{dateLabel(locale, reviewed)}</time>
          </p>
        </div>
        <div className="now-details">
          <h3>{t.focus}</h3>
          <p>{t.focusText}</p>
          <h3>{t.next}</h3>
          <p>{t.nextText}</p>
          <a href={pathFor(locale, "projects/template-editor")}>
            {t.study}
            <span aria-hidden="true"> →</span>
          </a>
        </div>
      </section>
      <section className="section" aria-labelledby="roadmap-title">
        <div className="section-heading">
          <p className="eyebrow">
            {locale === "id"
              ? "Template Editor / Rencana"
              : "Template Editor / Roadmap"}
          </p>
          <h2 id="roadmap-title">{t.roadmap}</h2>
          <p>{t.roadmapIntro}</p>
        </div>
        <ol className="milestones">
          {t.stages.map((stage, i) => (
            <li key={stage}>
              <span className="index">0{i + 1}</span>
              <h3>{stage}</h3>
              <p>{t.stageText[i]}</p>
              <span className="badge">
                {locale === "de"
                  ? "Geplant"
                  : locale === "id"
                    ? "Direncanakan"
                    : "Planned"}
              </span>
            </li>
          ))}
        </ol>
      </section>
      <section id="notes" className="section" aria-labelledby="notes-title">
        <div className="section-heading">
          <p className="eyebrow">03 / {t.nav[2]}</p>
          <h2 id="notes-title">{t.notes}</h2>
        </div>
        <article className="note">
          <div>
            <time dateTime={notePublished}>
              {dateLabel(locale, notePublished)}
            </time>
            <p className="eyebrow">{t.noteType}</p>
          </div>
          <div>
            <h3>{t.noteTitle}</h3>
            <p>{t.noteText}</p>
          </div>
        </article>
      </section>
      <section className="section about">
        <h2>{t.about}</h2>
        <div>
          <p>{t.aboutText}</p>
          <a className="study-link" href={pathFor(locale, "accessibility")}>
            {accessibilityCopy[locale].title} →
          </a>
        </div>
      </section>
      <section
        id="contact"
        className="section contact"
        aria-labelledby="contact-title"
      >
        <p className="eyebrow">04 / {t.nav[3]}</p>
        <h2 id="contact-title">{t.contactTitle}</h2>
        <p>{t.contactText}</p>
        <div className="actions">
          <a
            className="button primary"
            href="https://www.linkedin.com/in/iseto"
          >
            LinkedIn ↗
          </a>
          <a className="button" href="https://github.com/iseto">
            GitHub ↗
          </a>
        </div>
      </section>
    </div>
  );
}
