import Image from "next/image";
import {
  copy,
  pathFor,
  portfolioProjects,
  type Locale,
} from "@/data/portfolio";
export default function ProjectCard({
  project,
  locale,
}: {
  project: (typeof portfolioProjects)[number];
  locale: Locale;
}) {
  const t = copy[locale];
  return (
    <article className="project-card">
      <Image
        className="project-screenshot"
        src={`/screenshots/${project.slug}.jpg`}
        alt={`${project.title} — ${locale === "de" ? "lokaler Entwicklungsstand" : locale === "id" ? "versi pengembangan lokal" : "local development version"}`}
        width={1265}
        height={712}
        sizes="(max-width: 960px) 100vw, 360px"
      />
      <div className="project-body">
        <p className="eyebrow">{t.status}</p>
        <h3>{project.title}</h3>
        <p>{project[locale].description}</p>
        <ul
          className="tags"
          aria-label={
            locale === "de"
              ? "Technologien"
              : locale === "id"
                ? "Teknologi"
                : "Technologies"
          }
        >
          {project.stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
        <a
          className="study-link"
          href={pathFor(locale, `projects/${project.slug}`)}
        >
          {t.study}
          <span className="sr-only">: {project.title}</span>
        </a>
        <div className="project-links">
          <a href={project.url}>
            {t.demo}
            <span className="sr-only">: {project.title}</span>
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
            <a href={project.repo}>
              {t.source}
              <span className="sr-only">: {project.title}</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
