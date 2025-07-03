import { AfterViewChecked, Component, effect, inject, signal } from '@angular/core';
import { ApiStore } from '../../store/api.store';
import { IMovie } from '../../interfaces/movie';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  private readonly constURL = `https://image.tmdb.org/t/p/w500`;
  private _apiStore = inject(ApiStore);
  imgsPath = signal<string[]>([]);
  heroBg = signal<string>("");
  constructor() {
    effect(() => {
      const movies = this._apiStore.nowPlayingMovies() as (IMovie[])
      if (movies.length > 0) {
        movies.forEach(movie => {
          this.imgsPath().push(movie.backdrop_path);
        });
      }

      const paths = this.imgsPath();
      if (paths.length > 1) {
        const randomIndex = Math.floor(Math.random() * paths.length);
        this.heroBg.set(this.constURL + paths[randomIndex]);
      }

    })
  }
}