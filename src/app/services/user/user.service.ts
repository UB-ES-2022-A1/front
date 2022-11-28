import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = environment.backurl +'users'

  constructor(private http: HttpClient, private sessionService: SessionService) { }


  getUsers(): Observable<any> {
    const url = this.baseUrl
    return this.http.get(url);
  }

  getUser(email: string): Observable<any> {
    const url = this.baseUrl+'/'+email
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

  putUser(name: string, email: string, phone: number): Observable<any> {
    const url = this.baseUrl+'/'+email
    
    const tokenString = btoa(this.sessionService.get('token') +':'+ this.sessionService.get('email'));
    const authToken: any = `Basic ${tokenString}`
    console.log(authToken)
    let body: any = {};


    let headers =  new HttpHeaders({
      Authorization: authToken
    })
    
    if (name) {
      body = {
        name: name
      };
    }
    else if (phone) {
      body = {
        phone: phone
      };
    }
    else{
      body = {
        name: name,
        phone: phone
      };
    }
    console.log(body)
    
    return this.http.put(url,body, {headers});
    }
  }

