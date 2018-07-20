import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor (private authenticationService: AuthenticationService, private router: Router) { }

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    try {
      return await this.authenticationService.isAuthenticated();
    } catch (err) {
      this.router.navigateByUrl('/admin/login');
      return false;
    }
  }
}
