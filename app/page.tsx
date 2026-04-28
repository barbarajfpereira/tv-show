import { Suspense } from 'react';
import { getShow } from '@/lib/api/shows';
import { getEpisodes } from '@/lib/api/episodes';
import { ShowHeader } from '@/components/features/show/ShowHeader';
import { PaginatedEpisodeList } from '@/components/features/episodes/PaginatedEpisodeList';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Container } from '@/components/layout/Container';

export default async function HomePage() {
  const [show, episodes] = await Promise.all([getShow(), getEpisodes()]);

  return (
    <main>
      <ShowHeader show={show} />

      <Container className="py-8 md:py-12">
        <Suspense fallback={<LoadingSpinner />}>
          <section id="episodes-section" aria-labelledby="episodes-heading">
            <h2 id="episodes-heading" className="text-2xl md:text-3xl font-bold text-white mb-6">
              All Episodes ({episodes.length})
            </h2>
            <PaginatedEpisodeList episodes={episodes} />
          </section>
        </Suspense>
      </Container>
    </main>
  );
}
