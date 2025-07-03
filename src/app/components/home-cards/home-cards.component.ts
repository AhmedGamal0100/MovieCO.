import { Component, effect, inject, OnInit, signal, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Knob } from 'primeng/knob';
import { ApiStore } from '../../store/api.store';
import { IMovie } from '../../interfaces/movie';

@Component({
  selector: 'app-home-cards',
  imports: [FormsModule, Knob],
  templateUrl: './home-cards.component.html',
  styleUrl: './home-cards.component.scss'
})
export class HomeCardsComponent {
  private readonly constURL = `https://image.tmdb.org/t/p/w500`
  private _apiStore = inject(ApiStore);
  movieCardObj = signal<IMovie>({
    adult: false,
    backdrop_path: '',
    genre_ids: [],
    id: 0,
    original_language: '',
    original_title: '',
    overview: '',
    popularity: 0,
    poster_path: '',
    release_date: '',
    title: '',
    video: false,
    vote_average: 0,
    vote_count: 0
  });
  movieCardAveragePopularity = signal(0);
  movieCardThumbnailImg = signal("");
  movieCardTitle = signal("");
  movieCardDate = signal("");

  constructor() {
    effect(() => {
      this.movieCardObj.set((this._apiStore.getPopularMovies()[0]) as (IMovie));
      this.movieCardThumbnailImg.set(this.constURL + this.movieCardObj().poster_path);
      this.movieCardAveragePopularity.set(parseFloat(this.movieCardObj().vote_average.toFixed(2)));
      this.movieCardTitle.set(this.movieCardObj().title);
      this.movieCardDate.set(this.movieCardObj().release_date);
    })
  }
}
