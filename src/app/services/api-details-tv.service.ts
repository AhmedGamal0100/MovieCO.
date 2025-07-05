import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiDetailsTvService {
  private _http = inject(HttpClient);
  private readonly headers = {
    headers: {
      "accept": "application/json",
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZGQxMGQyYjhmNTJiYzBhNTMyMGQ1YzlkODhiZDFmZiIsIm5iZiI6MTU5Mjc1NTkwMS44MjgsInN1YiI6IjVlZWY4NmJkZWQyYWMyMDAzNTlkNGM4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NT77KLEZLjsgTMnyjJQBWADPa_t_7ydLLbvEABTxbwM"
    }
  }

  getDetailedTv(id: number = 1278950, lang: string = "en_US"): Observable<Object> {
    return this._http.get(
      `/api/tv/${id}?/language=${lang}`, this.headers);
  }
  getDetailedReviewTv(id: number = 1278950, lang: string = "en_US", page: number = 1): Observable<Object> {
    return this._http.get(
      `/api/tv/${id}/reviews?language=${lang}&page=${page}`, this.headers);
  }
  getDetailedRecommendationsTv(id: number = 1278950, lang: string = "en_US", page: number = 1): Observable<Object> {
    return this._http.get(
      `/api/tv/${id}/recommendations?language=${lang}&page=${page}`, this.headers);
  }
}
