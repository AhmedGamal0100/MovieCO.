import { CanDeactivateFn, Router } from '@angular/router';

export const formDeactivationGuard: CanDeactivateFn<any> = (component, currentRoute, currentState, nextState) => {
  if (component && component.registerForm && component.registerForm.valid) {
    console.log(true);
    return true;
  } else if (component && component.canDeActivate()) {
    return new Promise<boolean>(resolve => {
      component.showConfirm(resolve);
    });
  }
  return true;
};