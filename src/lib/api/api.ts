import { Movie } from "@/types/movie";
import { MovieDetail } from "@/types/movieDetail";
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

// Movie interactions (rating and saves)
export async function rateMovie(movieId: number, rating: number) {
  const res = await api.post(`auth/movies/${movieId}/rate/`, { rating });
  return res.data;
}

export async function toggleMovieSave(movieId: number) {
  const res = await api.post(`auth/movies/${movieId}/save/`);
  return res.data;
}

export async function getMovieInteraction(movieId: number) {
  const res = await api.get(`auth/movies/${movieId}/interaction/`);
  return res.data;
}

export async function getSavedMovies() {
  const res = await api.get('auth/movies/saved/');
  return res.data;
}

// AI chat
export async function sendChatMessage(message: string) {
  const res = await api.post('chat/', { message });
  return res.data as { response_text: string; movies?: any[] };
}

