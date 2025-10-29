export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold">Ignatius Seto</h1>
        <nav className="flex gap-6 text-gray-700">
          <a href="#projects" className="hover:text-blue-600">
            Projects
          </a>
          <a
            href="https://github.com/iseto"
            target="_blank"
            className="hover:text-blue-600"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/iseto"
            target="_blank"
            className="hover:text-blue-600"
          >
            LinkedIn
          </a>
        </nav>
      </div>
    </header>
  );
}
