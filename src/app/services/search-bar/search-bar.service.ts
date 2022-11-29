import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchBarService {
  private searchSource = new BehaviorSubject(''); // set default status
  currentSearch = this.searchSource.asObservable();

  constructor() {}

  changeSearch(search: string) {
    this.searchSource.next(search);
  }
}
