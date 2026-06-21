"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
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

interface Comment {
  id: string;
  content: string;
  user_id: string;
}

export default function MovieDetail() {
  const params = useParams();
  const movieId = params.id as string;

  const [movie, setMovie] = useState<Movie | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [voteMessage, setVoteMessage] = useState("");
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    api.getMovie(movieId).then(setMovie);
    api.getComments(movieId).then(setComments);
  }, [movieId]);

  async function handleVote(vote: "up" | "down") {
    if (!token) return;
    await api.rateMovie(movieId, null, vote, token);
    setVoteMessage(vote === "up" ? "You liked this movie!" : "You disliked this movie.");
  }

  async function handleComment() {
    if (!token || !newComment.trim()) return;
    setPosting(true);
    const comment = await api.addComment(movieId, newComment, token);
    setComments([...comments, comment]);
    setNewComment("");
    setPosting(false);
  }

  if (!movie) {
    return (
      <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Navbar */}
      <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-red-500">
          🎬 CineVault
        </Link>
        <div className="flex gap-4">
          {token ? (
            <span className="text-gray-400 self-center text-sm">Logged in</span>
          ) : (
            <>
              <Link href="/auth/login" className="text-gray-300 hover:text-white transition">
                Login
              </Link>
              <Link href="/auth/register" className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row gap-10">

          {/* Poster */}
          <div className="w-full md:w-72 flex-shrink-0">
            <div className="aspect-[2/3] bg-gray-800 rounded-xl overflow-hidden flex items-center justify-center">
              {movie.poster_url ? (
                <img src={movie.poster_url} alt={movie.title} className="w-full h-full object-cover" />
              ) : (
                <span className="text-6xl">🎬</span>
              )}
            </div>

            <div className="mt-4 bg-gray-900 rounded-xl p-4 space-y-3 border border-gray-800">
              {movie.imdb_rating && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">IMDB</span>
                  <span className="text-yellow-400 font-bold">⭐ {movie.imdb_rating}/10</span>
                </div>
              )}
              {movie.rotten_tomatoes && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Rotten Tomatoes</span>
                  <span className="text-red-400 font-bold">🍅 {movie.rotten_tomatoes}%</span>
                </div>
              )}
              {movie.my_rating && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">My Rating</span>
                  <span className="text-red-400 font-bold">❤️ {movie.my_rating}/10</span>
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

            {movie.genres && movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres.map((genre) => (
                  <span key={genre} className="bg-red-600 bg-opacity-20 text-red-400 border border-red-600 border-opacity-30 px-3 py-1 rounded-full text-sm">
                    {genre}
                  </span>
                ))}
              </div>
            )}

            <p className="text-gray-300 leading-relaxed text-lg mb-8">{movie.description}</p>

            {movie.trailer_url && (
              <a href={movie.trailer_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition mb-8">
                ▶ Watch Trailer
              </a>
            )}

            {movie.cast && movie.cast.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Cast</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {movie.cast.map((member, index) => (
                    <div key={index} className="bg-gray-900 border border-gray-800 rounded-lg p-3">
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

              {!token ? (
                <p className="text-gray-500 text-sm mb-4">
                  Please <Link href="/auth/login" className="text-red-400 hover:underline">login</Link> to rate this movie.
                </p>
              ) : voteMessage ? (
                <p className="text-green-400 text-sm mb-4">{voteMessage}</p>
              ) : null}

              <div className="flex gap-3">
                <button
                  onClick={() => handleVote("up")}
                  disabled={!token}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed border border-gray-700 rounded-lg py-3 transition text-gray-300"
                >
                  👍 Like
                </button>
                <button
                  onClick={() => handleVote("down")}
                  disabled={!token}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed border border-gray-700 rounded-lg py-3 transition text-gray-300"
                >
                  👎 Dislike
                </button>
              </div>
            </div>

            {/* Comments */}
            <div>
              <h2 className="text-xl font-bold mb-4">Comments ({comments.length})</h2>

              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 mb-4">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder={token ? "Write a comment..." : "Login to leave a comment..."}
                  disabled={!token}
                  className="w-full bg-transparent text-white placeholder-gray-600 resize-none outline-none disabled:cursor-not-allowed"
                  rows={3}
                />
                {token && (
                  <button
                    onClick={handleComment}
                    disabled={posting || !newComment.trim()}
                    className="mt-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 px-4 py-2 rounded-lg text-sm font-semibold transition"
                  >
                    {posting ? "Posting..." : "Post Comment"}
                  </button>
                )}
              </div>

              {comments.length === 0 ? (
                <p className="text-gray-600 text-sm text-center py-8">
                  No comments yet. Be the first to comment!
                </p>
              ) : (
                <div className="space-y-3">
                  {comments.map((comment) => (
                    <div key={comment.id} className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                      <p className="text-gray-300">{comment.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}