import { Movie } from "@/src/types/movie";
import { MovieDetail } from "@/src/types/movieDetail";
import api from "./axios";

// TMDB proxy (Django)
export async function fetchMovies(q?: string) {
  const res = await api.get("movies/", {
    params: q ? { q } : undefined,
  });
  return res.data;
}

// Get detailed movie information
export async function fetchMovieDetail(movieId: number) {
  const res = await api.get(`movies/${movieId}/`);
  return res.data as MovieDetail;
}

// Update search count
export async function updateSearch(searchTerm: string, movie: Movie) {
  await api.post("search/update/", {
    searchTerm,
    movie,
  });
}

// Trending movies - uses TMDB trending API
export async function fetchTrending() {
  const res = await api.get("movies/trending/");
  return res.data;
}

