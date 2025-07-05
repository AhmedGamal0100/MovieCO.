import { Component, effect, inject, signal } from '@angular/core';
import { HomeCardsComponent } from "../home-cards/home-cards.component";
import { ApiStore } from '../../store/api.store';
import { IMovie } from '../../interfaces/movie';
import { Carousel } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-popular-slider',
  imports: [HomeCardsComponent, Carousel, ButtonModule, RouterModule],
  templateUrl: './home-popular-slider.component.html',
  styleUrl: './home-popular-slider.component.scss'
})
export class HomePopularSliderComponent {
  private _apiStore = inject(ApiStore);
  private _router = inject(Router);
  movieCardObjs = signal<IMovie[]>([{
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

  routeToDetails(movie: IMovie) {
    this._router.navigateByUrl('/home/details/' + movie.id);
  }
  
  constructor() {
    effect(() => {
      this.movieCardObjs.set((this._apiStore.popularMovies()) as (IMovie[]));
    })
  }
}
