import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user/user.service';

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


  constructor(private modalService: NgbModal, private userService: UserService) { }

  openLogin() {
    const modalRef = this.modalService.open(LoginComponent,  { centered: true });
  }

  postUser() {
    this.userService.postUser(this.userLogin.username, this.userLogin.email, this.userLogin.password).subscribe(res => {
      console.log(res)
    })
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
