import { Component, input } from '@angular/core';
import { IAccount } from '../../interfaces/account';

@Component({
  selector: 'app-easy-login',
  imports: [],
  templateUrl: './easy-login.component.html',
  styleUrl: './easy-login.component.scss'
})
export class EasyLoginComponent {
  MovieObj = input<IAccount>();
}
