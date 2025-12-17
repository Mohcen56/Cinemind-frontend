"use client";

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Search from '../components/Search'
import Spinner from '../components/Spinner'
import MovieCard from '../components/MovieCard'
import Pagination from '../components/Pagination'
import { useDebounce } from 'react-use'
import { updateSearch, fetchTrending } from '../lib/api/api'
import type { Movie } from "../types/movie";
import "../styles/App.css";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../components/ui/carousel';
import UserProfileDropdown from '../components/user/UserProfileDropdown';


// Local client-side type for trending documents - handles both local and TMDB trending
type TrendingDoc = {
  $id?: string;
  id?: number;
  searchTerm?: string;
  count?: number;
  movie_id?: number;
  poster_url?: string | null;
  poster_path?: string | null;
  title?: string | null;
  vote_average?: number;
  release_date?: string;
  original_language?: string;
}

// Client now calls a server-side proxy at /api/tmdb which holds the TMDb API key.

const App = () => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [searchTerm, setSearchTerm] = useState('');

  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [trendingMovies, setTrendingMovies] = useState<TrendingDoc[]>([]);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Debounce the search term to prevent making too many API requests
  // by waiting for the user to stop typing for 500ms
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm])

  const fetchMoviesData = async (query = '', page = 1) => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const endpoint = query 
        ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/movies/?q=${encodeURIComponent(query)}&page=${page}` 
        : `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/movies/?page=${page}`;

      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();

      // TMDb returns an object with a `results` array. Guard against missing results.
      const results = Array.isArray(data.results) ? data.results : [];
      setMovieList(results);
      
      // Set total pages from API response
      setTotalPages(data.total_pages || 1);

      if (query && results.length > 0) {
        // update search count with the top result
        await updateSearch(query, results[0]);
      }
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Error fetching movies. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const loadTrendingMovies = async () => {
    try {
      const movies = await fetchTrending();

      // Appwrite SDK types may not be available at compile time in the client bundle,
      // cast to our local TrendingDoc type for use in the client UI.
      setTrendingMovies(movies as unknown as TrendingDoc[]);
    } catch (error) {
      console.error(`Error fetching trending movies: ${error}`);
    }
  }

  useEffect(() => {
    setCurrentPage(1); // Reset to page 1 when search term changes
  }, [debouncedSearchTerm]);

  useEffect(() => {
    fetchMoviesData(debouncedSearchTerm, currentPage);
  }, [debouncedSearchTerm, currentPage]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return (
    <main>
      <div className="pattern"/>

      <div className="wrapper">
        <header className="relative">
          <div className="absolute top-2 left-6 z-50">
            <UserProfileDropdown align="left" leftOffset="left-5" />
          </div>
          <Image src="/hero.png" alt="Hero Banner" width={1200} height={300} unoptimized />
          <h1>Find <span className="text-gradient">Movies</span> You will Enjoy Without the Hassle</h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trendingMovies.length > 0 && (
          <section className="trending w-7xl mx-auto mb-12">
            <h2>Trending Movies</h2>

            <Carousel className='bg-primary' >
              <CarouselContent className=" w-full">
                {trendingMovies.slice(0, 10).map((movie, index) => {
                  const posterPath = movie.poster_url || movie.poster_path;
                  const posterSrc = posterPath 
                    ? `https://image.tmdb.org/t/p/w500${posterPath}` 
                    : '/placeholder.png';
                  const movieId = movie.$id || movie.id;
                  
                  return (
                    <CarouselItem key={movieId} className="basis-auto">
                      
                      <li className="min-w-[230px] flex flex-row items-center">
                        <p className="fancy-text mt-[22px] text-nowrap">{index + 1}</p>
                        <Image 
                          src={posterSrc} 
                          alt={movie.title ?? movie.searchTerm ?? 'Trending movie'} 
                          width={127} 
                          height={163} 
                          unoptimized 
                          className="w-[127px] h-[163px] rounded-lg object-cover -ml-3.5"
                        />
                      </li>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious className="-left-30 text-light-100 hover:text-purple-400" />
              <CarouselNext className="-right-30 text-light-100 hover:text-purple-400" />
            </Carousel>
          </section>
        )}

        <section className="all-movies max-w-7xl mx-auto w-full">
          <h2>All Movies</h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <>
              <ul>
                {movieList.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </ul>
              
              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </section>
      </div>
    </main>
  )
}

export default App
