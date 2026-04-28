'use client';

import { Card } from '@/components/ui/Card';
import type { Episode } from '@/types/api.types';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface EpisodeCardProps {
  episode: Episode;
  priority?: boolean;
}

export function EpisodeCard({ episode, priority = false }: EpisodeCardProps) {
  const [imageError, setImageError] = useState(false);

  const imageUrl = episode.image?.medium ?? '/placeholder-image.svg';

  const episodeLink = `/episode?id=${episode.id}`;

  return (
    <Link href={episodeLink}>
      <Card hover>
        <div className="relative aspect-video bg-gray-100">
          {!imageError ? (
            <Image
              src={imageUrl}
              alt={`${episode.name} thumbnail`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={priority}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-purple-400 to-pink-400">
              <span className="text-white text-sm font-semibold">Episode {episode.number}</span>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{episode.name}</h3>
          <p className="text-sm text-gray-600">
            Season {episode.season}, Episode {episode.number}
          </p>
          {episode.runtime && <p className="text-xs text-gray-500 mt-1">{episode.runtime} min</p>}
          {episode.summary && (
            <div
              className="text-sm text-gray-600 mt-2 line-clamp-2"
              dangerouslySetInnerHTML={{ __html: episode.summary }}
            />
          )}
        </div>
      </Card>
    </Link>
  );
}
