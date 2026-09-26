import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-modal.component.html',
  styleUrl: './game-modal.component.scss'
})
export class GameModalComponent {
  readonly gameService = inject(GameService);
  readonly loadedImages = signal<Record<string, boolean>>({});

  close() {
    this.gameService.closeModal();
  }

  onImageLoad(id: string) {
    this.loadedImages.update(prev => ({ ...prev, [id]: true }));
  }

  isImageLoaded(id: string): boolean {
    return !!this.loadedImages()[id];
  }

  getReleaseYear(dateStr?: string): string {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? dateStr : d.getFullYear().toString();
  }
}
