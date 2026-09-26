import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  readonly gameService = inject(GameService);
  readonly isHeroImageLoaded = signal(false);

  onHeroImageLoad() {
    this.isHeroImageLoaded.set(true);
  }


  scrollToGames() {
    const el = document.getElementById('games');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  playSpotlight() {
    const featured = this.gameService.featuredGame();
    if (featured) {
      this.gameService.openModal(featured);
    }
  }
}
