import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl: string = environment.backurl + 'users';

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {}

  getUsers(): Observable<any> {
    const url = this.baseUrl;
    return this.http.get(url);
  }

  getUser(email: string): Observable<any> {
    const url = this.baseUrl + '/' + email;
    return this.http.get(url);
  }

  postUser(name: string, email: string, pwd: string): Observable<any> {
    const url = this.baseUrl;

    const body: any = {
      name: name,
      email: email,
      pwd: pwd,
    };
    return this.http.post(url, body, { responseType: 'text' });
  }
  sendRecoveryMail(email: string) {
    const url = this.baseUrl + '/forget_pwd/' + email;
    const body: any = {
      email: email,
    };
    return this.http.post(url, body);
  }
  resetPwd(token: string, newPwd: string) {
    const url = this.baseUrl + '/reset_pwd';
    let body: any = {
      pwd: newPwd,
    };
    return this.http.post(url, body);
  }

  putUser(name: string, email: string, phone: number): Observable<any> {
    const url = this.baseUrl + '/' + email;

    let body: any = {};

    if (!name) {
      body = {
        phone: phone,
      };
    } else if (!phone) {
      body = {
        name: name,
      };
    } else {
      body = {
        name: name,
        phone: phone,
      };
    }

    return this.http.put(url, body);
  }
}
