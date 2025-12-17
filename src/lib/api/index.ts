// Re-export everything from individual API modules
export { authAPI } from "./auth";
export type { User, AuthResponse, RegisterData, LoginData } from "./auth";
export {
  fetchMovies,
  fetchMovieDetail,
  updateSearch,
  fetchTrending,
} from "./api";
