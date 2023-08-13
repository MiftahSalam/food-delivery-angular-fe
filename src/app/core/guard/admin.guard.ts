import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router)
  const authService: AuthService = inject(AuthService)
  const currentUser = authService.currentUserValue
  if (currentUser) {
    if (currentUser.role.toLowerCase() === "admin") {
      return true;
    }

    router.navigate(["/"])
    return false
  }

  router.navigate(["/auth/login"], { queryParams: { returnUrl: state.url } })

  return false;
}
