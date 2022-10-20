import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/services/login/login.service';
import { SessionService } from 'src/app/services/session/session.service';
import { FormServiceComponent } from '../form-service/form-service.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  constructor(private modalService: NgbModal, protected loginService: LoginService, protected sessionService: SessionService) { }

  ngOnInit(): void {
  }
  openLogin() {
    const modalRef = this.modalService.open(LoginComponent,  { centered: true });
  }
  openCreateService() {
    const modalRef = this.modalService.open(FormServiceComponent,  { centered: true });

  }
}
