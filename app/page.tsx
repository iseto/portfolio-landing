import projects from "../data/projects.json";
import ProjectCard from "../components/ProjectCard";

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Ignatius’ Projects</h1>
      <p className="mb-8 text-gray-700">
        A showcase of my work in frontend development, accessibility, and modern
        tooling.
      </p>
      <div className="space-y-6">
        {projects.map((p) => (
          <ProjectCard key={p.repo} project={p} />
        ))}
      </div>
    </main>
  );
}
