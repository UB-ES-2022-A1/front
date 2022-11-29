import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ForgotModalComponent } from 'src/app/components/forgot-modal/forgot-modal.component';
import { LoginService } from 'src/app/services/login/login.service';
import { SessionService } from 'src/app/services/session/session.service';
import { UserService } from 'src/app/services/user/user.service';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  error = false;
  userLogin: UserLogin = {
    username: '',
    password: '',
  };

  constructor(
    private modalService: NgbModal,
    private loginService: LoginService,
    private sessionService: SessionService,
    private userService: UserService
  ) {}

  ngOnInit(): void {}
  openRegister() {
    const modalRef = this.modalService.open(RegisterComponent, {
      centered: true,
    });
  }

  checkLogin() {
    this.loginService
      .login(this.userLogin.username, this.userLogin.password)
      .subscribe(
        (data: any) => {
          this.sessionService.set('email', this.userLogin.username);
          this.sessionService.set('token', data.token);
          this.userService
            .getUser(this.userLogin.username)
            .subscribe((data) => {
              this.sessionService.set('username', data.name);
            });
          this.modalService.dismissAll();
        },
        (error: any) => {
          this.error = true;
          console.error('error caught in component');
        }
      );
  }
  forgotModal() {
    const modalRef = this.modalService.open(ForgotModalComponent, {
      centered: true,
    });
  }
}
export interface UserLogin {
  username: string;
  password: string;
}
