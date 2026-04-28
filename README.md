# Powerpuff Girls TV Explorer

A modern web application built with Next.js 16.2.4 (App Router) and React 19 that allows users to explore episodes of The Powerpuff Girls (original 1998-2005 series) using the TVmaze API.

## Features

- ✅ **Show Details** - View show information, description, cover image, and episode list
- ✅ **Episode Details** - Click any episode to see title, summary, and cover image
- ✅ **Episode Search** - Real-time search with debouncing (300ms)
- ✅ **Pagination** - Load more button with "Show All" option (12 episodes per batch)
- ✅ **Responsive Design** - Works on mobile, tablet, and desktop
- ✅ **Accessibility** - ARIA labels, keyboard navigation, screen reader support
- ✅ **Performance** - Image optimization, priority loading, proper caching
- ✅ **Testing** - 26 unit/component tests with Vitest + Testing Library

## Tech Stack

| Technology      | Version | Purpose                                     |
| --------------- | ------- | ------------------------------------------- |
| Next.js         | 16.2.4  | React framework with App Router & Turbopack |
| React           | 19.2.4  | UI library with Server Components           |
| TypeScript      | 5.x     | Type safety and developer experience        |
| Tailwind CSS    | 4.x     | Styling and responsive design               |
| Vitest          | 4.1.5   | Unit and component testing                  |
| Testing Library | 16.3.2  | React component testing utilities           |
| ESLint          | 9.x     | Code linting                                |
| Prettier        | 3.8.3   | Code formatting                             |

## Architecture Decisions

### Server vs Client Components

- **Server Components**: Show details page, episode data fetching, initial render
- **Client Components**: Episode search, pagination, interactive elements

**Why this matters for Next.js 16:** Server Components reduce client-side JavaScript and improve initial load time. With React 19, Server Components are more stable and performant.

### Data Fetching Strategy

- Initial data fetched on server with `fetch()` and cached (revalidate: 3600)
- Client-side search for instant feedback (78 episodes total)
- Client-side pagination with "Load More" pattern (12 episodes per batch)

### State Management

- Server Component props for read-only episode data
- React hooks for search query and pagination state
- Custom `usePagination` and `useDebounce` hooks for reusable logic
- No external state libraries - React 19 hooks are sufficient for this scale

## Key Trade-offs

### Client-side vs Server-side Pagination

**Chose:** Client-side pagination with "Load More"  
**Why:** 78 episodes is small enough; reduces server requests; instant search  
**Improvement:** Server-side pagination for shows with 200+ episodes

### In-memory Favorites (Bonus Feature)

**Chose:** localStorage for persistence  
**Why:** No backend required, works offline, zero infrastructure cost  
**Improvement:** PostgreSQL + Prisma for multi-device sync

### Next.js 16 Specific Considerations

- **Turbopack** enabled for faster development builds
- **searchParams** handled as Promises (Next.js 16 pattern)
- **React 19** compatible with all hooks and Server Components

## Accessibility Features

- Semantic HTML (nav, main, article, section)
- ARIA labels on all interactive elements
- Full keyboard navigation with visible focus indicators
- Screen reader friendly with descriptive alt text
- Skip to content link for keyboard users
- WCAG 2.1 AA compliant

## Performance Optimizations

- `next/image` for automatic image optimization (Next.js 16)
- Priority loading for first 4 episodes
- Debounced search (300ms) to reduce re-renders
- Turbopack for faster development builds
- Lazy loading episodes below the fold

## Testing Strategy

### Test Results (26/26 Passing)

```bash
✓ src/lib/api/__tests__/episodes.test.ts (5 tests)
✓ src/hooks/__tests__/usePagination.test.ts (4 tests)
✓ src/hooks/__tests__/useDebounce.test.ts (2 tests)
✓ src/components/ui/__tests__/Button.test.tsx (3 tests)
✓ src/components/ui/__tests__/LoadMoreButton.test.tsx (4 tests)
✓ src/components/features/episodes/__tests__/EpisodeCard.test.tsx (3 tests)
✓ src/components/features/episodes/__tests__/PaginatedEpisodeList.test.tsx (3 tests)
✓ src/components/ui/__tests__/placeholder.test.tsx (2 tests)

Total: 8 test files, 26 tests passing
Test duration: ~6.78s
```

### Test Coverage

| Category      | Tests | Coverage                            |
| ------------- | ----- | ----------------------------------- |
| Components    | 13    | Interactions, rendering, edge cases |
| Hooks         | 6     | State management, async behavior    |
| API Utilities | 7     | Search, pagination, math            |

## Getting Started

### Prerequisites

- Node.js 18+
- npm (included with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/barbarajfpereira/tv-show.git

# Navigate to project
cd tv-show

# Install dependencies
npm install

# Run development server (with Turbopack)
npm run dev

# Run tests
npm test

# Run tests with UI
npm run test:ui

# Run linting
npm run lint

# Type check
npm run type-check

# Format code
npm run format

# Run all quality checks
npm run ci
```

## API Reference

Uses the public TVmaze API:

| Endpoint                 | Purpose                       |
| ------------------------ | ----------------------------- |
| GET /shows/1955          | The Powerpuff Girls show data |
| GET /shows/1955/episodes | All episodes (78 total)       |
| GET /episodes/{id}       | Single episode details        |

## Scripts Reference

| Script                | Purpose                         |
| --------------------- | ------------------------------- |
| npm run dev           | Start dev server with Turbopack |
| npm run build         | Production build                |
| npm run start         | Start production server         |
| npm run test          | Run Vitest tests                |
| npm run test:ui       | Run tests with UI               |
| npm run test:coverage | Run tests with coverage report  |
| npm run lint          | Check code style                |
| npm run type-check    | TypeScript validation           |
| npm run format        | Format code with Prettier       |
| npm run ci            | Run all quality checks          |

## What I Would Improve with More Time

- **Persistent Favorites Database** - Migrate from localStorage to PostgreSQL with Prisma
- **Authentication** - User accounts to sync favorites across devices
- **Infinite Scroll** - Replace "Load More" with intersection observer
- **E2E Tests** - Add Playwright for critical user journeys
- **Dark Mode** - Theme toggle with system preference detection
- **Server-Side Pagination** - For shows with 200+ episodes
- **URL Slugs** - Clean URLs like `/episode/1x01-episode-name`

## Acknowledgments

- Data provided by [TVmaze](https://www.tvmaze.com/)
- Built with [Next.js 16](https://nextjs.org/)
- Styled with [Tailwind CSS 4](https://tailwindcss.com/)
- Tested with [Vitest](https://vitest.dev/)

## Author

barbarajfpereira

## License

MIT
