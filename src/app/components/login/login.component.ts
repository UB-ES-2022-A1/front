import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/services/login/login.service';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  error = false; 
  userLogin: UserLogin = {
    username: '',
    password: ''
  } 

  constructor(private modalService: NgbModal, private loginService: LoginService) { }

  ngOnInit(): void {
  }
  openRegister() {
    const modalRef = this.modalService.open(RegisterComponent,  { centered: true });
  }

   checkLogin(){
    this.loginService.login(this.userLogin.username, this.userLogin.password).subscribe((data: any) => {
      
    },
    ((error: any) =>{
      this.error=true; 
      console.error('error caught in component')
    }));
  } 

}
export interface UserLogin{
  username: string;
  password: string;
}
