import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LoadMoreButton } from '../LoadMoreButton';

describe('LoadMoreButton', () => {
  it('shows load more button when hasMore is true', () => {
    render(<LoadMoreButton onClick={vi.fn()} hasMore={true} currentCount={12} totalCount={78} />);

    expect(screen.getByText('Load More (12 of 78)')).toBeInTheDocument();
  });

  it('shows completion message when hasMore is false', () => {
    render(<LoadMoreButton onClick={vi.fn()} hasMore={false} currentCount={78} totalCount={78} />);

    expect(screen.getByText(/You've seen all 78 episodes/)).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<LoadMoreButton onClick={onClick} hasMore={true} currentCount={12} totalCount={78} />);

    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('calls onShowAll when show all button is clicked', () => {
    const onShowAll = vi.fn();
    render(
      <LoadMoreButton
        onClick={vi.fn()}
        onShowAll={onShowAll}
        hasMore={true}
        currentCount={12}
        totalCount={78}
      />
    );

    fireEvent.click(screen.getByText('Show All 78 Episodes'));
    expect(onShowAll).toHaveBeenCalledTimes(1);
  });
});
