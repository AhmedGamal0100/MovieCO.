import { Component, effect, inject, signal } from '@angular/core';
import { ITv } from '../../interfaces/tv';
import { ApiDetailsTvStore } from '../../store/api-details-tv.store';
import { Router } from '@angular/router';
import { HomeCardsComponent } from "../home-cards/home-cards.component";
import { Carousel } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-detail-similar-tv-slider',
  imports: [HomeCardsComponent, Carousel, ButtonModule],
  templateUrl: './detail-similar-tv-slider.component.html',
  styleUrl: './detail-similar-tv-slider.component.scss'
})
export class DetailSimilarTvSliderComponent {
  private _apiDetailsTvStore = inject(ApiDetailsTvStore);
  private _router = inject(Router);
  tvCardObjs = signal<ITv[]>([]);
  responsiveOptions: any[] | undefined;

  constructor() {
    effect(() => {
      const currentTvId = this._apiDetailsTvStore.id();
      const recommendations = this._apiDetailsTvStore.detailedRecommendationsTv();

      if (currentTvId && recommendations?.length) {
        this.tvCardObjs.set(recommendations as ITv[]);
      } else {
        this.tvCardObjs.set([]);
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

  routeToDetails(tvShow: ITv) {
    this._router.navigateByUrl('/home/details-tv/' + tvShow.id);
  }
}
