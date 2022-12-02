import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { SearchTO } from 'src/app/entities/SearchTO';
import { FiltersTO } from 'src/app/entities/FiltersTO';
@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  baseUrl: string = environment.backurl + 'services';

  constructor(private http: HttpClient) {}

  getService(id: string): Observable<any> {
    const url = this.baseUrl + '/' + id;
    return this.http.get(url);
  }
  getServices(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  deactivateService(id: string): Observable<any> {
    const url = this.baseUrl + '/' + id;
    return this.http.delete(url);
  }
  putService(
    id: string,
    title: string,
    description: string,
    price: number,
    user: string
  ): Observable<any> {
    const url = this.baseUrl + '/' + id;
    const body: any = {
      title: title,
      user: user,
      description: description,
      price: price,
    };
    return this.http.put(url, body);
  }
  getServicesFilt(filters: FiltersTO): Observable<any> {
    const url = this.baseUrl + '/search';
    console.log(filters);
    let body: SearchTO = {
      search_text: undefined,
    };
    filters?.search ? (body.search_text = filters.search) : null;
    body.filters = {
      price: { min: filters?.priceMin, max: filters?.priceMax },
    };
    if (filters.priceOrd !== 1) {
      let reversed = filters.priceOrd === 2;
      body.sort = {
        by: 'price',
        reverse: reversed,
      };
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
    return this.http.post(this.baseUrl, body);
  }

  getUserServices(email: string): Observable<any> {
    const url = this.baseUrl + '/' + email + '/service';

    return this.http.get(url);
  }
}
