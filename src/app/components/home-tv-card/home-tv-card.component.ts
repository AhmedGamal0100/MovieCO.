import { Component, effect, Input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Knob } from 'primeng/knob';
import { ITv } from '../../interfaces/tv';

@Component({
  selector: 'app-home-tv-card',
  imports: [FormsModule, Knob],
  templateUrl: './home-tv-card.component.html',
  styleUrl: './home-tv-card.component.scss'
})
export class HomeTvCardComponent {
  private readonly constURL = `https://image.tmdb.org/t/p/w500`;
  @Input() showCardObj?: ITv;
  showCardAveragePopularity = signal(0);
  showCardThumbnailImg = signal("");
  showCardTitle = signal("");

  constructor() {
    effect(() => {
      this.showCardThumbnailImg.set(this.constURL + (this.showCardObj?.poster_path ?? ""));
      this.showCardAveragePopularity.set(parseFloat(((this.showCardObj?.vote_average ?? 0) * 10).toFixed(2)));
      this.showCardTitle.set(this.showCardObj?.name ?? "");
    })
  }
}
