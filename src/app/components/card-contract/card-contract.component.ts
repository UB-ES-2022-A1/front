import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service/service.service';

@Component({
  selector: 'app-card-contract',
  templateUrl: './card-contract.component.html',
})
export class CardContractComponent implements OnInit {
  service: any = {
    id: null,
    title: '',
    description: '',
    price: '',
  }

  isActivated:boolean = false;
  @Input() id: number;
  @Input() title: string;
  @Input() description: string;
  @Input() price: number;
  constructor(public router: Router,private serviceService: ServiceService) {}

  ngOnInit(): void {
    this.serviceService.getService(this.id.toString()).subscribe((data: any) => {
      this.service = {
        id: data.id,
        title: data.title,
        description: data.description,
        price: data.price,
      };
    });
  }

  seeDetail(): void {
    this.router.navigate([`/service/${this.id}`]);
  }

  activateService(): void {
    this.isActivated = !this.isActivated;
  }

}
