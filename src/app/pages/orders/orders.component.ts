import { Component, Input, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session/session.service';
import { ServiceTO } from 'src/app/entities/ServiceTO';
import { ServiceService } from 'src/app/services/service/service.service';
import { ContractedServicesService } from 'src/app/services/contracted-services/contracted-services.service';
import { Router } from '@angular/router';
import { ContractTO } from 'src/app/entities/ContractTO';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
})
export class OrdersComponent implements OnInit {
  contractsClient: ContractTO[] = [];
  contractsContractor: ContractTO[] = [];
  offers: ContractTO[] = [];

  constructor(
    protected sessionService: SessionService,
    private serviceService: ServiceService,
    private contractedService: ContractedServicesService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.loadClientContract();
    this.loadContractorContract();
  }

  loadClientContract(): void {
    this.contractedService
      .getClientContract(this.sessionService.get('email'))
      .subscribe((res) => {
        res.forEach((contract: any) => {
          let auxContract: any = {
            serviceId: contract.service,
            status: contract.state,
            user: contract.user_buyer_email,
            title: contract.title,
            description: contract.description,
            price: contract.price,
            seller: contract.user_seller_email,
            contract_id: contract.contract_id,
            validate_c: contract.validate_c,
            validate_s: contract.validate_s
          };
          this.contractsClient.push(auxContract);
        });
      });
  }

  loadContractorContract(): void {
    this.contractedService
      .getContractorContract(this.sessionService.get('email'))
      .subscribe((res) => {
        res.forEach((contract: any) => {
          let auxContract: any = {
            serviceId: contract.service,
            status: contract.state,
            user: contract.user_buyer_email,
            title: contract.title,
            description: contract.description,
            price: contract.price,
            seller: contract.user_seller_email,
            contract_id: contract.contract_id,
            validate_c: contract.validate_c,
            validate_s: contract.validate_s
          };
          this.contractsContractor.push(auxContract);
        });
      });
  }
}
