import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FiltersTO } from 'src/app/entities/FiltersTO';
import { Order } from 'src/app/entities/Order';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
})
export class FiltersComponent implements OnInit {
  @Input() filters: FiltersTO;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}
  priceOrder(order: Order) {
    if (order == Order.Up) {
      if (this.filters.priceOrd !== Order.Up) {
        this.filters.priceOrd = Order.Up;
      } else {
        this.filters.priceOrd = Order.None;
      }
    }
    if (order == Order.Down) {
      if (this.filters.priceOrd !== Order.Down) {
        this.filters.priceOrd = Order.Down;
      } else {
        this.filters.priceOrd = Order.None;
      }
    }
  }
  onFilter() {
    this.activeModal.close([1, this.filters]);
  }
  resetFilters() {
    this.filters = {
      search: '',
      priceMin: undefined,
      priceMax: undefined,
      priceOrd: 1,
    };
  }
}
