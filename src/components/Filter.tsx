import React from 'react';

interface FilterProps {
  onTitleChange: (title: string) => void;
  onRatingChange: (rating: number | null) => void;
  titleFilter: string;
  ratingFilter: number | null;
}

const Filter: React.FC<FilterProps> = ({ 
  onTitleChange, 
  onRatingChange, 
  titleFilter, 
  ratingFilter 
}) => {
  return (
    <div className="filter-container">
      <h2 className="filter-title">Filter Movies</h2>
      
      <div className="filter-group">
        <label htmlFor="title-filter" className="filter-label">
          Search by Title
        </label>
        <div className="filter-input-container">
          <input
            id="title-filter"
            type="text"
            placeholder="Enter movie title..."
            value={titleFilter}
            onChange={(e) => onTitleChange(e.target.value)}
            className="filter-input"
          />
          {titleFilter && (
            <button 
              className="filter-clear-input"
              onClick={() => onTitleChange('')}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
      </div>
      
      <div className="filter-group">
        <label className="filter-label">
          Minimum Rating: {ratingFilter !== null ? ratingFilter.toFixed(1) : 'Any'}
        </label>
        <input
          type="range"
          min="0"
          max="5"
          step="0.5"
          value={ratingFilter !== null ? ratingFilter : 0}
          onChange={(e) => {
            const rating = parseFloat(e.target.value);
            onRatingChange(rating === 0 ? null : rating);
          }}
          className="filter-slider"
        />
        <div className="filter-range-labels">
          <span>Any</span>
          <span>5.0</span>
        </div>
      </div>
      
      {(titleFilter || ratingFilter !== null) && (
        <button
          onClick={() => {
            onTitleChange('');
            onRatingChange(null);
          }}
          className="filter-clear"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
};

export default Filter;