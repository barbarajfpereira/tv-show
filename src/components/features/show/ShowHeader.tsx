import Image from 'next/image';
import type { TVShow } from '@/types/api.types';

interface ShowHeaderProps {
  show: TVShow;
}

export function ShowHeader({ show }: ShowHeaderProps) {
  return (
    <div className="bg-linear-to-r from-purple-600 to-pink-600 text-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start">
          {show.image?.medium && (
            <div className="shrink-0">
              <Image
                src={show.image.medium}
                alt={`${show.name} cover`}
                width={210}
                height={295}
                className="rounded-lg shadow-2xl"
                priority
              />
            </div>
          )}

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{show.name}</h1>

            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
              {show.genres.map((genre) => (
                <span key={genre} className="px-3 py-1 bg-white/20 rounded-full text-sm">
                  {genre}
                </span>
              ))}
            </div>

            {show.rating.average && (
              <div className="flex items-center gap-2 justify-center md:justify-start mb-4">
                <span className="text-yellow-400 text-xl">★</span>
                <span>{show.rating.average}/10</span>
              </div>
            )}

            {show.summary && (
              <div
                dangerouslySetInnerHTML={{ __html: show.summary }}
                className="prose prose-invert max-w-none text-left"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
