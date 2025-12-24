"use client";

import Image from 'next/image';
import { TrendingDoc } from "@/types/movie";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export function TrendingCarousel({ movies }: { movies: TrendingDoc[] }) {
  if (movies.length === 0) return null;

  return (
    <section className="trending w-7xl mx-auto mb-12">
      <h2>Trending Movies</h2>
      <Carousel className='bg-primary'>
        <CarouselContent className="w-full">
          {movies.slice(0, 10).map((movie, index) => {
            const posterPath = movie.poster_url || movie.poster_path;
            const posterSrc = posterPath 
              ? `https://image.tmdb.org/t/p/w500${posterPath}` 
              : '/placeholder.png';
            const movieId = movie.$id || movie.id;

            return (
              <CarouselItem key={movieId} className="basis-auto">
                <ul>
                  <li className="min-w-[230px] flex flex-row items-center">
                    <p className="fancy-text mt-[22px] text-nowrap">{index + 1}</p>
                    <Image 
                      src={posterSrc} 
                      alt={movie.title || 'Movie'} 
                      width={127} 
                      height={163} 
                      className="w-[127px] h-[163px] rounded-lg object-cover -ml-3.5"
                      unoptimized
                    />
                  </li>
                </ul>
              </CarouselItem>
            );
          })}
        </CarouselContent>
       <CarouselPrevious className="-left-30 text-light-100 hover:text-purple-400" />
            <CarouselNext className="-right-30 text-light-100 hover:text-purple-400" />
      </Carousel>
    </section>
  );
}