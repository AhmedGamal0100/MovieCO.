import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { ApiDetailsService } from '../../services/api-details.service';
import { IMovieDetails } from '../../interfaces/movie-details';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ApiDetailsStore } from '../../store/api-details.store';
import { ApiStore } from '../../store/api.store';
import { IMovieDetailsReview } from '../../interfaces/movie-details-review';
import { AccordionModule } from 'primeng/accordion';
import { DetailSimilarSliderComponent } from "../../components/detail-similar-slider/detail-similar-slider.component";
import { registerStore } from '../../store/register.store';
import { IAccount } from '../../interfaces/account';
import { NotificationStore } from '../../store/notification.store';

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
  private router = inject(Router);
  private _notificationStore = inject(NotificationStore);
  readonly id = input<string>();

  movieDetails!: IMovieDetails;
  sampleReview!: string;
  getBackdropUrl!: string;
  getPosterUrl!: string;
  movieReviews: IMovieDetailsReview[] = [];
  movieRecommendations!: number;

  isWishlisted = signal(false);
  isLoggedIn = signal(false); // track login state

  constructor() {
    effect(() => {
      let language = this._apiStore.lang();
      this._apiDetailsStore.setId(this.id() ? Number(this.id()) : 0);
      this._apiDetailsStore.setLanguage(language ? language : 'en-US');
      this._apiDetailsStore.setPage(1);

      // Fetching detailed movie information
      this.movieDetails = this._apiDetailsStore.detailedMovie() as IMovieDetails;
      this.sampleReview = this.movieDetails.overview;
      this.getBackdropUrl = this.constURL + this.movieDetails.backdrop_path;
      this.getPosterUrl = this.constURL + this.movieDetails.poster_path;

      // Fetching detailed reviews
      this.movieReviews = [...this._apiDetailsStore.detailedReview()];

      // Fetching number of recommendations
      this.movieRecommendations = this._apiDetailsStore.detailedRecommendations().length;

      // Check if user is logged in
      const loggedAccountJSON = sessionStorage.getItem("user_id");
      if (loggedAccountJSON) {
        this.isLoggedIn.set(true);

        const loggedAccount = JSON.parse(loggedAccountJSON) as IAccount;
        this.isWishlisted.set(
          loggedAccount.wishList?.moviesIds.includes(this.movieDetails.id) ?? false
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

  toggleWishlist() {
    if (!this.isLoggedIn()) {
      this.showNotify('Login Required', 'Please login first to use the wishlist feature');
      return;
    }

    this.isWishlisted.set(!this.isWishlisted());
    this._registerStore.toggleMovieWishlist(this.movieDetails.id);

    const actionText = this.isWishlisted() ? "added to" : "removed from";
    this.showNotify('Watch List Updated', `${this.movieDetails.title} was ${actionText} your watch list`);
    this._notificationStore.pushNotification(
      `Watch List Updated: ${this.movieDetails.title} was ${actionText} your watch list`
    );
  }

  showNotify(summaryPar: string, detailPar: string) {
    this._messageService.add({ severity: 'secondary', summary: summaryPar, detail: detailPar });
  }
}
