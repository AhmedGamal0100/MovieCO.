import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { effect, inject } from '@angular/core';
import { ApiService } from '../services/api.service';
import { IMovie } from '../interfaces/movie';
import { Subscription } from 'rxjs';
import { ITv } from '../interfaces/tv';

let subscriptionNowPlaying = new Subscription();
let subscriptionPopular = new Subscription();
let subscriptionUpComing = new Subscription();
let subscriptionTvShow = new Subscription();

export const ApiStore = signalStore(
  { providedIn: 'root' },
  withState({
    nowPlayingMovies: [] as IMovie[],
    popularMovies: [] as IMovie[],
    upComingMovies: [] as IMovie[],
    tvShow: [] as ITv[],
    moviesIds: [] as number[],
    lang: "en-US",
    popularMoviesTotal: 0,
    comingMoviesTotal: 0,
    playingMoviesTotal: 0,
    page: 1,
  }),

  withMethods((state) => {
    const apiService = inject(ApiService);
    return {
      setLanguage(lang: string) {
        patchState(state, { lang });
      },
      setPagePopular(page: number) {
        patchState(state, { page });
        subscriptionPopular.unsubscribe();
        subscriptionPopular = apiService.getMoviesPopular(state.lang(), page).subscribe({
          next: (data: any) => {
            patchState(state, {
              popularMovies: data.results as IMovie[],
              popularMoviesTotal: data.total_results
            });
          },
          error: (err) => console.error('Failed to fetch popular movies', err)
        });
      },
      setPagePlaying(page: number) {
        patchState(state, { page });
        subscriptionPopular.unsubscribe();
        subscriptionPopular = apiService.getMovies(state.lang(), page).subscribe({
          next: (data: any) => {
            patchState(state, {
              nowPlayingMovies: data.results as IMovie[],
              playingMoviesTotal: data.total_results
            });
          },
          error: (err) => console.error('Failed to fetch popular movies', err)
        });
      },
      setPageComing(page: number) {
        patchState(state, { page });
        subscriptionPopular.unsubscribe();
        subscriptionPopular = apiService.getMoviesUpComing(state.lang(), page).subscribe({
          next: (data: any) => {
            patchState(state, {
              upComingMovies: data.results as IMovie[],
              comingMoviesTotal: data.total_results
            });
          },
          error: (err) => console.error('Failed to fetch popular movies', err)
        });
      },
    };
  }),

  withHooks({
    onInit(state) {
      const apiService = inject(ApiService);

      effect(() => {
        const lang = state.lang();
        const page = state.page();

        // Now Playing Movies
        subscriptionNowPlaying.unsubscribe();
        subscriptionNowPlaying = apiService.getMovies(lang, page).subscribe({
          next: (data: any) => {
            patchState(state, { nowPlayingMovies: data.results as IMovie[] });
          },
          error: err => console.error('Failed to load now playing movies', err)
        });

        // Popular Movies
        subscriptionPopular.unsubscribe();
        subscriptionPopular = apiService.getMoviesPopular(lang, page).subscribe({
          next: (data: any) => {
            patchState(state, {
              popularMovies: data.results as IMovie[],
              moviesIds: data.results.map((movie: IMovie) => movie.id)
            });
          },
          error: err => console.error('Failed to load popular movies', err)
        });

        // Up Coming Movies
        subscriptionUpComing.unsubscribe();
        subscriptionUpComing = apiService.getMoviesUpComing(lang, page).subscribe({
          next: (data: any) => {
            patchState(state, { upComingMovies: data.results as IMovie[] });
          },
          error: err => console.error('Failed to load upcoming movies', err)
        });

        // TV Shows
        subscriptionTvShow.unsubscribe();
        subscriptionTvShow = apiService.getTvShows(lang, page).subscribe({
          next: (data: any) => {
            patchState(state, { tvShow: data.results as ITv[] });
          },
          error: err => console.error('Failed to load TV shows', err)
        });
      });
    },

    onDestroy() {
      subscriptionNowPlaying.unsubscribe();
      subscriptionPopular.unsubscribe();
      subscriptionUpComing.unsubscribe();
      subscriptionTvShow.unsubscribe();
    }
  })
);
