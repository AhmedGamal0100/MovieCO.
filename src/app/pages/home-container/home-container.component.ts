import { Component } from '@angular/core';
import { HeroComponent } from "../../components/hero/hero.component";
import { HomeCardsSliderComponent } from "../../components/home-cards-slider/home-cards-slider.component";
import { HomePopularSliderComponent } from "../../components/home-popular-slider/home-popular-slider.component";
import { HomeUpcomingSliderComponent } from "../../components/home-upcoming-slider/home-upcoming-slider.component";
import { HomeMovieCardComponent } from "../../components/home-movie-card/home-movie-card.component";
import { HomeMovieSliderComponent } from "../../components/home-movie-slider/home-movie-slider.component";

@Component({
  selector: 'app-home-container',
  imports: [HeroComponent, HomeCardsSliderComponent, HomePopularSliderComponent, HomeUpcomingSliderComponent, HomeMovieCardComponent, HomeMovieSliderComponent],
  templateUrl: './home-container.component.html',
  styleUrl: './home-container.component.scss'
})
export class HomeContainerComponent {

}
