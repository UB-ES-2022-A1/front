import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service/service.service';
import { ContractTO } from 'src/app/entities/ContractTO';
@Component({
  selector: 'app-card-contract',
  templateUrl: './card-contract.component.html',
})
export class CardContractComponent implements OnInit {
  isActivated: boolean = false;
  @Input() contract: ContractTO;

  constructor(public router: Router) {}

  ngOnInit(): void {}

  activateService(): void {
    this.isActivated = !this.isActivated;
    console.log(this.contract);
  }
}
