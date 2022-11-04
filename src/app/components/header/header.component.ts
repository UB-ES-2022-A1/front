import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
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
  enteredSearchValue: string = '';

  constructor(private modalService: NgbModal, protected loginService: LoginService, protected sessionService: SessionService, public router: Router) { }

  ngOnInit(): void {
  }
  openLogin() {
    const modalRef = this.modalService.open(LoginComponent,  { centered: true });
  }
  openCreateService() {
    const modalRef = this.modalService.open(FormServiceComponent,  { centered: true });

  }

  sortPrice():void{
  }

  @Output()
  searchTextChanged: EventEmitter<string> = new EventEmitter<string>();

  /* onSearchTextChanged(){
    this.searchTextChanged.emit(this.enteredSearchValue)
  } */
  goHome(){
    this.router.navigate([`/`]);
  }
  logout(){
    this.loginService.logout(); 
    window.location.reload(); 

  }
}
