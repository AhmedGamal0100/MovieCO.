import { Component, effect, inject, signal } from '@angular/core';
import { HomeMovieCardComponent } from "../home-movie-card/home-movie-card.component";
import { Carousel } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { ApiStore } from '../../store/api.store';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-home-movie-slider',
  imports: [HomeMovieCardComponent, Carousel, ButtonModule, RouterModule],
  templateUrl: './home-movie-slider.component.html',
  styleUrl: './home-movie-slider.component.scss'
})
export class HomeMovieSliderComponent {
  private _apiStore = inject(ApiStore);
  movieIds = signal<number[]>([]);
  responsiveOptions: any[] | undefined;

  ngOnInit() {
    this.responsiveOptions = [
      {
        breakpoint: '1440px',
        numVisible: 3,
        numScroll: 1
      },
      {
        breakpoint: '1199px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1
      }
    ]
  }
  constructor() {
    effect(() => {
      const ids = this._apiStore.moviesIds();
      this.movieIds.set(ids);
    })
  }
}
