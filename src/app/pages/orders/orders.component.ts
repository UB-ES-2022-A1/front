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
  @Input() id: string;
  @Input() title: string;
  @Input() description: string;
  @Input() price: number;
  noClientService: boolean = false;
  noContractorService: boolean = false;

  user: any = {
    username: '',
    email: '',
    phone: null,
    wallet: null,
  };

  contractsClient: ServiceTO[] = [];
  contractsConstractor: ServiceTO[] = [];


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
    console.log(this.contractsClient.length)
    if(this.contractsClient.length == 0){
      this.noClientService = true
    }
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
        console.log("ContractorContract: ",auxService)
        this.contractsConstractor.push(auxService);
      });
    });
  }
}
