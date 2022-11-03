import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SessionService } from 'src/app/services/session/session.service';
import { FormServiceComponent } from 'src/app/components/form-service/form-service.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  isEditable: boolean = false;

  constructor(private modalService: NgbModal, protected sessionService: SessionService) { }
  ngOnInit(): void {
  }
  
  editProfile() {
    this.isEditable = true;
  }
  openCreateService() {
    const modalRef = this.modalService.open(FormServiceComponent,  { centered: true });

  }

  saveProfile(): void{

  }
  

}
