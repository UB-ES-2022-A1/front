import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  baseUrl: string = environment.backurl + 'reviews';

  constructor(private http: HttpClient) {}

  postReview(title: string, text: string, stars: number, serviceId: string) {
    const url = this.baseUrl + '/' + serviceId;
    return this.http.post(url, { title: title, text: text, stars: stars });
  }
  getReviews(serviceId: string) {
    const url = this.baseUrl + '/service/' + serviceId;
    return this.http.get(url);
  }
}
