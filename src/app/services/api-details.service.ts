import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiDetailsService {
  private _http = inject(HttpClient);
  private readonly headers = {
    headers: {
      "accept": "application/json",
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZGQxMGQyYjhmNTJiYzBhNTMyMGQ1YzlkODhiZDFmZiIsIm5iZiI6MTU5Mjc1NTkwMS44MjgsInN1YiI6IjVlZWY4NmJkZWQyYWMyMDAzNTlkNGM4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NT77KLEZLjsgTMnyjJQBWADPa_t_7ydLLbvEABTxbwM"
    }
  }

  getDetailedMovie(id: number = 1278950, lang: string = "en_US"): Observable<Object> {
    return this._http.get(
      `/api/movie/${id}?language=${lang}`, this.headers);
  }
  getDetailedReviewMovie(id: number = 1278950, lang: string = "en_US", page: number = 1): Observable<Object> {
    return this._http.get(
      `/api/movie/${id}/reviews?language=${lang}&page=${page}`, this.headers);
  }
  getDetailedRecommendations(id: number = 1278950, lang: string = "en_US", page: number = 1): Observable<Object> {
    return this._http.get(
      `/api/movie/${id}/recommendations?language=${lang}&page=${page}`, this.headers);
  }
}
