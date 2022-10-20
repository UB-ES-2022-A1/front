import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  baseUrl: string = environment.backurl +'services'

  constructor(private http: HttpClient) { }


  getServices(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  postService(title: string, description: string, price: number, user: string,): Observable<any> {
    console.log("holi")
    const body: any = {
      title: title,
      user: user,
      description: description, 
      price: price
    };
      return this.http.post(this.baseUrl, body);
    }
  }

