'use client';

import { Button } from './Button';

interface LoadMoreButtonProps {
  onClick: () => void;
  onShowAll?: () => void;
  hasMore: boolean;
  isLoading?: boolean;
  currentCount: number;
  totalCount: number;
}

export function LoadMoreButton({
  onClick,
  onShowAll,
  hasMore,
  isLoading = false,
  currentCount,
  totalCount,
}: LoadMoreButtonProps) {
  if (!hasMore) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">✨ You&apos;ve seen all {totalCount} episodes! ✨</p>
      </div>
    );
  }

  return (
    <div className="text-center py-8 space-y-4">
      <Button
        onClick={onClick}
        variant="primary"
        size="lg"
        isLoading={isLoading}
        aria-label="Load more episodes"
      >
        Load More ({currentCount} of {totalCount})
      </Button>

      {onShowAll && (
        <div>
          <Button onClick={onShowAll} variant="outline" size="sm">
            Show All {totalCount} Episodes
          </Button>
        </div>
      )}
    </div>
  );
}
