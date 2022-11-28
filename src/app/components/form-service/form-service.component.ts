import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceService } from 'src/app/services/service/service.service';

@Component({
  selector: 'app-form-service',
  templateUrl: './form-service.component.html',
})
export class FormServiceComponent implements OnInit {
  title: string = '';
  description: string = '';
  price: number = 0;
  constructor(
    private serviceService: ServiceService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.serviceService
      .postService(this.title, this.description, this.price, 'prueba@gmail.com')
      .subscribe((res) => {});
    this.modalService.dismissAll();
  }
}
