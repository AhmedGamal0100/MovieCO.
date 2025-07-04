import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { IAccount } from '../interfaces/account';
import { effect, inject } from '@angular/core';
import { ApiService } from '../services/api.service';
import { IMovie } from '../interfaces/movie';
import { Subscription } from 'rxjs';
import { ApiDetailsService } from '../services/api-details.service';
import { IMovieDetails } from '../interfaces/movie-details';
import { IMovieDetailsReview } from '../interfaces/movie-details-review';

let subscription = new Subscription;
let subscriptionReview = new Subscription;
let subscriptionRecommendations = new Subscription;

export const ApiDetailsStore = signalStore(
  { providedIn: 'root' },
  withState({
    detailedMovie: {},
    detailedReview: [{}] as IMovieDetailsReview[],
    detailedRecommendations: [{}] as IMovie[],
    id: 0,
    lang: "en-US",
    page: 1
  }),

  withMethods((state) => {
    return {
      setLanguage(lang: string) {
        patchState(state, { lang });
      },
      setId(id: number) {
        patchState(state, { id });
      },
      setPage(page: number) {
        patchState(state, { page });
      }
    };
  }),

  withHooks({
    onInit(state) {
      const apiDetailsService = inject(ApiDetailsService);

      effect(() => {
        const id = state.id();
        const lang = state.lang();
        const page = state.page();

        if (id) {
          // Fetching detailed movie information
          subscription.unsubscribe();
          subscription = apiDetailsService.getDetailedMovie(id, lang).subscribe({
            next: (data: any) => {
              patchState(state, { detailedMovie: data as IMovieDetails });
            },
            error: err => console.error('Failed to load API', err)
          });

          // Fetching detailed reviews
          subscriptionReview.unsubscribe();
          subscriptionReview = apiDetailsService.getDetailedReviewMovie(id, lang, page).subscribe({
            next: (data: any) => {
              patchState(state, { detailedReview: data.results as IMovieDetailsReview[] });
            },
            error: err => console.error('Failed to load API', err)
          });

          // Fetching detailed recommendations
          subscriptionRecommendations.unsubscribe();
          subscriptionRecommendations = apiDetailsService.getDetailedRecommendations(id, lang, page).subscribe({
            next: (data: any) => {
              patchState(state, { detailedRecommendations: data.results as IMovie[] });
            },
            error: err => console.error('Failed to load API', err)
          });
        }
      });
    },
    onDestroy() {
      subscription.unsubscribe()
      subscriptionReview.unsubscribe()
      subscriptionRecommendations.unsubscribe();
    }
  })
);