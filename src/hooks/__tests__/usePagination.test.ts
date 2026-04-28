import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePagination } from '../usePagination';
import type { Episode } from '@/types/api.types';

const mockEpisodes: Episode[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Episode ${i + 1}`,
  summary: `Summary for episode ${i + 1}`,
  number: i + 1,
  season: Math.floor(i / 13) + 1,
  image: null,
  runtime: 22,
  airdate: '2024-01-01',
  url: `https://tvmaze.com/episodes/${i + 1}`,
}));

describe('usePagination', () => {
  it('shows first 12 episodes initially', () => {
    const { result } = renderHook(() => usePagination({ episodes: mockEpisodes, pageSize: 12 }));

    expect(result.current.currentEpisodes).toHaveLength(12);
    expect(result.current.currentEpisodes[0]!.id).toBe(1);
    expect(result.current.hasMore).toBe(true);
  });

  it('loads more episodes when loadMore is called', () => {
    const { result } = renderHook(() => usePagination({ episodes: mockEpisodes, pageSize: 12 }));

    act(() => {
      result.current.loadMore();
    });

    expect(result.current.currentEpisodes).toHaveLength(24);
  });

  it('shows all episodes when showAll is called', () => {
    const { result } = renderHook(() => usePagination({ episodes: mockEpisodes, pageSize: 12 }));

    act(() => {
      result.current.showAll();
    });

    expect(result.current.currentEpisodes).toHaveLength(50);
    expect(result.current.hasMore).toBe(false);
  });

  it('resets pagination when search changes', () => {
    const { result } = renderHook(() => usePagination({ episodes: mockEpisodes, pageSize: 12 }));

    act(() => {
      result.current.loadMore();
      result.current.resetPagination();
    });

    expect(result.current.currentEpisodes).toHaveLength(12);
    expect(result.current.loadedPages).toBe(1);
  });
});
