'use client';

import { useState, useMemo, useCallback } from 'react';
import type { Episode } from '@/types/api.types';

interface UsePaginationProps {
  episodes: Episode[];
  pageSize?: number;
}

export function usePagination({ episodes, pageSize = 12 }: UsePaginationProps) {
  const [loadedPages, setLoadedPages] = useState(1);

  // Reset loaded pages when episodes change (e.g., search)
  const resetPagination = useCallback(() => {
    setLoadedPages(1);
  }, []);

  const totalPages = useMemo(
    () => Math.ceil(episodes.length / pageSize),
    [episodes.length, pageSize]
  );

  // Accumulate episodes from all loaded pages
  const currentEpisodes = useMemo(() => {
    const end = loadedPages * pageSize;
    return episodes.slice(0, end);
  }, [episodes, loadedPages, pageSize]);

  const hasMore = loadedPages < totalPages;
  const isShowingAll = loadedPages === totalPages;

  const loadMore = useCallback(() => {
    if (hasMore) {
      setLoadedPages((prev) => prev + 1);
    }
  }, [hasMore]);

  const showAll = useCallback(() => {
    setLoadedPages(totalPages);
  }, [totalPages]);

  return {
    currentEpisodes,
    loadedPages,
    totalPages,
    hasMore,
    isShowingAll,
    loadMore,
    showAll,
    resetPagination,
    totalEpisodes: episodes.length,
  };
}
