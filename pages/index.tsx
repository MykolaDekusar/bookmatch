import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between p-6 shadow-md bg-white">
        <h1 className="text-2xl font-bold">📚 BookApp</h1>
        <div className="space-x-4">
          <Link href="/signin">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              Login
            </button>
          </Link>
          <Link href="/register">
            <button className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition">
              Register
            </button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="p-8 text-center">
        <h2 className="text-3xl font-semibold mb-4">
          Benvenuto nella BookApp 📖
        </h2>
        <p className="text-gray-600">Accedi come admin per gestire i libri.</p>
      </main>
    </div>
  );
}
