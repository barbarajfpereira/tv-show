import { describe, expect, it } from 'vitest';
import { paginateEpisodes, searchEpisodes } from '../episodes';
import type { Episode } from '@/types/api.types';

const mockEpisodes: Episode[] = [
  {
    id: 1,
    name: 'Monkey See, Doggie Do',
    summary: '<p>A monkey causes trouble</p>',
    season: 1,
    number: 1,
    image: null,
    runtime: 22,
    airdate: '1998-11-18',
    url: 'https://tvmaze.com/episodes/1',
  },
  {
    id: 2,
    name: 'Insect Inside',
    summary: '<p>Giant insects attack</p>',
    season: 1,
    number: 2,
    image: null,
    runtime: 22,
    airdate: '1998-11-25',
    url: 'https://tvmaze.com/episodes/2',
  },
  {
    id: 3,
    name: 'The Rowdyruff Boys',
    summary: '<p>Evil counterparts</p>',
    season: 1,
    number: 12,
    image: null,
    runtime: 22,
    airdate: '1999-02-03',
    url: 'https://tvmaze.com/episodes/3',
  },
];

describe('Episode Utilities', () => {
  describe('searchEpisodes', () => {
    it('filters by title (case insensitive)', () => {
      const results = searchEpisodes(mockEpisodes, 'monkey');
      expect(results).toHaveLength(1);
      expect(results[0]!.name).toContain('Monkey');
    });

    it('filters by summary content', () => {
      const results = searchEpisodes(mockEpisodes, 'insects');
      expect(results).toHaveLength(1);
      expect(results[0]!.name).toBe('Insect Inside');
    });

    it('returns all episodes when search is empty', () => {
      const results = searchEpisodes(mockEpisodes, '');
      expect(results).toHaveLength(3);
    });

    it('returns empty array when no matches', () => {
      const results = searchEpisodes(mockEpisodes, 'nonexistent');
      expect(results).toHaveLength(0);
    });
  });

  describe('paginateEpisodes', () => {
    it('slices episodes correctly', () => {
      const page1 = paginateEpisodes(mockEpisodes, 1, 2);
      expect(page1).toHaveLength(2);
      expect(page1[0]!.id).toBe(1);

      const page2 = paginateEpisodes(mockEpisodes, 2, 2);
      expect(page2).toHaveLength(1);
      expect(page2[0]!.id).toBe(3);
    });
  });
});
