import { Component, Input, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session/session.service';
import { FormServiceComponent } from 'src/app/components/form-service/form-service.component';
import { UserService } from 'src/app/services/user/user.service';
import { ServiceTO } from 'src/app/entities/ServiceTO';
import { ServiceService } from 'src/app/services/service/service.service';
import { ContractedServicesService } from 'src/app/services/contracted-services/contracted-services.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
})
export class OrdersComponent implements OnInit {
  @Input() id: number;
  @Input() title: string;
  @Input() description: string;
  @Input() price: number;

  user: any = {
    username: '',
    email: '',
    phone: null,
    wallet: null,
  };
  contractsClient: ServiceTO[] = [];
  contractsConstractor: ServiceTO[] = [];
  offers: ServiceTO[] = [];


  constructor(
    protected sessionService: SessionService,
    private userService: UserService,
    private serviceService: ServiceService,
    private contractedService: ContractedServicesService,
    public router: Router
    ) { }

  ngOnInit(): void {
    this.loadClientContract();
    this.loadContractorContract();
    this.loadOffers();
  }

  navigateToProfile(event: Event): void {
    event.stopPropagation();
    if (this.user !== undefined) {
      this.router.navigate([`/profile/${this.user.email}`]);
      console.log(this.user);
    }
  }

  loadClientContract(): void {
    this.contractedService.getClientContract(this.sessionService.get("email")).subscribe((res) => {
      res.forEach((service: any) => {
        let auxService: ServiceTO = {
          id: service.id,
          title: service.title,
          description: service.description,
          price: service.price,
        };
        this.contractsClient.push(auxService);
      });
    });
  }

  loadContractorContract(): void {
    this.contractedService.getContractorContract(this.sessionService.get("email")).subscribe((res) => {
      res.forEach((service: any) => {
        let auxService: ServiceTO = {
          id: service.id,
          title: service.title,
          description: service.description,
          price: service.price,
        };
        this.contractsConstractor.push(auxService);
      });
    });
  }

  loadOffers(): void {
    console.log(this.user.email);
    this.serviceService.getUserServices(this.sessionService.get("email")).subscribe((res) => {
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

}
