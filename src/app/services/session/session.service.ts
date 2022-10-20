import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() {
    // Sonar
  }
  getFromSession(key: string){
    if(!sessionStorage.getItem(key)){
      return false; 
    }
    else{
      return sessionStorage.getItem(key); 
    }
  }
  get(key: string, fromLocal?: any) {
    if (!fromLocal) {
      if (!sessionStorage.getItem(key)) {
        return false;
      } else {
        let item = sessionStorage.getItem(key);
        if (item) {
          return JSON.parse(item);
        }
      }
    } else {
      if (!localStorage.getItem(key)) {
        return false;
      } else {
        let item = localStorage.getItem(key);
        if (item) {
          return JSON.parse(item);
        }
      }
    }
  }

  set(key: string, value: any, fromLocal?: any) {
    if (value) {
      if (!fromLocal) {
        sessionStorage.setItem(key, JSON.stringify(value));
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    }
  }

  remove(key: string, fromLocal?: any) {
    if (!fromLocal) {
      sessionStorage.removeItem(key);
    } else {
      localStorage.removeItem(key);
    }
  }

  clear() {
    sessionStorage.clear();
  }

}
