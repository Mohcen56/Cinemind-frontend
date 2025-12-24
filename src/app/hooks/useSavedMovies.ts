"use client";
import { useQuery } from '@tanstack/react-query';
import { getSavedMovies, fetchMovieDetail } from '@/lib/api/api';

export function useSavedMovies(userId: string | undefined) {
  return useQuery({
    queryKey: ['savedMovies', userId], // The unique ID for this data
    enabled: !!userId, // Only run if user is logged in
    queryFn: async () => {
      const response = await getSavedMovies();
      if (!response.success || !response.movie_ids.length) return [];
      
      // Fetch details in parallel
      const movies = await Promise.all(
        response.movie_ids.map((id: number) => fetchMovieDetail(id))
      );
      return movies;
    },
    staleTime: 1000 * 60 * 5, // Data stays "fresh" for 5 minutes (no refetching)
  });
}