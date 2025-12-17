"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { fetchMovieDetail } from "@/src/lib/api/api";
import type { MovieDetail } from "@/src/types/movieDetail";
import Spinner from "@/src/components/Spinner";
import CastGrid from "@/src/components/CastGrid";
import RecommendationsCarousel from "@/src/components/RecommendationsCarousel";

export default function MovieDetailPage() {
  const params = useParams();
  const movieId = parseInt(params.id as string);
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMovie = async () => {
      try {
        setLoading(true);
        const data = await fetchMovieDetail(movieId);
        console.log("Movie data loaded:", data);
        console.log("Cast data:", data.credits?.cast);
        console.log("Recommendations:", data.recommendations?.results);
        setMovie(data);
      } catch (err) {
        console.error("Error loading movie:", err);
        setError("Failed to load movie details");
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      loadMovie();
    }
  }, [movieId]);

  if (loading) return <Spinner />;
  if (error || !movie)
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-light-100 text-xl">{error || "Movie not found"}</div>
      </div>
    );

  const trailerVideo = movie.videos?.results?.find(
    (v: { type: string; site: string; key: string }) =>
      v.type === "Trailer" && v.site === "YouTube"
  );

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "";
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder.png";

  // Calculate score color based on rating
  const getScoreColor = (rating: number) => {
    if (rating >= 7) return "#4ade80"; // green
    if (rating >= 5) return "#fbbf24"; // yellow
    return "#ef4444"; // red
  };

  return (
    <main className="bg-primary text-light-100 min-w-sceen min-h-screen">
    

     <div className="relative mx-auto  py-1">
    <section className="relative z-10 mb-15">
    {/* --- BACKDROP BEHIND EVERYTHING --- */}
    {backdropUrl && (
    <div className="absolute inset-0 w-full h-full z-0  overflow-hidden">
          <Image
            src={backdropUrl}
            alt={movie.title}
            fill
            className="object-cover object-center "
            priority
            unoptimized
          />
          {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-primary/50 via-primary/60 to-primary/50" />
    </div>
  )}
        {/* --- MAIN CONTENT (poster + details) --- */}
        <div className="relative items-center justify-center py-10 px-20 z-10 flex flex-col lg:flex-row gap-8">
            {/* Poster */}
            <div className="shrink-0">
            <div className="w-90 h-auto rounded-lg overflow-hidden shadow-2xl">
                <Image
                src={posterUrl}
                alt={movie.title}
                width={320}
                height={680}
                className="w-full h-auto object-cover"
                unoptimized
                priority
              />
            </div>
          </div>

          {/* Right Side - Details */}
          <div className="flex-1 space-y-6">
            {/* Title & Year */}
            <div className="flex items-baseline gap-3 flex-wrap w-fit">
              <h1 className="text-5xl font-bold text-light-100 leading-tight">
                {movie.title}
              </h1>

              {movie.release_date && (
                <p className="text-light-200 text-2xl opacity-80 leading-tight">
                  ({movie.release_date.split("-")[0]})
                </p>
              )}
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-3">
              {movie.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="px-4 py-2 bg-dark-100 rounded-full text-light-100 text-sm font-medium border border-light-200 border-opacity-30"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* User Score */}
            <div className="flex items-center gap-6">
              <div className="relative w-24 h-24">
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full transform -rotate-90"
                >
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="rgba(206, 206, 251, 0.1)"
                    strokeWidth="8"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke={getScoreColor(movie.vote_average)}
                    strokeWidth="8"
                    strokeDasharray={`${movie.vote_average * 28.2} 282`}
                    strokeLinecap="round"
                    className="transition-all duration-500"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-light-100">
                    {(movie.vote_average * 10).toFixed(0)}%
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-light-200">User Score</span>
                <span className="text-sm text-light-200 opacity-75">
                  Based on TMDB ratings
                </span>
              </div>
            </div>

     

            {/* Overview */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-light-100">Overview</h2>
              <p className="text-light-200 leading-relaxed max-w-6xl">
                {movie.overview}
              </p>
            </div>

            {/* Directors */}
            {movie.credits?.crew && movie.credits.crew.filter((person) => person.job === "Director").length > 0 && (
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-light-100">
                  Director{movie.credits.crew.filter((person) => person.job === "Director").length > 1 ? "s" : ""}
                </h3>
                <div className="flex gap-3 flex-wrap">
                  {movie.credits.crew
                    .filter((person) => person.job === "Director")
                    .slice(0, 2)
                    .map((director) => (
                      <span
                        key={director.id}
                        className="text-light-200 bg-dark-100 px-3 py-1 rounded text-sm"
                      >
                        {director.name}
                      </span>
                    ))}
                </div>
              </div>
            )}

            {/* Trailer Button */}
            {trailerVideo && (
              <div className="pt-4">
                <a
                  href={`https://www.youtube.com/watch?v=${trailerVideo.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3 bg-linear-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  ▶ Watch Trailer
                </a>
              </div>
            )}
          </div>
        </div>
</section>
        
        {/* Cast Section */}
        <div className=" mx-auto px-4 sm:px-6 lg:px-4">
          <CastGrid cast={movie.credits?.cast || []} maxItems={12} />
        </div>

        {/* Recommendations Carousel */}
        <div className=" mx-auto px-4 sm:px-6 lg:px-4">
          <RecommendationsCarousel
            movies={movie.recommendations?.results || []}
            maxItems={10}
          />
        </div>
      </div>
    </main>
  );
}
