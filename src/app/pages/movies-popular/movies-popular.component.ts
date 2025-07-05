import { Component, effect, inject, signal } from '@angular/core';
import { IMovie } from '../../interfaces/movie';
import { ApiStore } from '../../store/api.store';
import { Router } from '@angular/router';
import { FilterCardComponent } from "../../components/filter-card/filter-card.component";
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-movies-popular',
  imports: [FilterCardComponent, PaginatorModule, ButtonModule],
  templateUrl: './movies-popular.component.html',
  styleUrl: './movies-popular.component.scss'
})
export class MoviesPopularComponent {
  private _apiStore = inject(ApiStore);
  private _router = inject(Router);

  movieCardObjs = signal<IMovie[]>([]);
  page = signal(1);
  totalRecords = signal(0);
  first3: number = 0;
  rows3: number = 20;

  constructor() {
    effect(() => {
      const currentPage = this.page();
      this._apiStore.setPagePopular(currentPage);
      this.movieCardObjs.set(this._apiStore.popularMovies() as IMovie[]);
      this.totalRecords.set(this._apiStore.popularMoviesTotal());
    });
  }

  routeToDetails(movie: IMovie) {
    this._router.navigateByUrl('/home/details/' + movie.id);
  }

  onPageChange3(event: PaginatorState) {
    this.first3 = event.first ?? 0;
    this.rows3 = event.rows ?? 20;

    const newPage = Math.floor(this.first3 / this.rows3) + 1;
    this.page.set(newPage);
  }
}
