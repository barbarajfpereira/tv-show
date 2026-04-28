import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PaginatedEpisodeList } from '../PaginatedEpisodeList';

// Mock the useDebounce hook to return immediately
vi.mock('@/hooks/useDebounce', () => ({
  useDebounce: (value: string) => value,
}));

const mockEpisodes = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: `Episode ${i + 1}`,
  summary: i === 0 ? '<p>Special episode</p>' : null,
  number: i + 1,
  season: Math.floor(i / 12) + 1,
  image: null,
  runtime: 22,
  airdate: null,
  url: `https://example.com/episode/${i + 1}`,
}));

describe('PaginatedEpisodeList (Integration)', () => {
  it('loads more episodes when button is clicked', async () => {
    render(<PaginatedEpisodeList episodes={mockEpisodes} />);

    // Initially shows 12 episodes
    expect(screen.getByText('Episode 1')).toBeInTheDocument();
    expect(screen.queryByText('Episode 13')).not.toBeInTheDocument();

    // Click load more
    const loadMoreButton = screen.getByRole('button', { name: /Load more episodes/i });
    fireEvent.click(loadMoreButton);

    // Now shows 24 episodes
    await waitFor(() => {
      expect(screen.getByText('Episode 13')).toBeInTheDocument();
    });
  });

  it('filters episodes by search', async () => {
    const user = userEvent.setup();
    render(<PaginatedEpisodeList episodes={mockEpisodes} />);

    const searchInput = screen.getByLabelText('Search Episodes');
    await user.type(searchInput, 'Special');

    await waitFor(() => {
      expect(screen.getByText(/Showing 1 of 1 episodes/)).toBeInTheDocument();
    });
  });

  it('clears search and shows all episodes', async () => {
    const user = userEvent.setup();
    render(<PaginatedEpisodeList episodes={mockEpisodes} />);

    const searchInput = screen.getByLabelText('Search Episodes');
    await user.type(searchInput, 'Special');

    await waitFor(() => {
      expect(screen.getByText(/Showing 1 of 1 episodes/)).toBeInTheDocument();
    });

    const clearButton = screen.getByLabelText('Clear search');
    await user.click(clearButton);

    await waitFor(() => {
      expect(screen.getByText(/Showing 12 of 25 episodes/)).toBeInTheDocument();
    });
  });
});
