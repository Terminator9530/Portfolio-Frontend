import { Injectable, computed, signal } from '@angular/core';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly initialGames: Game[] = [
    {
      id: 'atomic-reaction',
      name: 'Atomic Reaction',
      tagline: 'Real-time multiplayer atomic reaction strategy where critical mass dominates the grid.',
      image: 'atomic-reaction.png',
      link: 'https://atomic-reaction-rose.vercel.app/',
      genre: 'Strategy',
      badge: 'Real-Time Multiplayer',
      status: 'Live',
      engine: 'Angular 19 · Node.js · Socket.io',
      releasedDate: '2026-09-12T17:00:00Z',
      featured: false,
      tags: ['Multiplayer', 'Socket.io', 'Node.js', 'Angular 19', 'Chain Reaction', 'Strategy Grid'],
      description: 'An explosive real-time multiplayer board strategy game. Players take turns placing orbs inside grid cells; when a cell reaches critical mass, it bursts outward in a chain reaction, converting opponent atoms and capturing territory across the live board.'
    },
    {
      id: 'guess-the-word',
      name: 'Guess the Word',
      tagline: 'Fast-paced live multiplayer word puzzle challenge with real-time scoring.',
      image: 'guess-the-word.png',
      link: 'https://guess-the-word-roan.vercel.app/',
      genre: 'Puzzle',
      badge: 'Live Multiplayer',
      status: 'Live',
      engine: 'Angular 19 · Node.js · Socket.io',
      releasedDate: '2026-09-12T17:00:00Z',
      featured: false,
      tags: ['Word Puzzle', 'Socket.io', 'Node.js', 'Angular 19', 'Real-Time Sync', 'Leaderboard'],
      description: 'A competitive real-time multiplayer word guessing game. Test your vocabulary against friends with live room lobbies, instant socket-synchronized turns, interactive hints, and dynamic scoreboards powered by Node.js and Socket.io.'
    },
    {
      id: 'scenery-search',
      name: 'Scenery Search',
      tagline: 'Uncover hidden clues and solve mysteries across scenic detective landscapes.',
      image: 'scenery-search.png',
      link: 'https://scenery-search.vercel.app/',
      genre: 'Puzzle',
      badge: 'Hidden Object Mystery',
      status: 'Live',
      engine: 'Angular 19',
      releasedDate: '2026-09-26T09:30:00Z',
      featured: true,
      tags: ['Hidden Object', 'Mystery', 'Detective', 'Visual Puzzle', 'Angular 19'],
      description: 'An engaging hidden object mystery game where sharp observation reveals cleverly concealed clues and artifacts across rich atmospheric scenes. Features interactive scene investigations, timer challenges, and detective puzzle progression built with Angular 19.'
    }
  ];

  // Reactive state using Angular 19 Signals
  readonly games = signal<Game[]>(this.initialGames);
  readonly selectedGenre = signal<string>('All');
  readonly searchQuery = signal<string>('');
  readonly activeGameModal = signal<Game | null>(null);

  // Dynamic Genre categories extracted from games
  readonly genres = computed(() => {
    const list = Array.from(new Set(this.games().map(g => g.genre)));
    return ['All', ...list];
  });

  // Computed filtered list
  readonly filteredGames = computed(() => {
    const genre = this.selectedGenre();
    const query = this.searchQuery().trim().toLowerCase();
    const all = this.games();

    return all.filter(game => {
      const matchesGenre = genre === 'All' || game.genre.toLowerCase() === genre.toLowerCase();
      const matchesQuery = !query ||
        game.name.toLowerCase().includes(query) ||
        game.tagline.toLowerCase().includes(query) ||
        game.tags.some(t => t.toLowerCase().includes(query)) ||
        (game.engine?.toLowerCase().includes(query) ?? false);

      return matchesGenre && matchesQuery;
    });
  });

  // Featured flagship game
  readonly featuredGame = computed(() => {
    return this.games().find(g => g.featured) || this.games()[0];
  });

  // Actions
  setGenre(genre: string) {
    this.selectedGenre.set(genre);
  }

  setSearch(query: string) {
    this.searchQuery.set(query);
  }

  openModal(game: Game) {
    this.activeGameModal.set(game);
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.activeGameModal.set(null);
    document.body.style.overflow = 'auto';
  }
}
