import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceService } from 'src/app/services/service/service.service';
import { SessionService } from 'src/app/services/session/session.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-form-service',
  templateUrl: './form-service.component.html',
})
export class FormServiceComponent implements OnInit {
  title: string = '';
  description: string = '';
  price: string = '';
  @Input() editData: any;
  constructor(
    private serviceService: ServiceService,
    private modalService: NgbModal,
    private sessionService: SessionService,
    private router: Router,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {
    if (this.editData !== undefined) {
      this.title = this.editData.title;
      this.description = this.editData.description;
      this.price = this.editData.price;
    }
  }

  onSubmit() {
    if (this.editData === undefined) {
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
    } else {
      this.serviceService
        .putService(
          this.editData.id,
          this.title,
          this.description,
          parseInt(this.price),
          this.sessionService.get('email')
        )
        .subscribe(
          (res) => {
            console.log(res);
            this.router
              .navigate([`/service/${res.modified_service_id}`])
              .then(() => {
                window.location.reload();
              });
            this.modalService.dismissAll();
            this.utils.openSnackBar('Service modified correctly', 'Ok', 0);
          },
          (error) => {
            console.log(error);
            this.utils.openSnackBar('Error after modifying service', 'Ok', 1);
          }
        );
    }
  }
}
