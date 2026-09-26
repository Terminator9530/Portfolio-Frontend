import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameService } from '../../services/game.service';
import { Game } from '../../models/game.model';

@Component({
  selector: 'app-games-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './games-section.component.html',
  styleUrl: './games-section.component.scss'
})
export class GamesSectionComponent {
  readonly gameService = inject(GameService);

  onSearchChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.gameService.setSearch(input.value);
  }

  clearSearch() {
    this.gameService.setSearch('');
  }

  selectGenre(genre: string) {
    this.gameService.setGenre(genre);
  }

  openGameDetails(game: Game) {
    this.gameService.openModal(game);
  }

  getReleaseYear(dateStr?: string): string {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? dateStr : d.getFullYear().toString();
  }
}
