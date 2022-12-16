import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { SessionService } from '../session/session.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private sessionService: SessionService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let url: string = state.url;
    return this.checkLoggedStatus(next, url);
  }
  haveAccess(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.loginService.isLogged() && this.loginService.isAdmin()) {
      return true;
    }
    return false;
  }
  checkLoggedStatus(next: ActivatedRouteSnapshot, url: string) {
    if (this.loginService.isLogged()) {
      console.log(next.data.role, this.sessionService.get('rol'));
      if (next.data.role !== this.sessionService.get('rol')) {
        console.log(next.data);
        this.router.navigate(['/']);
        return false;
      }
      return true;
    } else {
      this.loginService.redirectUrl = url;
      this.router.navigate(['/login']);

      return false;
    }
  }
}
