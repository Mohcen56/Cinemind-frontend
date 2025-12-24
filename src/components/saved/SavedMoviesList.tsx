"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";
import MovieCard from "@/components/movies/MovieCard";
import { useAuthGate } from "@/hooks/useAuthGate";
import { useSavedMovies } from "@/app/hooks/useSavedMovies";

// Lightweight count component for use in the header
export function SavedMoviesCount() {
  const { user, isLoading: authLoading } = useAuthGate();
  const { data: movies, isLoading } = useSavedMovies(user?.id.toString());

  if (authLoading || isLoading) {
    return <div className="h-6 w-32 bg-gray-800/50 rounded animate-pulse" />;
  }

  const savedCount = movies?.length ?? 0;
  return (
    <p className="text-gray-400 sm:text-lg whitespace-nowrap">
      {savedCount} {savedCount === 1 ? "movie" : "movies"} saved
    </p>
  );
}

export default function SavedMoviesList() {
  const { user, isLoading: authLoading } = useAuthGate();
  const router = useRouter();
  const { data: savedMovies, isLoading, isError } = useSavedMovies(user?.id.toString());

  // Redirect to login if not authenticated
  if (!authLoading && !user) {
    router.replace("/login");
    return null;
  }

  if (authLoading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <p className="text-red-400 text-xl mb-4">Failed to load saved movies. Please try again.</p>
        <Link
          href="/"
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const savedCount = savedMovies?.length ?? 0;

  return (
    <div className="w-full">
      

      <div className="max-w-md sm:max-w-7xl mx-auto w-full">
        <h2 className="mb-6">My Collection</h2>

        {savedCount === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-24 w-24 text-gray-600 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
            <h3 className="text-2xl font-semibold text-gray-400 mb-2">
              No saved movies yet
            </h3>
            <p className="text-gray-500 mb-6">
              Start exploring and save your favorite movies!
            </p>
            <Link
              href="/"
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              Discover Movies
            </Link>
          </div>
        ) : (
          <ul>
            {savedMovies?.map((movie) => (
              <li key={movie.id}>
                <MovieCard movie={movie} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
