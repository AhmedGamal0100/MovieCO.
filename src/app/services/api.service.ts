import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _http = inject(HttpClient);
  private readonly headers = {
    headers: {
      "accept": "application/json",
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZGQxMGQyYjhmNTJiYzBhNTMyMGQ1YzlkODhiZDFmZiIsIm5iZiI6MTU5Mjc1NTkwMS44MjgsInN1YiI6IjVlZWY4NmJkZWQyYWMyMDAzNTlkNGM4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NT77KLEZLjsgTMnyjJQBWADPa_t_7ydLLbvEABTxbwM"
    }
  }

  getMovies(lang: string = 'en-US', page: number = 1) {
    return this._http.get(
      `https://api.themoviedb.org/3/movie/now_playing?language=${lang}&page=${page}`, this.headers);
  }
  getMoviesPopular(lang: string = 'en-US', page: number = 1) {
    return this._http.get(
      `https://api.themoviedb.org/3/movie/popular?language=${lang}&page=${page}`, this.headers);
  }
  getMoviesUpComing(lang: string = 'en-US', page: number = 1) {
    return this._http.get(
      `https://api.themoviedb.org/3/movie/upcoming?language=${lang}&page=${page}`, this.headers);
  }
  getTvShows(lang: string = 'en-US', page: number = 1) {
    return this._http.get(
      `https://api.themoviedb.org/3/tv/top_rated?language=${lang}&page=${page}`, this.headers);
  }
  // getDetailedMovie(id: number = 1278950) {
  //   return this._http.get(
  //     `/api/movie/${id}?language=en-US`, this.headers);
  // }
}
