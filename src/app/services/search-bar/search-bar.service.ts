import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FiltersTO } from 'src/app/entities/FiltersTO';
@Injectable({
  providedIn: 'root',
})
export class SearchBarService {
  filters: FiltersTO = {
    search: '',
    filters: {},
    sort_by: '',
    reverse: false
  };
  private searchSource: BehaviorSubject<FiltersTO> = new BehaviorSubject(
    this.filters
  ); // set default status
  currentSearch = this.searchSource.asObservable();

  constructor() {}

  changeSearch(filters: FiltersTO) {
    this.searchSource.next(filters);
  }
}
