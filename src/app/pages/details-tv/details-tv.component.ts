import { Component, effect, inject, input, signal } from '@angular/core';
import { ITvDetails } from '../../interfaces/tv-details';
import { ApiStore } from '../../store/api.store';
import { registerStore } from '../../store/register.store';
import { MessageService } from 'primeng/api';
import { NotificationStore } from '../../store/notification.store';
import { Router } from '@angular/router';
import { ITvDetailsReview } from '../../interfaces/tv-details-review';
import { IAccount } from '../../interfaces/account';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { Toast } from 'primeng/toast';
import { ApiDetailsTvStore } from '../../store/api-details-tv.store';
import { DetailSimilarTvSliderComponent } from "../../components/detail-similar-tv-slider/detail-similar-tv-slider.component";

@Component({
  selector: 'app-details-tv',
  imports: [Toast, AccordionModule, CommonModule, DetailSimilarTvSliderComponent],
  templateUrl: './details-tv.component.html',
  styleUrl: './details-tv.component.scss',
  providers: [MessageService]
})
export class DetailsTvComponent {
  private readonly constURL = `https://image.tmdb.org/t/p/w500`;
  private _apiDetailsStoreTv = inject(ApiDetailsTvStore);
  private _apiStore = inject(ApiStore);
  private _registerStore = inject(registerStore);
  private _messageService = inject(MessageService);
  private _notificationStore = inject(NotificationStore);
  private router = inject(Router);
  readonly id = input<number>();

  tvDetails = signal<ITvDetails | null>(null);
  tvReviews = signal<ITvDetailsReview[]>([]);
  tvRecommendations = signal<number>(0);
  isWishlisted = signal(false);
  isLoggedIn = signal(false);

  getBackdropUrl = signal('');
  getPosterUrl = signal('');
  sampleReview = signal('');

  constructor() {
    effect(() => {
      const details = this._apiDetailsStoreTv.detailedTv();
      if (!this.id()) {
        this.router.navigate(['/home']);
        return;
      }

      this._apiDetailsStoreTv.setId(this.id()!);
      this._apiDetailsStoreTv.setLanguage(this._apiStore.lang() || 'en-US');
      this._apiDetailsStoreTv.setPage(1);

      if (!details) return;

      this.tvDetails.set(details);
      this.sampleReview.set(details.overview);
      this.getBackdropUrl.set(this.constURL + details.backdrop_path);
      this.getPosterUrl.set(this.constURL + details.poster_path);
      this.tvReviews.set(this._apiDetailsStoreTv.detailedReviewTv());
      this.tvRecommendations.set(this._apiDetailsStoreTv.detailedRecommendationsTv().length);

      const loggedAccountJSON = sessionStorage.getItem("user_id");
      if (loggedAccountJSON) {
        this.isLoggedIn.set(true);
        const loggedAccount = JSON.parse(loggedAccountJSON) as IAccount;
        this.isWishlisted.set(
          loggedAccount.wishList?.tvShows?.some(show => show.id == details.id) ?? false
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
    const vote = this.tvDetails()?.vote_average ?? 0;
    return vote.toFixed(1) + "/10";
  }

  toggleWishlist() {
    if (!this.isLoggedIn()) {
      this.showNotify('Login Required', 'Please login first to use the wishlist feature');
      return;
    }

    this.isWishlisted.set(!this.isWishlisted());
    this._registerStore.toggleMovieWishlistTv(this.tvDetails()!);

    const actionText = this.isWishlisted() ? "added to" : "removed from";
    this.showNotify('Watch List Updated', `${this.tvDetails()?.name} was ${actionText} your watch list`);
    this._notificationStore.pushNotification(
      `Watch List Updated: ${this.tvDetails()?.name} was ${actionText} your watch list`
    );
  }

  showNotify(summaryPar: string, detailPar: string) {
    this._messageService.add({ severity: 'secondary', summary: summaryPar, detail: detailPar });
  }
}
