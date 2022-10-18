import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  openRegister() {
    const modalRef = this.modalService.open(RegisterComponent,  { centered: true });
  }

  /* checkLogin(){
    this.loginService.login(this.userLogin.username, this.userLogin.password).subscribe((data: any) => {
      if(data!=null){
        this.sessionService.set('username', data.username);
        this.sessionService.set('token',  data.token); 
        this.router.navigate(['/activities']);

      }
    },
    (error) =>{
      this.error=true; 
      console.error('error caught in component')
    });
  } */

}
export interface UserLogin{
  username: string;
  password: string;
}
