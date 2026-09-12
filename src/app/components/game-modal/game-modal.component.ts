import { Component, inject } from '@angular/core';
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

  close() {
    this.gameService.closeModal();
  }
}
