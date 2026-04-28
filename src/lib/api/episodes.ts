import { fetchTVMaze } from './client';
import { SHOW_ID } from '@/lib/constants';
import type { Episode } from '@/types/api.types';

export async function getEpisodes(showId: number = SHOW_ID): Promise<Episode[]> {
  console.log(`[getEpisodes] Fetching episodes for show ${showId}`);
  const episodes = await fetchTVMaze<Episode[]>(`/shows/${showId}/episodes`);
  console.log(`[getEpisodes] Received ${episodes.length} episodes`);
  return episodes;
}

export async function getEpisodeById(episodeId: number): Promise<Episode | null> {
  console.log(`[getEpisodeById] Starting to fetch episode ${episodeId}`);

  try {
    console.log(`[getEpisodeById] Calling fetchTVMaze for /episodes/${episodeId}`);
    const episode = await fetchTVMaze<Episode>(`/episodes/${episodeId}`);
    console.log(`[getEpisodeById] Success! Episode name: ${episode.name}`);
    return episode;
  } catch (error) {
    console.error(`[getEpisodeById] Failed to fetch episode ${episodeId}:`, error);
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

export function paginateEpisodes(episodes: Episode[], page: number, pageSize: number): Episode[] {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return episodes.slice(start, end);
}

export function getTotalPages(episodes: Episode[], pageSize: number): number {
  return Math.ceil(episodes.length / pageSize);
}
