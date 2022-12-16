import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionService } from '../session/session.service';
@Injectable({
  providedIn: 'root',
})
export class ContractedServicesService {
  baseUrl: string = environment.backurl + 'contracted_services';

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {}

  postContract(serviceId: any, user: any, description: any) {
    const body: any = {
      service: serviceId,
    };
    return this.http.post(this.baseUrl, body);
  }

  getClientContract(email: string): Observable<any> {
    const url = this.baseUrl + '/client/' + email;
    return this.http.get(url);
  }

  getContractorContract(email: string): Observable<any> {
    const url = this.baseUrl + '/contractor/' + email;
    return this.http.get(url);
  }

  getAllContracts(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  acceptContract(contractId: number): Observable<any> {
    const url = this.baseUrl + '/' + contractId + `/accept`;
    return this.http.post(url, {});
  }
  validateContract(contractId: number): Observable<any> {
    const url = this.baseUrl + '/' + contractId + `/validate`;
    return this.http.post(url, {});
  }
  cancelContract(contractId: number): Observable<any> {
    const url = this.baseUrl + '/' + contractId;
    return this.http.delete(url);
  }
}
