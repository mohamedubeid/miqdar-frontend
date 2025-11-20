'use client';

import { useState, useTransition } from 'react';
import { toast } from 'react-toastify';
import StarRating from './StarRating';
import { rateProduct } from '@/actions/products';

interface InteractiveStarRatingProps {
  productId: number;
  initialRating: number | string | null | undefined;
  size?: 'sm' | 'md' | 'lg';
  showRating?: boolean;
}

const InteractiveStarRating: React.FC<InteractiveStarRatingProps> = ({
  productId,
  initialRating,
  size = 'md',
  showRating = true,
}) => {
  const [userRating, setUserRating] = useState<number | null>(() => {
    if (!initialRating) return null;
    return typeof initialRating === 'string' ? parseFloat(initialRating) : initialRating;
  });
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleRatingChange = (rating: number) => {
    const previousRating = userRating;
    setUserRating(rating);
    startTransition(async () => {
      const res = await rateProduct(productId, rating);
      if (res?.message === 'success') {
        toast.success(`تم تقييم المنتج بـ ${rating} نجمة${rating > 1 ? 'ات' : ''}`);
      } else {
        setUserRating(previousRating); // Revert on error
        toast.error(res?.message || 'فشل في تقييم المنتج، يرجى المحاولة مرة أخرى');
      }
    });
  };

  return (
    <StarRating
      rating={userRating}
      size={size}
      showRating={showRating}
      interactive={true}
      onRatingChange={handleRatingChange}
      hoveredRating={hoveredRating}
      onHover={setHoveredRating}
      disabled={isPending}
    />
  );
};

export default InteractiveStarRating;

