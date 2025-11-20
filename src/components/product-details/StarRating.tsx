'use client';

interface StarRatingProps {
  rating: number | string | null | undefined;
  maxStars?: number;
  size?: 'sm' | 'md' | 'lg';
  showRating?: boolean;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  hoveredRating?: number | null;
  onHover?: (rating: number | null) => void;
  disabled?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({ 
  rating, 
  maxStars = 5, 
  size = 'md',
  showRating = true,
  interactive = false,
  onRatingChange,
  hoveredRating = null,
  onHover,
  disabled = false
}) => {
  const numericRating = rating 
    ? typeof rating === 'string' ? parseFloat(rating) : rating 
    : 0;

  const clampedRating = Math.max(0, Math.min(numericRating, maxStars));

  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const starSize = sizeClasses[size];

  const handleStarClick = (starValue: number) => {
    if (!interactive || disabled || !onRatingChange) return;
    onRatingChange(starValue);
  };

  const handleStarHover = (starValue: number | null) => {
    if (!interactive || disabled || !onHover) return;
    onHover(starValue);
  };

  const renderStars = () => {
    const displayRating = interactive && hoveredRating !== null ? hoveredRating : clampedRating;
    
    return Array.from({ length: maxStars }, (_, index) => {
      const starValue = index + 1;
      const floorRating = Math.floor(displayRating);
      const isFullStar = starValue <= floorRating;
      const isPartialStar = starValue === floorRating + 1 && displayRating > floorRating;
      const fillPercentage = isPartialStar ? ((displayRating - floorRating) * 100) : 0;

      const handleKeyDown = (e: React.KeyboardEvent, starValue: number) => {
        if (!interactive || disabled) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleStarClick(starValue);
        }
      };

      const starElement = (
        <span 
          key={index} 
          className={`relative inline-block ${interactive && !disabled ? 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-1 rounded' : ''}`}
          onClick={() => handleStarClick(starValue)}
          onMouseEnter={() => handleStarHover(starValue)}
          onMouseLeave={() => handleStarHover(null)}
          onKeyDown={(e) => handleKeyDown(e, starValue)}
          role={interactive ? 'button' : undefined}
          aria-label={interactive ? `Rate ${starValue} out of ${maxStars}` : undefined}
          tabIndex={interactive && !disabled ? 0 : undefined}
        >
          {/* Empty star background */}
          <svg
            className={`${starSize} text-gray-300 transition-colors ${interactive && !disabled ? 'hover:text-yellow-300' : ''}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          
          {/* Filled or partial star overlay */}
          {(isFullStar || isPartialStar) && (
            <span 
              className={`absolute top-0 left-0 ${starSize} text-yellow-400 overflow-hidden transition-all`}
              style={{ width: `${fillPercentage || 100}%` }}
            >
              <svg
                className={`${starSize} text-yellow-400`}
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </span>
          )}
        </span>
      );
      return starElement;
    });
  };

  // If not interactive and no rating, don't show anything
  if (!interactive && (!rating || numericRating === 0)) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {renderStars()}
      </div>
      {showRating && clampedRating > 0 && (
        <span className="text-sm text-gray-600 font-medium">
          {clampedRating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default StarRating;

