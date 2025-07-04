import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavToggleService {
  private _isVisible = signal<boolean>(false);
  readonly getVisibility = computed(() => this._isVisible());
  private _position = signal<boolean>(false);
  readonly getPosition = computed(() => this._position());

  setVisibility() {
    this._isVisible.set(!this._isVisible());
  }

  setPosition() {
    this._position.set(!this._position());
  }
}
