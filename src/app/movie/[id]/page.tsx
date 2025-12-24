import Image from "next/image";
import { notFound } from "next/navigation";
import CastGrid from "@/components/movie-info/CastGrid";
import RecommendationsCarousel from "@/components/movie-info/RecommendationsCarousel";
import MovieInteractions from "@/components/movie-info/MovieInteractions";
import { fetchMovieDetail, getMovieInteraction } from "@/lib/api/api";


type Interaction = { is_saved?: boolean; rating?: number };

async function loadData(movieId: number) {
  try {
    const [movie, interaction] = await Promise.all([
      fetchMovieDetail(movieId),
      getMovieInteraction(movieId).catch(() => ({ is_saved: false, rating: 0 } as Interaction)),
    ]);

    if (!movie) notFound();
    return { movie, interaction: interaction ?? { is_saved: false, rating: 0 } };
  } catch (error: any) {
    if (error?.response?.status === 404) {
      notFound();
    }
    throw error;
  }
}

export default async function MovieDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movieId = Number(id);
  if (!movieId) notFound();

  const { movie, interaction } = await loadData(movieId);

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

  const getScoreColor = (rating: number) => {
    if (rating >= 7) return "#4ade80";
    if (rating >= 5) return "#fbbf24";
    return "#ef4444";
  };

  return (
    <main className="bg-primary text-light-100 min-w-sceen min-h-screen">
      <div className="relative mx-auto py-1">
        <section className="relative z-10 mb-15">
          {backdropUrl && (
            <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
              <Image
                src={backdropUrl}
                alt={movie.title}
                fill
                className="object-cover object-center"
                priority
                unoptimized
              />
              <div className="absolute inset-0 bg-linear-to-b from-primary/50 via-primary/60 to-primary/50" />
            </div>
          )}

          <div className="relative items-center py-10 px-20 z-10 flex flex-col lg:flex-row gap-8">
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

            <div className="flex-1 space-y-6">
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

              <div className="flex items-center gap-6">
                <div className="relative w-24 h-24">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="rgba(206, 206, 251, 0.1)"
                      strokeWidth="8"
                    />
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
                  <span className="text-sm text-light-200 opacity-75">Based on TMDB ratings</span>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-light-100">Overview</h2>
                <p className="text-light-200 leading-relaxed max-w-6xl">{movie.overview}</p>
              </div>

              <MovieInteractions
                movieId={movieId}
                initialIsSaved={Boolean(interaction?.is_saved)}
                initialRating={interaction?.rating ?? 0}
              />

              <div className="mt-4">
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

        <div className="mx-auto px-4 sm:px-6 lg:px-4">
          <CastGrid cast={movie.credits?.cast || []} maxItems={12} />
        </div>

        <div className="mx-auto px-4 sm:px-6 lg:px-4">
          <RecommendationsCarousel movies={movie.recommendations?.results || []} maxItems={10} />
        </div>
      </div>
    </main>
  );
}
