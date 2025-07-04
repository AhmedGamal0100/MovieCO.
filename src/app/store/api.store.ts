import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { IAccount } from '../interfaces/account';
import { effect, inject } from '@angular/core';
import { ApiService } from '../services/api.service';
import { IMovie } from '../interfaces/movie';
import { Subscription } from 'rxjs';

let subscription = new Subscription
let subscriptionPopular = new Subscription
let subscriptionUpComing = new Subscription
let subscriptionTvShow = new Subscription

export const ApiStore = signalStore(
  { providedIn: 'root' },
  withState({
    nowPlayingMovies: [{}],
    popularMovies: [{}],
    upComingMovies: [{}],
    moviesIds: [0],
    tvShow: [{}],
    lang: "en-US",
    page: 1
  }),

  withMethods((state) => {
    return {
      setLanguage(lang: string) {
        patchState(state, { lang });
      },
      setPage(page: number) {
        patchState(state, { page });
      }
    };
  }),

  withHooks({
    onInit(state) {
      const apiService = inject(ApiService);

      // Now Playing Movies
      effect(() => {
        subscription = apiService.getMovies(state.lang(), state.page()).subscribe({
          next: (data: any) => {
            patchState(state, { nowPlayingMovies: data.results as (IMovie[]) });
          },
          error: err => console.error('Failed to load API', err)
        });

        // Now Popular
        subscriptionPopular = apiService.getMoviesPopular(state.lang(), state.page()).subscribe({
          next: (data: any) => {
            patchState(state, { popularMovies: data.results as (IMovie[]) });
            patchState(state, {
              moviesIds: [
                ...data.results.map((movie: IMovie) => movie.id)
              ]
            });
          },
          error: err => console.error('Failed to load API', err)
        });

        // Now Up Coming
        subscriptionUpComing = apiService.getMoviesUpComing(state.lang(), state.page()).subscribe({
          next: (data: any) => {
            patchState(state, { upComingMovies: data.results as (IMovie[]) });
          },
          error: err => console.error('Failed to load API', err)
        });

        // Now Tv Show
        subscriptionUpComing = apiService.getTvShows(state.lang(), state.page()).subscribe({
          next: (data: any) => {
            patchState(state, { tvShow: data.results as (IMovie[]) });
          },
          error: err => console.error('Failed to load API', err)
        });
      });
    },

    onDestroy() {
      subscription.unsubscribe()
      subscriptionPopular.unsubscribe()
      subscriptionUpComing.unsubscribe()
      subscriptionTvShow.unsubscribe()
    }
  })
);