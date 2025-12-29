"use client";

import { useEffect, useState } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import StarRating from "@/components/movie-info/StarRating";
import { toggleMovieSave, rateMovie, getMovieInteraction } from "@/lib/api/api";
import { useAuthGate } from "@/hooks/useAuthGate";
import { useQueryClient } from "@tanstack/react-query";
import { useNotification } from "@/app/hooks/useNotification";


interface Props {
  movieId: number;
  initialIsSaved: boolean;
  initialRating: number;
}

export default function MovieInteractions({ movieId, initialIsSaved, initialRating }: Props) {
  const [isSaved, setIsSaved] = useState(initialIsSaved);
  const [rating, setRating] = useState(initialRating);
  const notify = useNotification()
  const { user } = useAuthGate();
  const queryClient = useQueryClient();

  // Refresh interaction on the client with the user's token so saved/rating persists across visits.
  useEffect(() => {
    if (!user) return;

    let cancelled = false;
    getMovieInteraction(movieId)
      .then((data) => {
        if (cancelled) return;
        setIsSaved(Boolean(data?.is_saved));
        setRating(data?.rating ?? 0);
      })
      .catch((err) => {
        console.error("Error fetching interaction:", err);
      });

    return () => {
      cancelled = true;
    };
  }, [movieId, user]);

  const handleToggleSave = async () => {
    try {
      const response = await toggleMovieSave(movieId);
      setIsSaved(response.is_saved);
      notify.success('Movie saved successfully', 'Your movie has been saved!', 2000)
      // Invalidate saved movies cache to update the list immediately
      queryClient.invalidateQueries({ queryKey: ['savedMovies'] });
    } catch (err) {
      console.error("Error toggling save:", err);
      notify.error('Error', 'Please login to save movies', 2000)
    }
  };

  const handleRatingChange = async (newRating: number) => {
    try {
      await rateMovie(movieId, newRating);
      setRating(newRating);
      notify.success('Rating submitted', `You rated this movie ${newRating} stars`, 2000)
    } catch (err) {
      console.error("Error rating movie:", err);
      notify.error('Error', 'Please login to rate movies', 2000)
    }
  };

  return (
    <div className="flex gap-4 flex-wrap items-center mt-6">
      <button
        onClick={handleToggleSave}
        title={isSaved ? "Unsave" : "Save"}
        aria-label={isSaved ? "Unsave" : "Save"}
        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg ${
          isSaved ? "bg-emerald-500 hover:bg-emerald-600 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"
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

      {user && (
        <div className="flex items-center gap-3 px-6 py-3 rounded-xl border border-light-200 border-opacity-30">
          <span className="text-light-100 font-medium">Your Rating:</span>
          <StarRating rating={rating} onRatingChange={handleRatingChange} size={28} />
        </div>
      )}
    </div>
  );
}
