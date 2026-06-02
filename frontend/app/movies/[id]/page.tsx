import Link from "next/link";
import { api } from "@/lib/api";

interface Cast {
  name: string;
  role: string;
}

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
  cast: Cast[] | null;
  trailer_url: string | null;
}

export default async function MovieDetail({
  params,
}: {
  params: Promise<{ id: string }>; // 1. Change type to a Promise
}) {
  const resolvedParams = await params; // 2. Await the promise to extract the actual ID
  const movie: Movie = await api.getMovie(resolvedParams.id); // 3. Pass the valid ID to your API

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Navbar */}
      <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-red-500">
          🎬 CineVault
        </Link>
        <div className="flex gap-4">
          <Link href="/auth/login" className="text-gray-300 hover:text-white transition">
            Login
          </Link>
          <Link href="/auth/register" className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition">
            Sign Up
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row gap-10">

          {/* Poster */}
          <div className="w-full md:w-72 flex-shrink-0">
            <div className="aspect-[2/3] bg-gray-800 rounded-xl overflow-hidden flex items-center justify-center">
              {movie.poster_url ? (
                <img
                  src={movie.poster_url}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-6xl">🎬</span>
              )}
            </div>

            {/* Ratings */}
            <div className="mt-4 bg-gray-900 rounded-xl p-4 space-y-3 border border-gray-800">
              {movie.imdb_rating && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">IMDB</span>
                  <span className="text-yellow-400 font-bold">
                    ⭐ {movie.imdb_rating}/10
                  </span>
                </div>
              )}
              {movie.rotten_tomatoes && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Rotten Tomatoes</span>
                  <span className="text-red-400 font-bold">
                    🍅 {movie.rotten_tomatoes}%
                  </span>
                </div>
              )}
              {movie.my_rating && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">My Rating</span>
                  <span className="text-red-400 font-bold">
                    ❤️ {movie.my_rating}/10
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Movie Info */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>

            <div className="flex flex-wrap gap-3 text-sm text-gray-400 mb-4">
              {movie.release_year && <span>{movie.release_year}</span>}
              {movie.director && <span>• Directed by {movie.director}</span>}
            </div>

            {/* Genres */}
            {movie.genres && movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres.map((genre) => (
                  <span
                    key={genre}
                    className="bg-red-600 bg-opacity-20 text-red-400 border border-red-600 border-opacity-30 px-3 py-1 rounded-full text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            )}

            {/* Description */}
            <p className="text-gray-300 leading-relaxed text-lg mb-8">
              {movie.description}
            </p>

            {/* Trailer */}
            {movie.trailer_url && (
                <a
                    href={movie.trailer_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition mb-8"
                >
                    ▶ Watch Trailer
                </a>
            )}

            {/* Cast */}
            {movie.cast && movie.cast.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Cast</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {movie.cast.map((member, index) => (
                    <div
                      key={index}
                      className="bg-gray-900 border border-gray-800 rounded-lg p-3"
                    >
                      <p className="font-semibold text-sm">{member.name}</p>
                      <p className="text-gray-500 text-xs">{member.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rate this movie */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">Rate this Movie</h2>
              <p className="text-gray-500 text-sm mb-4">
                Please{" "}
                <Link href="/auth/login" className="text-red-400 hover:underline">
                  login
                </Link>{" "}
                to rate this movie.
              </p>
              <div className="flex gap-3">
                <button className="flex-1 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg py-3 transition text-gray-400">
                  👍 Like
                </button>
                <button className="flex-1 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg py-3 transition text-gray-400">
                  👎 Dislike
                </button>
              </div>
            </div>

            {/* Comments */}
            <div>
              <h2 className="text-xl font-bold mb-4">Comments</h2>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 mb-4">
                <textarea
                  placeholder="Login to leave a comment..."
                  disabled
                  className="w-full bg-transparent text-gray-500 placeholder-gray-600 resize-none outline-none"
                  rows={3}
                />
              </div>
              <p className="text-gray-600 text-sm text-center py-8">
                No comments yet. Be the first to comment!
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}