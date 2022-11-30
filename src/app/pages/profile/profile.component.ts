import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SessionService } from 'src/app/services/session/session.service';
import { FormServiceComponent } from 'src/app/components/form-service/form-service.component';
import { UserService } from 'src/app/services/user/user.service';
import { formatCurrency } from '@angular/common';
import { ServiceTO } from 'src/app/entities/ServiceTO';
import { ServiceService } from 'src/app/services/service/service.service';
import { ContractedServicesService } from 'src/app/services/contracted-services/contracted-services.service';
import { ForgotModalComponent } from 'src/app/components/forgot-modal/forgot-modal.component';
import { UtilsService } from 'src/app/services/utils/utils.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  isEditable: boolean = false;
  user: any = {
    username: '',
    email: '',
    phone: null,
  };
  newName: string = '';
  newPhone: any = null;
  offers: ServiceTO[] = [];
  contracts: ServiceTO[] = [];

  constructor(
    private modalService: NgbModal,
    protected sessionService: SessionService,
    private userService: UserService,
    private serviceService: ServiceService,
    private contractedService: ContractedServicesService,
    private utils: UtilsService
  ) {}
  ngOnInit(): void {
    this.user.email = this.sessionService.get("email");
    this.loadContracts();
    this.loadOffers();
  }

  enableEdit() {
    this.isEditable = !this.isEditable;
  }

  clearEdit() {
    this.isEditable = !this.isEditable;
    this.newName = '';
    this.newPhone = null;
  }

  openCreateService() {
    const modalRef = this.modalService.open(FormServiceComponent, {
      centered: true,
    });
  }

  saveProfile() {
    this.userService
      .putUser(this.newName, this.user.email, this.newPhone)
      .subscribe((res) => {
        this.utils.openSnackBar('Change saved!', '', 0);
      });
  }

  forgotModal() {
    const modalRef = this.modalService.open(ForgotModalComponent, {
      centered: true,
    });
  }

  loadOffers(): void {
    console.log(this.user.email);
    this.serviceService.getUserServices(this.user.email).subscribe((res) => {
      res.forEach((service: any) => {
        let auxService: ServiceTO = {
          id: service.id,
          title: service.title,
          description: service.description,
          price: service.price,
        };
        this.offers.push(auxService);
      });
    });
  }

  loadContracts(): void {
    this.contractedService.getUserContract(this.user.email).subscribe((res) => {
      res.forEach((service: any) => {
        let auxService: ServiceTO = {
          id: service.id,
          title: service.title,
          description: service.description,
          price: service.price,
        };
        this.contracts.push(auxService);
      });
    });
  }
}
