import { Component, inject, input, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ApiStore } from '../../store/api.store';
import { ApiService } from '../../services/api.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-movie-card',
  imports: [CommonModule],
  templateUrl: './home-movie-card.component.html',
  styleUrl: './home-movie-card.component.scss'
})
export class HomeMovieCardComponent {
  private _apiService = inject(ApiService);
  subscription = new Subscription
  videoUrl: SafeResourceUrl | undefined;
  sanitizer = inject(DomSanitizer);
  movieCardId = input<number>();
  private _http = inject(HttpClient);
  private headers = {
    headers: {
      "accept": "application/json",
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZGQxMGQyYjhmNTJiYzBhNTMyMGQ1YzlkODhiZDFmZiIsIm5iZiI6MTU5Mjc1NTkwMS44MjgsInN1YiI6IjVlZWY4NmJkZWQyYWMyMDAzNTlkNGM4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NT77KLEZLjsgTMnyjJQBWADPa_t_7ydLLbvEABTxbwM"
    }
  }
  ngOnInit() {
    this.subscription = this._http.get(`/api/movie/${this.movieCardId()}/videos`, this.headers).subscribe({
      next: (data: any) => {
        const trailer = data.results.find((video: any) => video.type === 'Trailer' && video.site === 'YouTube');
        if (trailer) {
          this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            `https://www.youtube.com/embed/${trailer.key}`
          );
        } else {
          console.warn('No trailer found');
          this.videoUrl = undefined;
        }
      },
      error: err => console.error('Failed to load API', err)
    });
  }
  onTrailerLoaded() {
  this.loading.set(false);
}

}
