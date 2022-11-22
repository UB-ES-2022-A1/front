import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionService } from '../session/session.service';
@Injectable({
  providedIn: 'root'
})
export class ContractedServicesService {
  baseUrl: string = environment.backurl +'contracted_services'

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  postContract(serviceId: any, user: any, description: any){
      const tokenString = btoa(this.sessionService.get('token') +':'+ this.sessionService.get('email'));
      console.log()
      const authToken: any = `Basic ${tokenString}`
      let headers =  new HttpHeaders({
        Authorization: authToken
      })
      const body: any = {
        service: serviceId, 
        state: 'active', 
        price: 50
      };
        return this.http.post(this.baseUrl, body, {headers});
    }

  getUserContract(email: string): Observable<any> {
    console.log('Contracts')
    const tokenString = btoa(this.sessionService.get('token') +':'+ this.sessionService.get('email'));

    const authToken: any = `Basic ${tokenString}`
    let headers =  new HttpHeaders({
      Authorization: authToken
    })  
    const url = this.baseUrl+'/'+email+'/contracted_service'
    return this.http.get(url, {headers})
  }
  }