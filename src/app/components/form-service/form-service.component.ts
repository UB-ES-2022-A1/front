import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceService } from 'src/app/services/service/service.service';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-form-service',
  templateUrl: './form-service.component.html',
})
export class FormServiceComponent implements OnInit {
  title: string = '';
  description: string = '';
  price: string = '';
  constructor(
    private serviceService: ServiceService,
    private modalService: NgbModal,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.serviceService
      .postService(
        this.title,
        this.description,
        parseInt(this.price),
        this.sessionService.get('email')
      )
      .subscribe(
        (res: any) => {
          console.log(res);
          window.location.reload();
          this.modalService.dismissAll();
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
