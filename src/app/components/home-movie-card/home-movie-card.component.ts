import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-movie-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-movie-card.component.html',
  styleUrl: './home-movie-card.component.scss'
})
export class HomeMovieCardComponent {
  @Input() movieCardId!: number;

  videoUrl: SafeResourceUrl | undefined;
  sanitizer = inject(DomSanitizer);
  private _http = inject(HttpClient);

  private headers = {
    headers: {
      accept: "application/json",
      Authorization: "Bearer <your-token>"
    }
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['movieCardId']?.currentValue) {
      this.loadVideo(this.movieCardId);
    }
  }

  loadVideo(movieId: number) {
    this._http.get(`/api/movie/${movieId}/videos`, this.headers).subscribe({
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
}
