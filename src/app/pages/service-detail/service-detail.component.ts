import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service/service.service';
import { ServiceTO } from 'src/app/entities/ServiceTO';
import { ContractedServicesService } from 'src/app/services/contracted-services/contracted-services.service';
import { SessionService } from 'src/app/services/session/session.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { LoginService } from 'src/app/services/login/login.service';
import { FormServiceComponent } from 'src/app/components/form-service/form-service.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
export interface ServiceDetailTO {
  id: string;
}
@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
})
export class ServiceDetailComponent implements OnInit {
  serviceId: string = '';
  serviceInfo: ServiceTO;
  contractButton: boolean = false;
  description: string = '';
  myService: boolean = false;
  constructor(
    public router: Router,
    private sessionService: SessionService,
    private serviceService: ServiceService,
    private contractService: ContractedServicesService,
    private utils: UtilsService,
    protected loginService: LoginService,
    private modalService: NgbModal
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
      if (this.serviceInfo.user === this.sessionService.get('email')) {
        this.myService = true;
      }
    });
  }

  ngOnInit(): void {}

  submitContact() {
    this.contractService
      .postContract(
        this.serviceId,
        this.sessionService.get('email'),
        this.description
      )
      .subscribe((res) => {
        this.utils.openSnackBar(
          'You just contracted a service, the costumer is currently being notified',
          'Ok',
          3
        );
      });
  }
  deactivate() {
    this.serviceService.deactivateService(this.serviceId).subscribe((data) => {
      this.utils.openSnackBar('This service is no longer visible', 'Ok', 2);
      this.router.navigate([`/`]);
    });
  }
  openEditService() {
    const modalRef = this.modalService.open(FormServiceComponent, {
      centered: true,
    });
    modalRef.componentInstance.editData = {
      id: this.serviceId,
      title: this.serviceInfo.title,
      description: this.serviceInfo.description,
      price: this.serviceInfo.price,
    };
  }
}
