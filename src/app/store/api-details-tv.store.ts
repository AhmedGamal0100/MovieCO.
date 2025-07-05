import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { effect, inject } from '@angular/core';
import { ApiDetailsService } from '../services/api-details.service';
import { IMovieDetails } from '../interfaces/movie-details';
import { IMovieDetailsReview } from '../interfaces/movie-details-review';
import { IMovie } from '../interfaces/movie';
import { Subscription } from 'rxjs';
import { ITv } from '../interfaces/tv';
import { ITvDetailsReview } from '../interfaces/tv-details-review';
import { ITvDetails } from '../interfaces/tv-details';
import { ApiDetailsTvService } from '../services/api-details-tv.service';

let detailedTvSub = new Subscription();
let reviewSubTv = new Subscription();
let recommendationSubTv = new Subscription();

export const ApiDetailsTvStore = signalStore(
  { providedIn: 'root' },
  withState({
    detailedTv: null as ITvDetails | null,
    detailedReviewTv: [] as ITvDetailsReview[],
    detailedRecommendationsTv: [] as ITv[],
    id: 0,
    lang: "en-US",
    page: 1
  }),

  withMethods((state) => ({
    setLanguage(lang: string) {
      patchState(state, { lang });
    },
    setId(id: number) {
      patchState(state, { id });
    },
    setPage(page: number) {
      patchState(state, { page });
    }
  })),

  withHooks({
    onInit(state) {
      const apiDetailsService = inject(ApiDetailsTvService);

      effect(() => {
        const id = state.id();
        const lang = state.lang();
        const page = state.page();

        if (!id) return;

        // Fetch detailed tv
        detailedTvSub.unsubscribe();
        detailedTvSub = apiDetailsService.getDetailedTv(id, lang).subscribe({
          next: (data) => {
            patchState(state, { detailedTv: data as ITvDetails });
          },
          error: err => console.error('Failed to load movie details', err)
        });

        // Fetch reviews tv
        reviewSubTv.unsubscribe();
        reviewSubTv = apiDetailsService.getDetailedReviewTv(id, lang, page).subscribe({
          next: (data: any) => {
            patchState(state, { detailedReviewTv: data.results });
          },
          error: err => console.error('Failed to load reviews', err)
        });

        // Fetch recommendations tv
        recommendationSubTv.unsubscribe();
        recommendationSubTv = apiDetailsService.getDetailedRecommendationsTv(id, lang, page).subscribe({
          next: (data: any) => {
            patchState(state, { detailedRecommendationsTv: data.results });
          },
          error: err => console.error('Failed to load recommendations', err)
        });
      });
    },
    
    onDestroy() {
      detailedTvSub.unsubscribe();
      reviewSubTv.unsubscribe();
      recommendationSubTv.unsubscribe();
    }
  })
);
