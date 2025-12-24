"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { fetchMovieDetail, rateMovie, toggleMovieSave, getMovieInteraction } from "@/lib/api/api";
import type { MovieDetail } from "@/types/movieDetail";
import Spinner from "@/components/Spinner";
import CastGrid from "@/components/CastGrid";
import RecommendationsCarousel from "@/components/RecommendationsCarousel";
import { Bookmark, BookmarkCheck } from "lucide-react";
import StarRating from "@/components/StarRating";
import { useAuthGate } from "@/hooks/useAuthGate";

export default function MovieDetailPage() {
  const params = useParams();
  const movieId = parseInt(params.id as string);
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [userRating, setUserRating] = useState<number>(0);
  const { user } = useAuthGate();

  useEffect(() => {
    const loadMovie = async () => {
      try {
        setLoading(true);
        const data = await fetchMovieDetail(movieId);
        console.log("Movie data loaded:", data);
        setMovie(data);
        
        // Load user's interaction status if authenticated
        try {
          const interaction = await getMovieInteraction(movieId);
          setIsSaved(interaction.is_saved || false);
          setUserRating(interaction.rating || 0);
        } catch (err) {
          // User not authenticated or error fetching interaction
          console.log("Could not load interaction:", err);
          setIsSaved(false);
          setUserRating(0);
        }
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

  const handleToggleSave = async () => {
    try {
      const response = await toggleMovieSave(movieId);
      setIsSaved(response.is_saved);
    } catch (err) {
      console.error("Error toggling save:", err);
      alert("Please login to save movies");
    }
  };

  const handleRatingChange = async (newRating: number) => {
    try {
      const response = await rateMovie(movieId, newRating);
      setUserRating(newRating);
    } catch (err) {
      console.error("Error rating movie:", err);
      alert("Please login to rate movies");
    }
  };

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
        <div className="relative items-center py-10 px-20 z-10 flex flex-col lg:flex-row gap-8">
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

            {/* Action Buttons */}
            <div className="flex gap-4 flex-wrap items-center mt-6">
              {/* Save/Unsave Toggle Button */}
              <button
                onClick={handleToggleSave}
                title={isSaved ? "Unsave" : "Save"}
                aria-label={isSaved ? "Unsave" : "Save"}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg ${
                  isSaved
                    ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                {isSaved ? (
                  <>
                    <BookmarkCheck className="h-5 w-5" />
                    <span>Saved</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="h-5 w-5" />
                    <span>Save</span>
                  </>
                )}
              </button>

              {/* Star Rating - Only for authenticated users */}
              {user && (
                <div className="flex items-center gap-3 px-6 py-3  rounded-xl border border-light-200 border-opacity-30">
                  <span className="text-light-100 font-medium">Your Rating:</span>
                  <StarRating
                    rating={userRating}
                    onRatingChange={handleRatingChange}
                    size={28}
                  />
                </div>
              )}
          </div>
         
            <div className="mt-4">
              {/* Trailer Button */}
              {trailerVideo && (
                <a
                  href={`https://www.youtube.com/watch?v=${trailerVideo.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3 bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  ▶ Watch Trailer
                </a>
              )}
            </div>
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
