import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FiltersTO } from 'src/app/entities/FiltersTO';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
})

export class FiltersComponent implements OnInit {
  @Input() filtersToCp: FiltersTO;
  filters: FiltersTO;
  kinds: { [key: string]: string } =
  {
    'Price': 'price',
    'Completed contracts': 'popularity',
    'Average Rating': 'rating'
  };
  constructor(public activeModal: NgbActiveModal) {
    console.log('uwu');
    this.filters = this.filtersToCp;
  }

  ngOnInit(): void {}

  setOrder(by: string, reverse: boolean) {

    if(this.filters.sort_by == by && this.filters.reverse == reverse){
      this.filters.sort_by = ''
    }
    else{
      this.filters.sort_by = by
      this.filters.reverse = reverse

    }
  }

  createFilter(filter: string, edited:string, event:any){
    if(!this.filters.filters.hasOwnProperty(filter)){
      this.filters.filters[filter] = {}
      this.filters.filters[filter][edited] = event.target.value
    }
  }

  onFilter() {
    this.activeModal.close([1, this.filters]);
  }

  resetFilters() {
    this.filters = {
      search: '',
      filters: {},
      sort_by: '',
      reverse: false
    };
  }

  beforeDismiss() {}
}
