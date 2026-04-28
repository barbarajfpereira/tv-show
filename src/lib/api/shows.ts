import { SHOW_ID } from '@/lib/constants';
import type { TVShow } from '@/types/api.types';
import { fetchTVMaze } from './client';

export async function getShow(showId: number = SHOW_ID): Promise<TVShow> {
  return fetchTVMaze<TVShow>(`/shows/${showId}`);
}

export async function getShowWithFallback(showId: number = SHOW_ID): Promise<TVShow | null> {
  try {
    return await getShow(showId);
  } catch (error) {
    console.error('Failed to fetch show:', error);
    return null;
  }
}
