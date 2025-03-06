import React from 'react';
import MovieCard from './MovieCard';
import { Movie } from '../types';

interface MovieListProps {
  movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  if (movies.length === 0) {
    return (
      <div className="empty-message">
        <h3 className="empty-title">No movies found</h3>
        <p className="empty-description">
          Try adjusting your filters or add a new movie to your collection.
        </p>
      </div>
    );
  }

  return (
    <div className="movie-list">
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;