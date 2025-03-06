import React, { useState, useEffect } from 'react';
import MovieList from './components/MovieList';
import Filter from './components/Filter';
import MovieForm from './components/MovieForm';
import { Movie } from './types';
import './App.css';

const App: React.FC = () => {
  // Initial movies data
  const initialMovies: Movie[] = [
    {
      id: 1,
      title: "Inception",
      description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
      posterURL: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
      rating: 4.8
    },
    {
      id: 2,
      title: "The Dark Knight",
      description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      posterURL: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
      rating: 5.0
    },
    {
      id: 3,
      title: "Interstellar",
      description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      posterURL: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
      rating: 4.7
    }
  ];

  // State hooks for managing data and filters
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>(initialMovies);
  const [titleFilter, setTitleFilter] = useState<string>('');
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);

  // Function to add a new movie
  const handleAddMovie = (newMovie: Omit<Movie, 'id'>) => {
    const movieWithId = {
      ...newMovie,
      id: movies.length > 0 ? Math.max(...movies.map(movie => movie.id)) + 1 : 1
    };
    setMovies([...movies, movieWithId]);
  };

  // Effect hook to filter movies when dependencies change
  useEffect(() => {
    let result = movies;
    
    if (titleFilter) {
      result = result.filter(movie => 
        movie.title.toLowerCase().includes(titleFilter.toLowerCase())
      );
    }
    
    if (ratingFilter !== null) {
      result = result.filter(movie => movie.rating >= ratingFilter);
    }
    
    setFilteredMovies(result);
  }, [movies, titleFilter, ratingFilter]);

  return (
    <div className="movie-app">
      <h1>Idriss Movie Collection</h1>
      
      <div className="movie-app-container">
        <div className="movie-content">
          <Filter 
            onTitleChange={setTitleFilter} 
            onRatingChange={setRatingFilter}
            titleFilter={titleFilter}
            ratingFilter={ratingFilter}
          />
          <MovieList movies={filteredMovies} />
        </div>
        
        <div className="movie-sidebar">
          <MovieForm onAddMovie={handleAddMovie} />
        </div>
      </div>
    </div>
  );
};

export default App;