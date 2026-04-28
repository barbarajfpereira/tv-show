'use client';

import { useMemo, useState } from 'react';

import type { Episode } from '@/types/api.types';
import { EpisodeGrid } from './EpisodeGrid';
import { SearchInput } from '@/components/ui/SearchInput';
import { searchEpisodes } from '@/lib/api/episodes';

interface EpisodeSearchProps {
  episodes: Episode[];
}

export function EpisodeSearch({ episodes }: EpisodeSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEpisodes = useMemo(() => {
    return searchEpisodes(episodes, searchQuery);
  }, [episodes, searchQuery]);

  return (
    <div className="space-y-6">
      <SearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search by episode title or description..."
      />

      <div className="text-sm text-gray-600">
        Found {filteredEpisodes.length} of {episodes.length} episodes
      </div>

      <EpisodeGrid episodes={filteredEpisodes} />
    </div>
  );
}
