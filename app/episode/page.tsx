import { Button } from '@/components/ui/Button';
import { Container } from '@/components/layout/Container';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getEpisodeById } from '@/lib/api/episodes';
import { notFound } from 'next/navigation';

interface EpisodePageProps {
  searchParams: Promise<{
    id?: string;
  }>;
}

export async function generateMetadata({ searchParams }: EpisodePageProps): Promise<Metadata> {
  const params = await searchParams;

  if (!params.id) {
    return {
      title: 'Episode Not Found',
    };
  }

  const episodeId = parseInt(params.id);

  if (isNaN(episodeId)) {
    return {
      title: 'Episode Not Found',
    };
  }

  const episode = await getEpisodeById(episodeId);

  if (!episode) {
    return {
      title: 'Episode Not Found',
    };
  }

  const cleanSummary = episode.summary?.replace(/<[^>]*>/g, '').slice(0, 160);

  return {
    title: `${episode.name} - Powerpuff Girls`,
    description: cleanSummary,
  };
}

export default async function EpisodePage({ searchParams }: EpisodePageProps) {
  const params = await searchParams;

  if (!params.id) {
    notFound();
  }

  const episodeId = parseInt(params.id);

  if (isNaN(episodeId)) {
    notFound();
  }

  const episode = await getEpisodeById(episodeId);

  if (!episode) {
    notFound();
  }

  return (
    <Container className="py-8 md:py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/" className="text-purple-600 hover:text-purple-800">
              Home
            </Link>
          </li>
          <li className="text-gray-400" aria-hidden="true">
            /
          </li>
          <li className="text-gray-600" aria-current="page">
            {episode.name}
          </li>
        </ol>
      </nav>

      {/* Episode Details */}
      <article className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          {episode.image?.original && (
            <div className="md:w-1/3 relative">
              <div className="relative h-64 md:h-full min-h-75">
                <Image
                  src={episode.image.original}
                  alt={`${episode.name} cover image`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority
                />
              </div>
            </div>
          )}

          <div className="flex-1 p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{episode.name}</h1>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
              <span>Season {episode.season}</span>
              <span>Episode {episode.number}</span>
              {episode.runtime && <span>{episode.runtime} minutes</span>}
              {episode.airdate && (
                <span>Aired: {episode.airdate.split('-').reverse().join('/')}</span>
              )}
            </div>

            {episode.summary && (
              <div
                dangerouslySetInnerHTML={{ __html: episode.summary }}
                className="prose prose-gray max-w-none text-gray-900"
              />
            )}

            <div className="mt-8">
              <Link href="/">
                <Button variant="primary">← Back to Episodes</Button>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </Container>
  );
}
