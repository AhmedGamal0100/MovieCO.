import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { IAccount } from '../interfaces/account';
import { effect, inject } from '@angular/core';
import { ApiService } from '../services/api.service';
import { IMovie } from '../interfaces/movie';
import { Subscription } from 'rxjs';

let subscription = new Subscription

export const ApiStore = signalStore(
  { providedIn: 'root' },
  withState({
    popularMovies: [{}],
  }),

  withComputed((state) => ({
    getPopularMovies: state.popularMovies
  })),

  withMethods((state) => {
    return {
      loginMethod: () => {

      },

      logoutMethod: () => {

      },

    };
  }),

  withHooks({
    onInit(state) {
      const apiService = inject(ApiService);
      subscription = apiService.getMovies().subscribe({
        next: (data: any) => {
          patchState(state, { popularMovies: data.results as (IMovie[]) });
        },
        error: err => console.error('Failed to load API', err)
      });

      effect(() => {
      })
    },

    onDestroy() {
      subscription.unsubscribe()
    }
  })
);