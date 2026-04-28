import { Container } from '@/components/layout/Container';
import { EpisodeSearch } from '@/components/features/episodes/EpisodeSearch';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ShowHeader } from '@/components/features/show/ShowHeader';
import { Suspense } from 'react';
import { getEpisodes } from '@/lib/api/episodes';
import { getShow } from '@/lib/api/shows';

export default async function HomePage() {
  const [show, episodes] = await Promise.all([getShow(), getEpisodes()]);

  return (
    <main>
      <ShowHeader show={show} />

      <Container className="py-8 md:py-12">
        <Suspense fallback={<LoadingSpinner />}>
          <EpisodeSearch episodes={episodes} />
        </Suspense>
      </Container>
    </main>
  );
}
