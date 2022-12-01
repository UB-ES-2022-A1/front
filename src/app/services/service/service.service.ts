import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { SessionService } from '../session/session.service';
import { SearchTO } from 'src/app/entities/SearchTO';
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
  getServicesFilt(search?: string, sort?: any, filters?: any): Observable<any> {
    const url = this.baseUrl + '/search';
    let body: SearchTO = {
      search_text: undefined,
    };
    if (search !== undefined && search !== '') {
      body['search_text'] = search;
    }
    if (sort !== undefined) {
      body['sort'] = sort;
    }
    if (filters !== undefined) {
      body['filters'] = filters;
    }

    return this.http.post(url, body);
  }

  postService(
    title: string,
    description: string,
    price: number,
    user: string
  ): Observable<any> {
    const body: any = {
      title: title,
      user: user,
      description: description,
      price: price,
    };
    return this.http.post(this.baseUrl, body, { responseType: 'text' });
  }

  getUserServices(email: string): Observable<any> {
    const url = this.baseUrl + '/' + email + '/service';

    return this.http.get(url);
  }
}
