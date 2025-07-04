import { Component, effect, inject, OnChanges, signal, ViewChild } from '@angular/core';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { Popover } from 'primeng/popover';
import { PopoverModule } from 'primeng/popover';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { NavToggleService } from '../../services/nav-toggle.service';
import { NotificationStore } from '../../store/notification.store';
import { BadgeModule } from 'primeng/badge';
import { ApiStore } from '../../store/api.store';

@Component({
  selector: 'app-hr-nav',
  imports: [InputIconModule, IconFieldModule, BadgeModule, InputTextModule, FloatLabelModule, FormsModule, ToggleButtonModule, ToggleSwitch, PopoverModule, ButtonModule, CommonModule],
  templateUrl: './hr-nav.component.html',
  styleUrl: './hr-nav.component.scss'
})
export class HrNavComponent {
  private _notificationStore = inject(NotificationStore);
  private _apiStore = inject(ApiStore);
  notificationsList = signal<string[]>([]);
  notificationLength = signal<number>(0);
  navToggle = inject(NavToggleService);
  searchValue = signal<string | undefined>(undefined);
  mode = <boolean>(false);
  isRtl = <boolean>(false);
  selectedLang = signal<{ lang: string } | null>(null);
  @ViewChild('op') op!: Popover;
  @ViewChild('opCombo') opCombo!: Popover;
  Languages = [{
    lang: 'en',
  }, {
    lang: 'ar',
  }, {
    lang: 'fr',
  }, {
    lang: 'zh'
  }
  ];

  constructor() {
    effect(() => {
      this.notificationsList.set(
        this._notificationStore.notificationState().map(n => n.notificationState)
      );
      this.notificationLength.set(
        this._notificationStore.notificationState().length
      );
      this._apiStore.setLanguage(this.selectedLang()?.lang || 'en-US');
    })
  }

  toggle(event: any) {
    this.op.toggle(event);
  }
  toggleCombo(event: any) {
    this.opCombo.toggle(event);
  }

  selectMember(language: { lang: string }) {
    this.selectedLang.set(language);
    this.opCombo.hide();
  }



  toggleDarkMode() {
    const element = document.querySelector('html');
    if (element) {
      if (this.mode) {
        element.classList.add('my-add-dark');
      } else {
        element.classList.remove('my-add-dark');
      }
    }
  }

  changeVerticalBarDirection() {
    this.navToggle.setPosition();
    const element = document.querySelector('html');
    if (element) {
      if (this.isRtl) {
        element.setAttribute('dir', 'rtl');
      } else {
        element.setAttribute('dir', 'ltr');
      }
    }
  }

  onDestroy() {
    this.mode = false;
    this.isRtl = false;
  }
}
