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

@Component({
  selector: 'app-hr-nav',
  imports: [InputIconModule, IconFieldModule, BadgeModule, InputTextModule, FloatLabelModule, FormsModule, ToggleButtonModule, ToggleSwitch, PopoverModule, ButtonModule, CommonModule],
  templateUrl: './hr-nav.component.html',
  styleUrl: './hr-nav.component.scss'
})
export class HrNavComponent {
  private _notificationStore = inject(NotificationStore);
  notificationsList = signal<string[]>([]);
  notificationLength = signal<number>(0);
  navToggle = inject(NavToggleService);
  searchValue = signal<string | undefined>(undefined);
  mode = <boolean>(false);
  isRtl = <boolean>(false);
  
  constructor() {
    effect(() => {
      this.notificationsList.set(
        this._notificationStore.notificationState().map(n => n.notificationState)
      );
      this.notificationLength.set(
        this._notificationStore.notificationState().length
      )
    })
  }

  @ViewChild('op') op!: Popover;
  toggle(event: any) {
    this.op.toggle(event);
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

  // push() {
  //   this._notificationStore.pushNotification("New notification");
  // }
}
