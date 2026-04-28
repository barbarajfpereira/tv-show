import type { Episode } from '@/types/api.types';
import { SHOW_ID } from '@/lib/constants';
import { fetchTVMaze } from './client';

export async function getEpisodes(showId: number = SHOW_ID): Promise<Episode[]> {
  const episodes = await fetchTVMaze<Episode[]>(`/shows/${showId}/episodes`);
  return episodes;
}

export async function getEpisodeById(episodeId: number): Promise<Episode | null> {
  try {
    const episode = await fetchTVMaze<Episode>(`/episodes/${episodeId}`);
    return episode;
  } catch (error) {
    return null;
  }
}

export function searchEpisodes(episodes: Episode[], query: string): Episode[] {
  const searchTerm = query.toLowerCase().trim();

  if (!searchTerm) return episodes;

  return episodes.filter((episode) => {
    const matchesTitle = episode.name.toLowerCase().includes(searchTerm);
    const matchesSummary = episode.summary?.toLowerCase().includes(searchTerm) ?? false;
    return matchesTitle || matchesSummary;
  });
}
