import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  baseUrl: string = environment.backurl + 'login';
  redirectUrl = '';

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {}

  login(email: string, password: string) {
    const url = this.baseUrl;
    const body = { email: email, pwd: password };
    return this.http.post(url, body);
  }
  isLogged() {
    if (
      this.sessionService.get('token') != null &&
      this.sessionService.get('token') != '' &&
      this.sessionService.get('token') != false
    ) {
      return true;
    } else {
      return false;
    }
  }
  isAdmin() {
    return this.sessionService.get('rol') === 'admin_max';
  }
  logout() {
    this.sessionService.clear();
  }
}
