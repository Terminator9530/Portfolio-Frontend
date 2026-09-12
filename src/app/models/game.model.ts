export interface Game {
  id: string;
  name: string;
  tagline: string;
  image: string;
  link: string;
  repoLink?: string;
  genre: 'Action' | 'Sci-Fi' | 'RPG' | 'Arcade' | 'Puzzle' | 'Adventure' | 'Strategy' | 'Word' | string;
  badge?: string;
  rating?: number;
  status: 'Live' | 'Beta' | 'Concept';
  description: string;
  tags: string[];
  engine: string;
  releaseYear: string;
  featured?: boolean;
}
