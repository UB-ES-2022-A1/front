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
import { ReviewService } from 'src/app/services/reviews/review.service';
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
  starLevel: number = 0;
  starLevelT: number = 0;
  title: string = '';
  review: string = '';
  reviews: any[] = [];
  constructor(
    public router: Router,
    private sessionService: SessionService,
    private serviceService: ServiceService,
    private contractService: ContractedServicesService,
    private utils: UtilsService,
    protected loginService: LoginService,
    private modalService: NgbModal,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
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
        user: data.user_email,
      };
      if (this.serviceInfo.user === this.sessionService.get('email')) {
        this.myService = true;
      }
    });
    this.reviewService.getReviews(this.serviceId).subscribe((reviews: any) => {
      console.log(reviews);
      reviews.forEach((review: any) => {
        let newReview = {
          title: review.title,
          text: review.text,
          stars: 4,
        };
        this.reviews.push(newReview);
      });
    });
  }

  submitContact() {
    this.contractService
      .postContract(
        this.serviceId,
        this.sessionService.get('email'),
        this.description
      )
      .subscribe(
        (res) => {
          this.utils.openSnackBar(
            'You just contracted a service, the costumer is currently being notified',
            'Ok',
            3
          );
        },
        (error) => {
          this.utils.openSnackBar(
            "You don't have enough money on your wallet.",
            'OK',
            1
          );
        }
      );
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
  navigateToProfile(event: Event): void {
    event.stopPropagation();
    this.router.navigate([`/profile/${this.serviceInfo?.user}`]);
  }
  changeStar(n: any) {
    this.starLevel = n;
  }
  changeTStar(n: any) {
    this.starLevelT = n;
  }
  postReview() {
    this.reviewService
      .postReview(this.title, this.review, this.starLevelT, this.serviceId)
      .subscribe(
        (res: any) => {
          console.log(res);
          window.location.reload();
        },
        (error) => {
          this.utils.openSnackBar(
            'You already have a review for this product',
            'Ok',
            1
          );
        }
      );
  }
}
