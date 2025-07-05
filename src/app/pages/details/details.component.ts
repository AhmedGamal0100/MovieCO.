import { Component, effect, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Toast } from 'primeng/toast';
import { AccordionModule } from 'primeng/accordion';
import { MessageService } from 'primeng/api';
import { ApiStore } from '../../store/api.store';
import { NotificationStore } from '../../store/notification.store';
import { registerStore } from '../../store/register.store';
import { IMovieDetails } from '../../interfaces/movie-details';
import { IMovieDetailsReview } from '../../interfaces/movie-details-review';
import { IAccount } from '../../interfaces/account';
import { DetailSimilarSliderComponent } from "../../components/detail-similar-slider/detail-similar-slider.component";
import { ApiDetailsStore } from '../../store/api-details.store';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, Toast, AccordionModule, DetailSimilarSliderComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
  providers: [MessageService]
})
export class detailsComponent {
  private readonly constURL = `https://image.tmdb.org/t/p/w500`;
  private _apiDetailsStore = inject(ApiDetailsStore);
  private _apiStore = inject(ApiStore);
  private _registerStore = inject(registerStore);
  private _messageService = inject(MessageService);
  private _notificationStore = inject(NotificationStore);
  private router = inject(Router);
  readonly id = input<number>();

  movieDetails = signal<IMovieDetails | null>(null);
  movieReviews = signal<IMovieDetailsReview[]>([]);
  movieRecommendations = signal<number>(0);
  isWishlisted = signal(false);
  isLoggedIn = signal(false);

  getBackdropUrl = signal('');
  getPosterUrl = signal('');
  sampleReview = signal('');

  constructor() {
    effect(() => {
      const details = this._apiDetailsStore.detailedMovie();
      // const movieId = Number(this.route.snapshot.paramMap.get('id'));
      if (!this.id()) {
        this.router.navigate(['/home']);
        return;
      }

      this._apiDetailsStore.setId(this.id()!);
      this._apiDetailsStore.setLanguage(this._apiStore.lang() || 'en-US');
      this._apiDetailsStore.setPage(1);

      if (!details) return;

      this.movieDetails.set(details);
      this.sampleReview.set(details.overview);
      this.getBackdropUrl.set(this.constURL + details.backdrop_path);
      this.getPosterUrl.set(this.constURL + details.poster_path);
      this.movieReviews.set(this._apiDetailsStore.detailedReview());
      this.movieRecommendations.set(this._apiDetailsStore.detailedRecommendations().length);

      const loggedAccountJSON = sessionStorage.getItem("user_id");
      if (loggedAccountJSON) {
        this.isLoggedIn.set(true);
        const loggedAccount = JSON.parse(loggedAccountJSON) as IAccount;
        this.isWishlisted.set(
            loggedAccount.wishList?.movies?.some(movie => movie.id == details.id) ?? false
          );       
  } else {
  this.isLoggedIn.set(false);
  this.isWishlisted.set(false);
}
    });
  }

goBack() {
  this.router.navigate(['/home']);
}

formattedVoteAverage(): string {
  const vote = this.movieDetails()?.vote_average ?? 0;
  return vote.toFixed(1) + "/10";
}

toggleWishlist() {
  if (!this.isLoggedIn()) {
    this.showNotify('Login Required', 'Please login first to use the wishlist feature');
    return;
  }

  this.isWishlisted.set(!this.isWishlisted());
  this._registerStore.toggleMovieWishlist(this.movieDetails()!);

  const actionText = this.isWishlisted() ? "added to" : "removed from";
  this.showNotify('Watch List Updated', `${this.movieDetails()?.title} was ${actionText} your watch list`);
  this._notificationStore.pushNotification(
    `Watch List Updated: ${this.movieDetails()?.title} was ${actionText} your watch list`
  );
}

showNotify(summaryPar: string, detailPar: string) {
  this._messageService.add({ severity: 'secondary', summary: summaryPar, detail: detailPar });
}
}
