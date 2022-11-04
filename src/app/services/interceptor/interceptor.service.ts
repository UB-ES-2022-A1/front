import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpInterceptor,
  HttpParams,
} from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SessionService } from '../session/session.service'; 
import { LoginService } from '../login/login.service'; 

@Injectable()
export class InterceptorService implements HttpInterceptor {
  private totalRequests = 0;

  constructor(
    private sessionService: SessionService,
    private loginService: LoginService,
  ) {}

  intercept(
    req: { clone: any; url?: any },
    next: { handle: any }
  ): Observable<HttpEvent<any>> {
    this.totalRequests++;
   
    /** RETURNS MOCKS */
      if (this.sessionService.get('token')!==null) {
      //Get Auth Token from Service which we want to pass thr service call
      const tokenString = btoa(this.sessionService.get('token') +':'+ this.sessionService.get('email'));
      
      const authToken: any = `Basic ${tokenString}`
        
      const authReq = req.clone({ setHeaders: { Authorization: authToken }});
      console.log(authReq)
      return next.handle(authReq).pipe(
        // @ts-ignore
        catchError((error) => this.handleError(error)),
        finalize(() => {
          this.totalRequests--;
          if (this.totalRequests == 0) {
          }
        })
      );
      /** ELSE */
    } else {
      return next.handle(req).pipe(
        // @ts-ignore
        catchError((error) => this.handleError(error)),
        finalize(() => {
          this.totalRequests--;
          if (this.totalRequests == 0) {
          }
        })
      );
    }
  }

  // @ts-ignore
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';

    if (error.status === 401 || error.status === 403) {
    } else {
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
        errorMessage = error.error.message;
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(
          `Backend returned code ${error.status}, ` +
            `body was: ${error.message}`
        );
        errorMessage = error.message;
      }
      // return an observable with a user-facing error message
      return throwError(errorMessage);
    }
  }

  

  
}
