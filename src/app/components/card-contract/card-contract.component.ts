import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service/service.service';
import { ContractTO } from 'src/app/entities/ContractTO';
import { SessionService } from 'src/app/services/session/session.service';
import { ContractedServicesService } from 'src/app/services/contracted-services/contracted-services.service';
@Component({
  selector: 'app-card-contract',
  templateUrl: './card-contract.component.html',
})
export class CardContractComponent implements OnInit {
  isActivated: boolean = false;
  @Input() contract: ContractTO;
  userEmail: string;
  constructor(
    public router: Router,
    private sessionService: SessionService,
    private contractService: ContractedServicesService
  ) {}

  ngOnInit(): void {
    this.userEmail = this.sessionService.get('email');
  }

  acceptService(): void {
    this.contractService
      .acceptContract(this.contract.contract_id)
      .subscribe((res: any) => {
        console.log(res);
        window.location.reload();
      });
  }
  validateService(): void {
    this.contractService
      .validateContract(this.contract.contract_id)
      .subscribe((res: any) => {
        console.log(res);
        window.location.reload();
      });
  }
  cancelService(): void{
    this.contractService
      .cancelContract(this.contract.contract_id)
      .subscribe((res: any) => {
        console.log(res);
        window.location.reload();
      });

  }
  statusString(status: number, verb: boolean) {
    if (!verb) {
      switch (status) {
        case 0:
          return 'Pendiente';
        case 1:
          return 'Aceptado';
        case 2:
          return 'Validado';
        default:
          return '';
      }
    } else {
      switch (status) {
        case 0:
          return 'Aceptar';
        case 1:
          return 'Validar';
        case 2:
          return '';
        default:
          return '';
      }
    }
  }
}
