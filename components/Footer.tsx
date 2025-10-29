export default function Footer() {
  return (
    <footer className="border-t mt-12 bg-gray-50">
      <div className="max-w-5xl mx-auto p-4 text-center text-sm text-gray-600">
        <p>© {new Date().getFullYear()} Ignatius. All rights reserved.</p>
      </div>
    </footer>
  );
}
