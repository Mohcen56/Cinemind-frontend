"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import MovieCard from '@/src/components/MovieCard';
import Spinner from '@/src/components/Spinner';
import { getSavedMovies, fetchMovieDetail } from '@/src/lib/api/api';
import { useAuthGate } from '@/src/hooks/useAuthGate';
import { MovieDetail } from '@/src/types/movieDetail';
import UserProfileDropdown from '@/src/components/user/UserProfileDropdown';
import "@/src/styles/App.css";

export default function SavedMoviesPage() {
  const [savedMovies, setSavedMovies] = useState<MovieDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { user, isLoading: authLoading } = useAuthGate();
  const router = useRouter();

  useEffect(() => {
    // Wait for auth to finish loading
    if (authLoading) return;

    // If no user, redirect to login
    if (!user) {
      router.push('/login');
      return;
    }

    // Fetch saved movies
    const loadSavedMovies = async () => {
      try {
        setIsLoading(true);
        setError('');
        
        const response = await getSavedMovies();
        
        if (response.success && response.movie_ids.length > 0) {
          // Fetch details for each saved movie
          const moviePromises = response.movie_ids.map((id: number) => 
            fetchMovieDetail(id)
          );
          
          const movies = await Promise.all(moviePromises);
          setSavedMovies(movies);
        } else {
          setSavedMovies([]);
        }
      } catch (err) {
        console.error('Error loading saved movies:', err);
        setError('Failed to load saved movies. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    loadSavedMovies();
  }, [user, authLoading, router]);

  if (authLoading || isLoading) {
    return (
      <main>
        <div className="pattern" />
        <div className="wrapper">
          <div className="flex items-center justify-center min-h-screen">
            <Spinner />
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <div className="pattern" />
        <div className="wrapper">
          <header className="relative">
            <div className="absolute top-0 right-0 z-50">
              <UserProfileDropdown align="left" />
            </div>
          </header>
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <p className="text-red-400 text-xl mb-4">{error}</p>
              <button
                onClick={() => router.push('/')}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="pattern" />
      
      <div className="wrapper">
        <header className="w-full py-5 md:px-10 mb-8">
          <div className="flex items-center justify-between w-full relative">
            <button
              onClick={() => router.push('/')}
              className="text-purple-400 hover:text-purple-300 flex items-center gap-2 transition-colors flex-shrink-0"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
                  clipRule="evenodd" 
                />
              </svg>
              Back 
            </button>
            <div className=" flex pl-3 md:pl-8  md:w-15 md:h-15  z-50">
            <UserProfileDropdown  align="left" leftOffset="left-40" />
          </div>
            <h1 className="m-0 absolute left-1/2 -translate-x-1/2 text-sm md:text-6xl">Your <span className="text-gradient text-sm md:text-6xl">Saved</span> Movies</h1>
           
            <div className="flex items-center gap-3 flex-shrink-0 ml-auto">
              
              <p className="text-gray-400 text-lg whitespace-nowrap">
                {savedMovies.length} {savedMovies.length === 1 ? 'movie' : 'movies'} saved
              </p>
            </div>
          </div>
        </header>

        <section className="all-movies max-w-7xl mx-auto w-full">
          <h2>My Collection</h2>

          {savedMovies.length === 0 ? (
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
              <h2 className="text-2xl font-semibold text-gray-400 mb-2">
                No saved movies yet
              </h2>
              <p className="text-gray-500 mb-6">
                Start exploring and save your favorite movies!
              </p>
              <button
                onClick={() => router.push('/')}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                Discover Movies
              </button>
            </div>
          ) : (
            <ul>
              {savedMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
