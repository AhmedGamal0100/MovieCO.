declare var google: any;
import { computed, ElementRef, inject, Injectable, signal } from '@angular/core';
import { IAccount } from '../interfaces/account';
import { registerStore } from '../store/register.store';
import { LoginStore } from '../store/login.store';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  private _registerStore = inject(registerStore);
  private _userEmail: string = '';
  private _account = signal<IAccount>({
    sub: '',
    email: '',
    name: '',
    given_name: '',
    family_name: '',
    picture: '',
    lang: '',
    isPassGoogle: false,
    password: ''
  });
  readonly account = computed(() => this._account());

  InitiateGoogleAccount(googleBtn: ElementRef) {
    this._userEmail = localStorage.getItem('google_user_email') || '';

    google.accounts.id.initialize({
      client_id: '804385190541-frppfrmi2rs5ekkj48tl4pl68e6es9mu.apps.googleusercontent.com',
      callback: this.handleCredentialResponse.bind(this),
      ux_mode: 'popup'
    });

    google.accounts.id.renderButton(googleBtn.nativeElement,
      {
        theme: 'outline',
        size: 'large',
        type: 'continue_with',
        shape: 'pill',
        width: '200',
        locale: 'en',
      }
    );
  }

  handleCredentialResponse(response: any): void {
    const jwt = response.credential;
    const payload = JSON.parse(atob(jwt.split('.')[1]));
    this._userEmail = payload.email;
    sessionStorage.setItem('user_id_token', jwt);
    const accountData = {
      sub: payload.sub,
      email: payload.email,
      name: payload.name,
      given_name: payload.given_name,
      family_name: payload.family_name,
      picture: payload.picture,
      lang: 'en',
      isPassGoogle: true,
      password: this._registerStore.setAccountPasswordForGoogle()
    };
    this._account.set(accountData);

    sessionStorage.setItem('user_id', JSON.stringify(accountData));
    this._registerStore.addToAccountsList(accountData);
  }

  GoogleSignOut(): Promise<void> {
    return new Promise((resolve) => {
      const email = this._userEmail || sessionStorage.getItem('user_id');
      if (email) {
        google.accounts.id.disableAutoSelect();
        google.accounts.id.revoke(email, () => {
          console.log('Logged out from Google');
          sessionStorage.removeItem('user_id_token');
          sessionStorage.removeItem('user_id');
          this._userEmail = '';
          resolve();
        });
      } else {
        sessionStorage.removeItem('user_id_token');
        sessionStorage.removeItem('user_id');
        resolve();
      }
    });
  }
}
