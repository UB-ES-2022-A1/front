import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service/service.service';
import { ServiceTO } from 'src/app/entities/ServiceTO';
import { ContractedServicesService } from 'src/app/services/contracted-services/contracted-services.service';
import { SessionService } from 'src/app/services/session/session.service';
export interface ServiceDetailTO {
  id: string;
}
@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
})
export class ServiceDetailComponent implements OnInit {
  serviceId: string = '';
  serviceInfo!: ServiceTO;
  contractButton: boolean = false;
  description: string = '';
  constructor(
    public router: Router,
    private sessionService: SessionService,
    private serviceService: ServiceService,
    private contractService: ContractedServicesService
  ) {
    this.serviceId = this.router.url.substring(
      this.router.url.lastIndexOf('/') + 1
    );
    this.serviceService.getService(this.serviceId).subscribe((data: any) => {
      this.serviceInfo = {
        id: data.id,
        title: data.title,
        description: data.description,
        price: data.price,
        requiresPlace: data.requiresPlace,
        user: data.user,
      };
    });
    setTimeout(() => console.log(this.serviceInfo), 1000);
  }

  ngOnInit(): void {}

  submitContact() {
    this.contractService
      .postContract(
        this.serviceId,
        this.sessionService.get('email'),
        this.description
      )
      .subscribe((res) => {});
  }
}
