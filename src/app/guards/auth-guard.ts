import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Token } from '../token/token';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(Token);
  const router = inject(Router);

  const token = tokenService.get();
  if (token){
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
}
