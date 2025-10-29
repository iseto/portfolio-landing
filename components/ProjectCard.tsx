type Project = {
  title: string;
  description: string;
  url: string;
  repo: string;
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <h2 className="text-xl font-semibold">{project.title}</h2>
      <p className="text-gray-600">{project.description}</p>
      <div className="mt-2 flex gap-4">
        <a
          href={project.url}
          target="_blank"
          className="text-blue-600 underline"
        >
          Live Demo
        </a>
        <a
          href={project.repo}
          target="_blank"
          className="text-blue-600 underline"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}
