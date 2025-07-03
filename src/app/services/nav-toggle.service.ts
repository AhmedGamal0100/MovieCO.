import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavToggleService {
  private _isVisible = signal<boolean>(false);
  readonly getVisibility = computed(() => this._isVisible());

  setVisibility() {
    this._isVisible.set(!this._isVisible());
  }
}
