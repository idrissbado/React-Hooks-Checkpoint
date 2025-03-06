import React, { useState } from 'react';
import { Movie } from '../types';

interface MovieFormProps {
  onAddMovie: (movie: Omit<Movie, 'id'>) => void;
}

const MovieForm: React.FC<MovieFormProps> = ({ onAddMovie }) => {
  // State hook for form data
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    posterURL: '',
    rating: 5
  });
  
  // State hook for form validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // State hook for submission status
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form validation function
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.posterURL.trim()) {
      newErrors.posterURL = 'Poster URL is required';
    } else if (!isValidUrl(formData.posterURL)) {
      newErrors.posterURL = 'Please enter a valid URL';
    }
    
    if (formData.rating < 0 || formData.rating > 5) {
      newErrors.rating = 'Rating must be between 0 and 5';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // URL validation helper
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseFloat(value) : value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      onAddMovie(formData);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        posterURL: '',
        rating: 5
      });
      
      setErrors({});
    } catch (error) {
      console.error('Error adding movie:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="movie-form">
      <h2 className="form-title">
        Add New Movie
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Movie Title
          </label>
          <input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter movie title"
            className={`form-input ${errors.title ? 'form-input-error' : ''}`}
          />
          {errors.title && <p className="form-error">{errors.title}</p>}
        </div>
        
        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter movie description"
            className={`form-input form-textarea ${errors.description ? 'form-input-error' : ''}`}
          />
          {errors.description && <p className="form-error">{errors.description}</p>}
        </div>
        
        <div className="form-group">
          <label htmlFor="posterURL" className="form-label">
            Poster URL
          </label>
          <input
            id="posterURL"
            name="posterURL"
            value={formData.posterURL}
            onChange={handleChange}
            placeholder="https://example.com/poster.jpg"
            className={`form-input ${errors.posterURL ? 'form-input-error' : ''}`}
          />
          {errors.posterURL && <p className="form-error">{errors.posterURL}</p>}
        </div>
        
        <div className="form-group">
          <label htmlFor="rating" className="form-label">
            Rating: {formData.rating.toFixed(1)}
          </label>
          <input
            id="rating"
            name="rating"
            type="range"
            min="0"
            max="5"
            step="0.1"
            value={formData.rating}
            onChange={handleChange}
            className="filter-slider"
          />
          <div className="filter-range-labels">
            <span>0.0</span>
            <span>5.0</span>
          </div>
          {errors.rating && <p className="form-error">{errors.rating}</p>}
        </div>
        
        <button 
          type="submit" 
          className="form-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding...' : 'Add Movie'}
        </button>
      </form>
    </div>
  );
};

export default MovieForm;