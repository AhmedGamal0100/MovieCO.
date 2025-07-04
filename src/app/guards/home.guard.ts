import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const homeGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if (state.url == '/home') {
    return router.parseUrl('/home/movies');
  } else {
    console.log(state.url);
  }
  return true;
};

