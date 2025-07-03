import { Component, effect, inject, signal } from '@angular/core';
import { ApiStore } from '../../store/api.store';
import { Carousel } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { HomeTvCardComponent } from "../home-tv-card/home-tv-card.component";
import { ITv } from '../../interfaces/tv';

@Component({
  selector: 'app-home-tvshows-slider',
  imports: [Carousel, ButtonModule, HomeTvCardComponent],
  templateUrl: './home-tvshows-slider.component.html',
  styleUrl: './home-tvshows-slider.component.scss'
})
export class HomeTvshowsSliderComponent {
  private _apiStore = inject(ApiStore);
  showCardObjs = signal<ITv[]>([{
    adult: false,
    backdrop_path: '',
    genre_ids: [],
    id: 0,
    genre_country: [],
    original_language: '',
    original_name: '',
    overview: '',
    popularity: 0,
    poster_path: '',
    first_air_date: '',
    name: '',
    vote_average: 0,
    vote_count: 0
  }]);
  responsiveOptions: any[] | undefined;

  ngOnInit() {
    this.responsiveOptions = [
      {
        breakpoint: '1440px',
        numVisible: 6,
        numScroll: 1
      },
      {
        breakpoint: '1199px',
        numVisible: 6,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 4,
        numScroll: 1
      },
      {
        breakpoint: '575px',
        numVisible: 2,
        numScroll: 1
      }
    ]
  }
  constructor() {
    effect(() => {
      this.showCardObjs.set((this._apiStore.tvShow()) as (ITv[]));
    })
  }
}
