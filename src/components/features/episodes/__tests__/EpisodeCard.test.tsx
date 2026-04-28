import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EpisodeCard } from '../EpisodeCard';

// Mock Next.js Image
vi.mock('next/image', () => ({
  default: (props: { src: string; alt: string; className?: string }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />;
  },
}));

// Mock the Link component
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

const mockEpisode = {
  id: 160178,
  name: 'Monkey See, Doggie Do / Mommy Fearest',
  summary: '<p>Test summary</p>',
  number: 1,
  season: 1,
  image: { medium: '/test.jpg', original: '/test.jpg' },
  runtime: 22,
  airdate: '1998-11-18',
  url: 'https://example.com/episode/160178',
};

describe('EpisodeCard', () => {
  it('displays episode information correctly', () => {
    render(<EpisodeCard episode={mockEpisode} />);

    expect(screen.getByText('Monkey See, Doggie Do / Mommy Fearest')).toBeInTheDocument();
    expect(screen.getByText(/Season 1, Episode 1/i)).toBeInTheDocument();
    expect(screen.getByText('22 min')).toBeInTheDocument();
  });

  it('links to the correct episode page', () => {
    render(<EpisodeCard episode={mockEpisode} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/episode?id=160178');
  });

  it('handles episodes without images', () => {
    const episodeWithoutImage = { ...mockEpisode, image: null };
    render(<EpisodeCard episode={episodeWithoutImage} />);

    expect(screen.getByText('Monkey See, Doggie Do / Mommy Fearest')).toBeInTheDocument();

    const card = screen.getByRole('link').closest('div');
    expect(card).toBeInTheDocument();

    const hasPlaceholder = screen.queryByText(/Episode 1|no image|placeholder/i);
    expect(hasPlaceholder).toBeTruthy();
  });
});
