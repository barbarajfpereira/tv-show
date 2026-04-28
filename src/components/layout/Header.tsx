'use client';

import { Container } from './Container';
import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-linear-to-r from-purple-600 to-pink-600 shadow-lg">
      <Container>
        <div className="flex items-center h-16">
          <Link
            href="/"
            className="text-white text-xl font-bold hover:text-purple-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white rounded px-2 py-1"
            aria-label="Home"
          >
            Powerpuff Explorer
          </Link>
        </div>
      </Container>
    </header>
  );
}
