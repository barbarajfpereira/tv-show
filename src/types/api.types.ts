export interface TVShow {
  id: number;
  name: string;
  summary: string | null;
  image: {
    medium: string;
    original: string;
  } | null;
  genres: string[];
  rating: {
    average: number | null;
  };
  premiered: string | null;
  ended: string | null;
  status: string;
  language: string;
  runtime: number | null;
}

export interface Episode {
  id: number;
  name: string;
  summary: string | null;
  number: number;
  season: number;
  image: {
    medium: string;
    original: string;
  } | null;
  runtime: number | null;
  airdate: string | null;
  url: string;
}

export interface ApiError {
  message: string;
  status?: number;
}
