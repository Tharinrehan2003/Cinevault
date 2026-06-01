import Link from "next/link";
import { api } from "@/lib/api";

interface Movie {
  id: string;
  title: string;
  description: string;
  poster_url: string | null;
  release_year: number | null;
  director: string | null;
  imdb_rating: string | null;
  rotten_tomatoes: number | null;
  my_rating: string | null;
  genres: string[] | null;
}

export default async function Home() {
  const movies: Movie[] = await api.getMovies();

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Navbar */}
      <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-red-500">🎬 CineVault</h1>
        <div className="flex gap-4">
          <Link href="/auth/login" className="text-gray-300 hover:text-white transition">
            Login
          </Link>
          <Link href="/auth/register" className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition">
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="bg-gradient-to-b from-gray-900 to-gray-950 px-6 py-16 text-center">
        <h2 className="text-5xl font-bold mb-4">Discover Great Movies</h2>
        <p className="text-gray-400 text-lg mb-8">
          Personal reviews, ratings and recommendations — no spoilers.
        </p>
        <div className="max-w-xl mx-auto flex gap-2">
          <input
            type="text"
            placeholder="Search for a movie..."
            className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
          />
          <button className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition">
            Search
          </button>
        </div>
      </div>

      {/* Movies Grid */}
      <div className="px-6 py-12 max-w-7xl mx-auto">
        <h3 className="text-2xl font-bold mb-8">All Movies</h3>

        {movies.length === 0 ? (
          <p className="text-gray-500 text-center py-20">
            No movies yet. Add some from the admin panel.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <Link href={`/movies/${movie.id}`} key={movie.id}>
                <div className="bg-gray-900 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-200 cursor-pointer border border-gray-800 hover:border-red-500">
                  {/* Poster */}
                  <div className="aspect-[2/3] bg-gray-800 flex items-center justify-center">
                    {movie.poster_url ? (
                      <img
                        src={movie.poster_url}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-4xl">🎬</span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-3">
                    <h4 className="font-semibold text-sm truncate">{movie.title}</h4>
                    <p className="text-gray-500 text-xs mt-1">{movie.release_year}</p>
                    <div className="flex items-center justify-between mt-2">
                      {movie.imdb_rating && (
                        <span className="text-yellow-400 text-xs font-semibold">
                          ⭐ {movie.imdb_rating}
                        </span>
                      )}
                      {movie.my_rating && (
                        <span className="text-red-400 text-xs font-semibold">
                          ❤️ {movie.my_rating}
                        </span>
                      )}
                    </div>
                    {movie.genres && movie.genres.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {movie.genres.slice(0, 2).map((genre) => (
                          <span
                            key={genre}
                            className="bg-gray-800 text-gray-400 text-xs px-2 py-0.5 rounded-full"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}