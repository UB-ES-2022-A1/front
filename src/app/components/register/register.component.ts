import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  error = false; 
  userLogin: UserLogin = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  } 


  constructor(private modalService: NgbModal) { }

  openLogin() {
    const modalRef = this.modalService.open(LoginComponent,  { centered: true });
  }

  ngOnInit(): void {
  }

}
export interface UserLogin{
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
