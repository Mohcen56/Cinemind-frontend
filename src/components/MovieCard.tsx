"use client";

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Movie } from "../types/movie";

interface Props {
  movie: Movie
}

const MovieCard: React.FC<Props> = ({ movie }) => {
  const posterSrc = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : '/no-movie.png'

  return (
    <Link href={`/movie/${movie.id}`}>
      <div className="movie-card">
        <Image
          src={posterSrc}
          alt={movie.title}
          width={200}
          height={300}
          unoptimized
        />

        <div className="mt-4">
          <h3>{movie.title}</h3>

          <div className="content">
            <div className="rating">
              <Image src="/star.svg" alt="Star Icon" width={16} height={16} />
              <p>{movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</p>
            </div>

            <span>•</span>
            <p className="lang">{movie.original_language}</p>

            <span>•</span>
            <p className="year">{movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default MovieCard
