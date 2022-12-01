import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-contract',
  templateUrl: './card-contract.component.html',
})
export class CardContractComponent implements OnInit {
  isActivated:boolean = false;
  @Input() id: number;
  @Input() title: string;
  @Input() description: string;
  @Input() price: number;
  constructor(public router: Router) {}

  ngOnInit(): void {

  }

  seeDetail(): void {
    this.router.navigate([`/service/${this.id}`]);
  }

  activateService(): void {
    this.isActivated = !this.isActivated;
  }

}
