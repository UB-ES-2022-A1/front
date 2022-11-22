import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionService } from '../session/session.service';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  baseUrl: string = environment.backurl +'services'

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  getService(id: string): Observable<any>{
    const url = this.baseUrl+'/'+id
    return this.http.get(url);
  }
  getServices(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  postService(title: string, description: string, price: number, user: string,): Observable<any> {
    console.log("holi")
    const tokenString = btoa(this.sessionService.get('token') +':'+ this.sessionService.get('email'));

    const authToken: any = `Basic ${tokenString}`
    let headers =  new HttpHeaders({
      Authorization: authToken
    })
    const body: any = {
      title: title,
      user: user,
      description: description, 
      price: price
    };
      return this.http.post(this.baseUrl, body, {headers});
    }

    getUserServices(email: string): Observable<any> {
      console.log('Offers')
      const tokenString = btoa(this.sessionService.get('token') +':'+ this.sessionService.get('email'));

      const authToken: any = `Basic ${tokenString}`
      let headers =  new HttpHeaders({
        Authorization: authToken
      })  
      const url = this.baseUrl+'/'+email+'/service'
      return this.http.get(url, {headers})
    }
  }

