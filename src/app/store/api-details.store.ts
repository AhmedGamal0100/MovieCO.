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

let detailedMovieSub = new Subscription();
let reviewSub = new Subscription();
let recommendationSub = new Subscription();

export const ApiDetailsStore = signalStore(
  { providedIn: 'root' },
  withState({
    detailedMovie: null as IMovieDetails | null,
    detailedReview: [] as IMovieDetailsReview[],
    detailedRecommendations: [] as IMovie[],
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
      const apiDetailsService = inject(ApiDetailsService);

      effect(() => {
        const id = state.id();
        const lang = state.lang();
        const page = state.page();

        if (!id) return;

        // Fetch detailed movie
        detailedMovieSub.unsubscribe();
        detailedMovieSub = apiDetailsService.getDetailedMovie(id, lang).subscribe({
          next: (data) => {
            patchState(state, { detailedMovie: data as IMovieDetails });
          },
          error: err => console.error('Failed to load movie details', err)
        });

        // Fetch reviews movie
        reviewSub.unsubscribe();
        reviewSub = apiDetailsService.getDetailedReviewMovie(id, lang, page).subscribe({
          next: (data: any) => {
            patchState(state, { detailedReview: data.results });
          },
          error: err => console.error('Failed to load reviews', err)
        });

        // Fetch recommendations movie
        recommendationSub.unsubscribe();
        recommendationSub = apiDetailsService.getDetailedRecommendations(id, lang, page).subscribe({
          next: (data: any) => {
            patchState(state, { detailedRecommendations: data.results });
          },
          error: err => console.error('Failed to load recommendations', err)
        });
      });
    },
    
    onDestroy() {
      detailedMovieSub.unsubscribe();
      reviewSub.unsubscribe();
      recommendationSub.unsubscribe();
    }
  })
);
