export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Welcome to Your Next.js App
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
          Built with TypeScript and Tailwind CSS — fast, type-safe, and
          beautiful.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            Get Started
          </button>
          <a
            href="/about"
            className="px-6 py-3 bg-white text-gray-700 border border-gray-300 font-medium rounded-lg hover:bg-gray-50 transition"
          >
            Learn More
          </a>
        </div>
      </main>
      <section className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              TypeScript
            </h2>
            <p className="text-gray-600">Catches errors before runtime.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Tailwind CSS
            </h2>
            <p className="text-gray-600">Rapid, utility-first styling.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Next.js
            </h2>
            <p className="text-gray-600">Fast by default with SSR & SSG.</p>
          </div>
        </div>
      </section>
      <footer className="py-6 text-center text-gray-500 text-sm border-t border-gray-200">
        © {new Date().getFullYear()} Your App. All rights reserved.
      </footer>
    </div>
  );
}
