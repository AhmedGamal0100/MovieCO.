import { Component, inject } from '@angular/core';
import { HrNavComponent } from "../../components/hr-nav/hr-nav.component";
import { VerNavComponent } from "../../components/ver-nav/ver-nav.component";
import { RouterOutlet } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Subscription } from 'rxjs';
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-home',
  imports: [HrNavComponent, VerNavComponent, RouterOutlet, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
}
