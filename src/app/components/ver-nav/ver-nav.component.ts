import { Component, effect, inject, signal, ViewChild } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { Drawer } from 'primeng/drawer';
import { NavToggleService } from '../../services/nav-toggle.service';
import { LoginStore } from '../../store/login.store';
import { Router } from '@angular/router';
import { GoogleAuthService } from '../../services/google-auth.service';

@Component({
  selector: 'app-ver-nav',
  imports: [DrawerModule, ButtonModule, Ripple, AvatarModule],
  templateUrl: './ver-nav.component.html',
  styleUrl: './ver-nav.component.scss'
})
export class VerNavComponent {
  navToggle = inject(NavToggleService);
  loginStore = inject(LoginStore);
  private _router = inject(Router);
  private _googleAuthService = inject(GoogleAuthService);
  visible = signal(false);
  isLogged = signal(false);

  @ViewChild('drawerRef') drawerRef!: Drawer;

  constructor() {
    effect(() => {
      this.visible.set(this.navToggle.getVisibility());

      const tokenExist = sessionStorage.getItem("user_id_token");
      const account = JSON.parse(sessionStorage.getItem("user_id") ?? "null");

      if (tokenExist && account?.email) {
        this.loginStore.loginMethod(account.email);
        this.isLogged.set(true);
      } else {
        this.loginStore.logoutMethod();
        this.isLogged.set(false);
      }
    });
  }


  closeCallback(e: any): void {
    this.drawerRef.close(e);
  }

  login() {
    this._router.navigateByUrl('/login');
  }

  register() {
    this._router.navigateByUrl('/register');
  }

  async logOut() {
    await this._googleAuthService.GoogleSignOut();
    this.loginStore.logoutMethod();
    this.isLogged.set(false);
    location.reload();
  }
}
