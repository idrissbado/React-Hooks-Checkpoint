import React from 'react';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { title, description, posterURL, rating } = movie;
  
  // Generate star rating display
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`star-${i}`} className="star filled">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half-star" className="star half-filled">★</span>);
    }
    
    return stars;
  };

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img 
          src={posterURL || "/placeholder.jpg"} 
          alt={`${title} poster`} 
        />
      </div>
      
      <div className="movie-info">
        <div className="movie-title-rating">
          <h3 className="movie-title">{title}</h3>
          <div className="movie-rating">
            <span className="movie-rating-value">{rating.toFixed(1)}</span>
          </div>
        </div>
        
        <p className="movie-description">{description}</p>
        
        <div className="movie-stars">
          {renderStars()}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;