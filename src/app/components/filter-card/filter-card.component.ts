import { Component, effect, inject, Input, input, OnInit, signal, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Knob } from 'primeng/knob';
import { IMovie } from '../../interfaces/movie';

@Component({
  selector: 'app-filter-card',
  imports: [FormsModule, Knob],
  templateUrl: './filter-card.component.html',
  styleUrl: './filter-card.component.scss'
})
export class FilterCardComponent {
  private readonly constURL = `https://image.tmdb.org/t/p/w500`;
  @Input() movieCardObj?: IMovie;
  movieCardAveragePopularity = signal(0);
  movieCardThumbnailImg = signal("");
  movieCardTitle = signal("");

  constructor() {
    effect(() => {
      this.movieCardThumbnailImg.set(this.constURL + (this.movieCardObj?.poster_path ?? ""));
      this.movieCardAveragePopularity.set(parseFloat(((this.movieCardObj?.vote_average ?? 0) * 10).toFixed(2)));
      this.movieCardTitle.set(this.movieCardObj?.title ?? "");
    })
  }
}
