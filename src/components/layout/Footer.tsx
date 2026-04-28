import { Container } from './Container';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <Container className="py-6">
        <div className="text-center text-sm">
          <p>
            Data provided by{' '}
            <a
              href="https://www.tvmaze.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300"
            >
              TVMaze
            </a>
          </p>
          <p className="mt-1">© {new Date().getFullYear()} Powerpuff Girls Explorer</p>
        </div>
      </Container>
    </footer>
  );
}
