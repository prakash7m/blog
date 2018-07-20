import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../core/authentication.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    try {
      const authenticated = await !this.authenticationService.isAuthenticated();
      if (authenticated) {
        this.router.navigateByUrl('/admin');
      } else {
        return true;
      }
    } catch (err) {
      return true;
    }
  }
}
