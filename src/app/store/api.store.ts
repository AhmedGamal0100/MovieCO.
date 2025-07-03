import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { IAccount } from '../interfaces/account';
import { effect, inject } from '@angular/core';
import { ApiService } from '../services/api.service';
import { IMovie } from '../interfaces/movie';
import { Subscription } from 'rxjs';

let subscription = new Subscription
let subscriptionPopular = new Subscription
let subscriptionUpComing = new Subscription

export const ApiStore = signalStore(
  { providedIn: 'root' },
  withState({
    nowPlayingMovies: [{}],
    popularMovies: [{}],
    upComingMovies: [{}],
  }),

  withComputed((state) => ({
    nowPlayingMovies: state.nowPlayingMovies,
    popularMovies: state.popularMovies,
    upComingMovies: state.upComingMovies
  })),

  withMethods((state) => {
    return {
    };
  }),

  withHooks({
    onInit(state) {
      const apiService = inject(ApiService);

      // Now Playing Movies
      subscription = apiService.getMovies().subscribe({
        next: (data: any) => {
          patchState(state, { nowPlayingMovies: data.results as (IMovie[]) });
        },
        error: err => console.error('Failed to load API', err)
      });

      // Now Popular
      subscriptionPopular = apiService.getMoviesPopular().subscribe({
        next: (data: any) => {
          patchState(state, { popularMovies: data.results as (IMovie[]) });
        },
        error: err => console.error('Failed to load API', err)
      });

      // Now Up Coming
      subscriptionUpComing = apiService.getMoviesUpComing().subscribe({
        next: (data: any) => {
          patchState(state, { upComingMovies: data.results as (IMovie[]) });
        },
        error: err => console.error('Failed to load API', err)
      });

    },

    onDestroy() {
      subscription.unsubscribe()
      subscriptionPopular.unsubscribe()
      subscriptionUpComing.unsubscribe()
    }
  })
);