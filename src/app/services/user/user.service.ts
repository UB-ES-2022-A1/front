import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = environment.backurl +'users'

  constructor(private http: HttpClient) { }


  getUsers(): Observable<any> {
    const url = this.baseUrl
    return this.http.get(url);
  }
  postUser(name: string, email: string, pwd: string): Observable<any> {
    const url = this.baseUrl
    
    const body: any = {
      name: name,
      email: email,
      pwd: pwd
    };
      return this.http.post(url, body);
    }
  }

