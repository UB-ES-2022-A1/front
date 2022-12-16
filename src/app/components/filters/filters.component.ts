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
    'Popularity': 'popularity',
    'Rating': 'rating'
  };
  constructor(public activeModal: NgbActiveModal) {
    console.log('uwu');
    this.filters = this.filtersToCp;
  }

  ngOnInit(): void {}

  getModel(filter: string){
    if(this.filters.filters.hasOwnProperty(filter)){
      return this.filters.filters[filter]
    }else{
      return {}
    }
  }

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
    }else if(this.filters.filters[filter][edited] === null){

      const { [edited]: foo, ...rest } = this.filters.filters[filter]
      this.filters.filters[filter] = rest
    }
    if (Object.keys(this.filters.filters[filter]).length === 0){
      const { [filter]: foo, ...rest } = this.filters.filters
      this.filters.filters = rest
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
