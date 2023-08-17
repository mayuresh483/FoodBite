import { CanActivateFn, Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UsersService);
  const router = inject(Router);
  
  if(userService.currentUser.token){
    return true;
  }
  
  router.navigate(['/login'],{queryParams:{returnUrl:state.url}});
  return false;
};
