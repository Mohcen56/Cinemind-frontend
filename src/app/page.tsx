import Image from "next/image";
import Search from "@/components/movies/Search";
import MovieCard from "@/components/movies/MovieCard";
import { TrendingCarousel } from "@/components/movies/TrendingCarousel";
import Pagination from "@/components/Pagination";
import UserProfileDropdown from "@/components/user/UserProfileDropdown";
import type { Movie, TrendingDoc } from "@/types/movie";
import "../styles/App.css";

type MoviesResponse = {
  results: Movie[];
  total_pages: number;
};

async function fetchMovies(query: string, page: number): Promise<MoviesResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) {
    return { results: [], total_pages: 1 };
  }

  const params = new URLSearchParams();
  params.set("page", String(page));
  if (query) params.set("q", query);

  try {
    const res = await fetch(`${baseUrl}/api/movies/?${params.toString()}`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch movies");

    const data = await res.json();
    return {
      results: Array.isArray(data.results) ? data.results : [],
      total_pages: data.total_pages ?? 1,
    };
  } catch (error) {
    console.error(error);
    return { results: [], total_pages: 1 };
  }
}

async function fetchTrendingMovies(): Promise<TrendingDoc[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) return [];

  try {
    const res = await fetch(`${baseUrl}/api/movies/trending/`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error("Failed to fetch trending movies");
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const params = await searchParams;
  const query = (params?.q ?? "").trim();
  const pageNumber = Math.max(1, Number(params?.page ?? "1") || 1);

  const [moviesData, trendingMovies] = await Promise.all([
    fetchMovies(query, pageNumber),
    fetchTrendingMovies(),
  ]);

  const movies = moviesData.results ?? [];
  const totalPages = Math.max(1, moviesData.total_pages ?? 1);

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header className="relative">
          <div className="absolute top-5 sm:top-10 left-8 sm:left-20 z-50">
            <UserProfileDropdown align="left" leftOffset="left-5" />
          </div>
          <Image
            src="/hero.png"
            alt="Hero Banner"
            width={1200}
            height={300}
            unoptimized
          />
          <h1>
            Find <span className="text-gradient">Movies</span> You will Enjoy Without the
            Hassle
          </h1>
        </header>

        {trendingMovies.length > 0 && (
          <section className="trending w-7xl mx-auto mb-3">
           
            <TrendingCarousel movies={trendingMovies.slice(0, 10)} />
          </section>
        )}

        <section id="all-movies" className="all-movies max-w-7xl mx-auto w-full">
          <Search />
          <h2>All Movies</h2>

          {movies.length === 0 ? (
            <p className="text-light-200">No movies found.</p>
          ) : (
            <>
              <ul>
                {movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </ul>

              <Pagination
                currentPage={pageNumber}
                totalPages={totalPages}
                scrollTargetId="all-movies"
              />
            </>
          )}
        </section>
      </div>
    </main>
  );
}
