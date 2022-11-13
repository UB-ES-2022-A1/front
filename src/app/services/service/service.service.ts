import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { SessionService } from '../session/session.service';
@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  baseUrl: string = environment.backurl + 'services';

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {}

  getService(id: string): Observable<any> {
    const url = this.baseUrl + '/' + id;
    return this.http.get(url);
  }
  getServices(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  getServicesFilt(
    search: string = '',
    sort?: any,
    filters?: any
  ): Observable<any> {
    let params = new HttpParams().append('search_text', search);

    if (sort != null) {
      params.set('sort', sort);
    }
    if (filters != null) {
      params.set('filters', filters);
    }
    console.log(search);
    return this.http.get(this.baseUrl, { params });
  }

  postService(
    title: string,
    description: string,
    price: number,
    user: string
  ): Observable<any> {
    const tokenString = btoa(
      this.sessionService.get('token') + ':' + this.sessionService.get('email')
    );

    const authToken: any = `Basic ${tokenString}`;
    let headers = new HttpHeaders({
      Authorization: authToken,
    });
    const body: any = {
      title: title,
      user: user,
      description: description,
      price: price,
    };
    return this.http.post(this.baseUrl, body, { headers });
  }

  getUserServices(email: string): Observable<any> {
    const tokenString = btoa(
      this.sessionService.get('token') + ':' + this.sessionService.get('email')
    );
    const authToken: any = `Basic ${tokenString}`;
    let headers = new HttpHeaders({
      Authorization: authToken,
    });
    const url = this.baseUrl + '/' + email + '/service';
    return this.http.get(this.baseUrl, { headers });
  }
}
