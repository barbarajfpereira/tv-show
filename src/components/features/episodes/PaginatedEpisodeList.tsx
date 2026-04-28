'use client';

import { useState, useEffect } from 'react';
import { usePagination } from '@/hooks/usePagination';
import { EpisodeGrid } from './EpisodeGrid';
import { LoadMoreButton } from '@/components/ui/LoadMoreButton';
import { searchEpisodes } from '@/lib/api/episodes';
import type { Episode } from '@/types/api.types';
import { useDebounce } from '@/hooks/useDebounce';

interface PaginatedEpisodeListProps {
  episodes: Episode[];
}

export function PaginatedEpisodeList({ episodes }: PaginatedEpisodeListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 300);

  const filteredEpisodes = searchEpisodes(episodes, debouncedSearch);

  const { currentEpisodes, hasMore, loadMore, showAll, resetPagination } = usePagination({
    episodes: filteredEpisodes,
    pageSize: 12,
  });

  // Reset pagination when search query changes
  useEffect(() => {
    resetPagination();
  }, [debouncedSearch, resetPagination]);

  const currentCount = currentEpisodes.length;
  const showingCount = Math.min(currentCount, filteredEpisodes.length);

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="max-w-md">
        <label htmlFor="episode-search" className="block text-sm font-medium text-gray-700 mb-2">
          Search Episodes
        </label>
        <input
          id="episode-search"
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by episode title or description..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          aria-label="Search episodes"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      <div className="text-sm text-gray-600">
        Showing {showingCount} of {filteredEpisodes.length} episodes
        {searchQuery && ` matching "${searchQuery}"`}
      </div>

      {/* Episode Grid - this accumulates episodes as you load more */}
      <EpisodeGrid episodes={currentEpisodes} />

      <LoadMoreButton
        onClick={loadMore}
        onShowAll={showAll}
        hasMore={hasMore}
        currentCount={showingCount}
        totalCount={filteredEpisodes.length}
      />
    </div>
  );
}
