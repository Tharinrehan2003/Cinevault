"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function AdminPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    poster_url: "",
    release_year: "",
    director: "",
    imdb_rating: "",
    rotten_tomatoes: "",
    my_rating: "",
    trailer_url: "",
    genres: "",
    cast: "",
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      router.push("/auth/login");
    }
    setToken(storedToken);
  }, [router]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit() {
    if (!token) return;
    setLoading(true);
    setError("");
    setSuccess("");

    const movieData = {
      title: form.title,
      description: form.description,
      poster_url: form.poster_url || null,
      release_year: form.release_year ? parseInt(form.release_year) : null,
      director: form.director || null,
      imdb_rating: form.imdb_rating || null,
      rotten_tomatoes: form.rotten_tomatoes ? parseInt(form.rotten_tomatoes) : null,
      my_rating: form.my_rating || null,
      trailer_url: form.trailer_url || null,
      genres: form.genres ? form.genres.split(",").map((g) => g.trim()) : [],
      cast: form.cast
        ? form.cast.split(",").map((c) => {
            const parts = c.trim().split(":");
            return { name: parts[0]?.trim(), role: parts[1]?.trim() || "" };
          })
        : [],
    };

    const data = await api.createMovie(movieData, token);

    if (data.id) {
      setSuccess(`"${data.title}" added successfully!`);
      setForm({
        title: "",
        description: "",
        poster_url: "",
        release_year: "",
        director: "",
        imdb_rating: "",
        rotten_tomatoes: "",
        my_rating: "",
        trailer_url: "",
        genres: "",
        cast: "",
      });
    } else {
      setError(data.detail || "Failed to add movie.");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Navbar */}
      <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-red-500">
          🎬 CineVault
        </Link>
        <span className="text-gray-400 text-sm">Admin Panel</span>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">Add New Movie</h1>
        <p className="text-gray-500 mb-8">Fill in the details below to add a movie to CineVault.</p>

        {success && (
          <div className="bg-green-600 bg-opacity-20 border border-green-600 border-opacity-30 text-green-400 px-4 py-3 rounded-lg mb-6">
            {success}
          </div>
        )}

        {error && (
          <div className="bg-red-600 bg-opacity-20 border border-red-600 border-opacity-30 text-red-400 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="space-y-5">

          {/* Title */}
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Title *</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="The Dark Knight"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Description *</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="A spoiler-free description of the movie..."
              rows={4}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-500 resize-none"
            />
          </div>

          {/* Two columns */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Release Year</label>
              <input
                name="release_year"
                value={form.release_year}
                onChange={handleChange}
                placeholder="2008"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Director</label>
              <input
                name="director"
                value={form.director}
                onChange={handleChange}
                placeholder="Christopher Nolan"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          {/* Ratings */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">IMDB Rating</label>
              <input
                name="imdb_rating"
                value={form.imdb_rating}
                onChange={handleChange}
                placeholder="9.0"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Rotten Tomatoes %</label>
              <input
                name="rotten_tomatoes"
                value={form.rotten_tomatoes}
                onChange={handleChange}
                placeholder="94"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">My Rating</label>
              <input
                name="my_rating"
                value={form.my_rating}
                onChange={handleChange}
                placeholder="9.5"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          {/* URLs */}
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Poster URL</label>
            <input
              name="poster_url"
              value={form.poster_url}
              onChange={handleChange}
              placeholder="https://image.tmdb.org/..."
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1 block">Trailer URL</label>
            <input
              name="trailer_url"
              value={form.trailer_url}
              onChange={handleChange}
              placeholder="https://youtube.com/watch?v=..."
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Genres */}
          <div>
            <label className="text-sm text-gray-400 mb-1 block">
              Genres <span className="text-gray-600">(comma separated)</span>
            </label>
            <input
              name="genres"
              value={form.genres}
              onChange={handleChange}
              placeholder="Action, Crime, Drama"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Cast */}
          <div>
            <label className="text-sm text-gray-400 mb-1 block">
              Cast <span className="text-gray-600">(Name:Role, Name:Role)</span>
            </label>
            <input
              name="cast"
              value={form.cast}
              onChange={handleChange}
              placeholder="Christian Bale:Batman, Heath Ledger:Joker"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-500"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading || !form.title || !form.description}
            className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 py-4 rounded-lg font-bold text-lg transition"
          >
            {loading ? "Adding Movie..." : "Add Movie"}
          </button>

        </div>
      </div>
    </main>
  );
}