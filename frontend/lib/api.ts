const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const api = {
  async getMovies() {
    const res = await fetch(`${API_URL}/movies/`);
    return res.json();
  },

  async getMovie(id: string) {
    const res = await fetch(`${API_URL}/movies/${id}`);
    return res.json();
  },

  async login(email: string, password: string) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return res.json();
  },

  async register(username: string, email: string, password: string) {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    return res.json();
  },

  async rateMovie(movieId: string, stars: number | null, vote: string | null, token: string) {
    const res = await fetch(`${API_URL}/movies/${movieId}/rate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ stars, vote }),
    });
    return res.json();
  },

  async addComment(movieId: string, content: string, token: string) {
    const res = await fetch(`${API_URL}/movies/${movieId}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    });
    return res.json();
  },

  async getComments(movieId: string) {
    const res = await fetch(`${API_URL}/movies/${movieId}/comments`);
    return res.json();
  },

  async createMovie(movieData: object, token: string) {
    const res = await fetch(`${API_URL}/movies/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(movieData),
    });
    return res.json();
  },
  
};