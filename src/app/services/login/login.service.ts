import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl: string = environment.backurl +'login'

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  login(email: string, password: string){
      console.log(email, password)
      const url = this.baseUrl
      const body = {email: email, 
                pwd: password
      }
      return this.http.post(url, body);
  }
  isLogged() {

    if (this.sessionService.get('token') != null && this.sessionService.get('token') != '') {
      return true;
    } else {
      return false;
    }
  }
  logout() {
    this.sessionService.clear();
  }
}
