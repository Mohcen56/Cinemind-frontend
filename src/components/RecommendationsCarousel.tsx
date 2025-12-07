"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/ui/carousel";

type RecommendedMovie = {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average?: number;
};

type RecommendationsCarouselProps = {
  movies: RecommendedMovie[];
  maxItems?: number;
};

export default function RecommendationsCarousel({
  movies,
  maxItems = 10,
}: RecommendationsCarouselProps) {
  const displayMovies = movies.slice(0, maxItems);

  console.log("RecommendationsCarousel - movies:", movies);
  console.log("RecommendationsCarousel - displayMovies:", displayMovies);

  if (displayMovies.length === 0) {
    console.log("No recommendations to display");
    return null;
  }

  return (
    <section className="  mx-auto mt-16 space-y-6 pb-12 lg:px-10">
      <h2 className="text-3xl font-bold text-light-100 pl-20">Recommended Titles</h2>

      {/* Carousel */}
      <Carousel className="relative px-15 sm:px-14 md:px-16 lg:px-25">
        <CarouselContent className="">
          {displayMovies.map((movie) => (
            <CarouselItem
              key={movie.id}
              className="sm:basis-1/2 md:basis-1/3 xl:basis-1/4"
            >
              <div className="flex flex-col items-center">
                <Link
                  href={`/movie/${movie.id}`}
                  className="group cursor-pointer block w-full"
                >
                  <div className="rounded-lg overflow-hidden bg-dark-100   h-110 sm:h-100 relative transform transition-transform duration-300 group-hover:scale-105">
                    {movie.poster_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                        alt={movie.title}
                        width={200}
                        height={300}
                        className="w-full h-full object-cover group-hover:opacity-80 transition-opacity duration-300"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-light-200 text-sm text-center px-2">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="mt-3 space-y-1">
                    <h4 className="text-light-100 font-semibold text-sm line-clamp-2 group-hover:text-purple-400 transition-colors duration-300">
                      {movie.title}
                    </h4>
                    <div className="text-light-200 text-xs">
                      ⭐ {movie.vote_average?.toFixed(1) || "N/A"}
                    </div>
                  </div>
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-16 text-light-100 hover:text-purple-400 " />
        <CarouselNext className="-right-16 text-light-100 hover:text-purple-400 " />
      </Carousel>
    </section>
  );
}
