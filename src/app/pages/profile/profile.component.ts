import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SessionService } from 'src/app/services/session/session.service';
import { FormServiceComponent } from 'src/app/components/form-service/form-service.component';
import { UserService } from 'src/app/services/user/user.service';
import { ServiceTO } from 'src/app/entities/ServiceTO';
import { ServiceService } from 'src/app/services/service/service.service';
import { ContractedServicesService } from 'src/app/services/contracted-services/contracted-services.service';
import { ForgotModalComponent } from 'src/app/components/forgot-modal/forgot-modal.component';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  myProfile: boolean = false;
  isEditable: boolean = false;
  urlEmail: string;
  user: any = {
    username: '',
    email: '',
    phone: null,
    wallet: '',
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
    private utils: UtilsService,
    private router: Router
  ) {
    this.user.email = this.router.url.substring(
      this.router.url.lastIndexOf('/') + 1
    );
  }
  ngOnInit(): void {
    this.user.email === this.sessionService.get('email')
      ? (this.myProfile = true)
      : null;
    this.userService.getUser(this.user.email).subscribe((res: any) => {
      this.user.username = res.name;
      this.user.phone = res.phone;
      this.user.wallet = res.wallet;
    });
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
          user: {
            email: this.user.email,
            username: this.user.username,
          },
        };
        this.offers.push(auxService);
      });
    });
  }
}
