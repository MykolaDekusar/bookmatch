import Link from "next/link";
import { useEffect, useState } from "react";
import BookCard from "@/components/BookCard";
type Book = {
  id: number;
  title: string;
  author: string;
  genre: string;
  year: number;
  averageRating: number;
  img: string;
  voteCounts: {
    stars: number;
    count: number;
  }[];
};

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);

  const fetchBooks = async () => {
    try {
      const res = await fetch("/api/books");
      const data = await res.json();
      setBooks(data);
    } catch (error) {
      console.error("❌ Errore nel fetch dei libri:", error);
    }
  };
  useEffect(() => {
    fetchBooks();
  }, []);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between p-6 shadow-md bg-white">
        <h1 className="text-2xl text-gray-600 font-bold">📚 BookApp</h1>
        <div className="space-x-4">
          <Link href="/signin">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              Login
            </button>
          </Link>
          <Link href="/register">
            <button className="bg-gray-300 text-gray-600 px-4 py-2 rounded hover:bg-gray-400 transition">
              Register
            </button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <main className="p-8 text-center">
            <h2 className="text-3xl text-gray-600 font-semibold mb-4">
              Benvenuto nella BookApp 📖
            </h2>
            <p className="text-gray-600">
              Accedi come admin per gestire i libri.
            </p>
            <section>
              <div className="p-6">
                <h1 className="text-2xl text-gray-500 font-bold mb-6">
                  📚 Catalogo Libri
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {books.length > 0 ? (
                    books.map((book) => (
                      <BookCard
                        key={book.id}
                        {...book}
                        onVote={(bookId, newAverage) => {
                          setBooks((prevBooks) =>
                            prevBooks.map((b) =>
                              b.id === bookId
                                ? { ...b, averageRating: newAverage }
                                : b
                            )
                          );
                        }}
                      />
                    ))
                  ) : (
                    <p className="text-gray-500">Caricamento libri...</p>
                  )}
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
