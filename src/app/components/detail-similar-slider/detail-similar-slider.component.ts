import { Component, effect, inject, signal } from '@angular/core';
import { HomeCardsComponent } from "../home-cards/home-cards.component";
import { IMovie } from '../../interfaces/movie';
import { Carousel } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { ApiDetailsStore } from '../../store/api-details.store';

@Component({
  selector: 'app-detail-similar-slider',
  standalone: true,
  imports: [HomeCardsComponent, Carousel, ButtonModule],
  templateUrl: './detail-similar-slider.component.html',
  styleUrl: './detail-similar-slider.component.scss'
})
export class DetailSimilarSliderComponent {
  private _apiDetailsStore = inject(ApiDetailsStore);
  private _router = inject(Router);
  movieCardObjs = signal<IMovie[]>([]);
  responsiveOptions: any[] | undefined;

  constructor() {
    effect(() => {
      const currentMovieId = this._apiDetailsStore.id();
      const recommendations = this._apiDetailsStore.detailedRecommendations();

      if (currentMovieId && recommendations?.length) {
        this.movieCardObjs.set(recommendations as IMovie[]);
      } else {
        this.movieCardObjs.set([]);
      }
    });
  }

  ngOnInit() {
    this.responsiveOptions = [
      { breakpoint: '1440px', numVisible: 6, numScroll: 1 },
      { breakpoint: '1199px', numVisible: 6, numScroll: 1 },
      { breakpoint: '767px', numVisible: 4, numScroll: 1 },
      { breakpoint: '575px', numVisible: 2, numScroll: 1 }
    ];
  }

  routeToDetails(movie: IMovie) {
    this._router.navigateByUrl('/home/details/' + movie.id);
  }
}
