import { Component, effect, Inject, inject, signal } from '@angular/core';
import { ApiStore } from '../../store/api.store';
import { Carousel } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { HomeTvCardComponent } from "../home-tv-card/home-tv-card.component";
import { ITv } from '../../interfaces/tv';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-tvshows-slider',
  imports: [Carousel, ButtonModule, HomeTvCardComponent, RouterModule],
  templateUrl: './home-tvshows-slider.component.html',
  styleUrl: './home-tvshows-slider.component.scss'
})
export class HomeTvshowsSliderComponent {
  private _apiStore = inject(ApiStore);
  private _router = inject(Router);
  showCardObjs = signal<ITv[]>([]);
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

  routeToDetails(tvShow: ITv) {    
    this._router.navigateByUrl('/home/details-tv/' + tvShow.id);
  }

  constructor() {
    effect(() => {
      this.showCardObjs.set((this._apiStore.tvShow()) as (ITv[]));
    })
  }
}
