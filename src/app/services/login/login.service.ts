import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl: string = environment.backurl +'login'

  constructor(private http: HttpClient) { }

  login(email: string, password: string){
      console.log(email, password)
      const url = this.baseUrl
      const body = {email: email, 
                pwd: password
      }
      return this.http.get(url);
  }
}
