import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user/user.service';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  error = false;
  userLogin: UserLogin = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private sessionService: SessionService
  ) {}

  postUser() {
    this.userService
      .postUser(
        this.userLogin.username,
        this.userLogin.email,
        this.userLogin.password
      )
      .subscribe(
        (res) => {
          this.sessionService.set('username', this.userLogin.username);
          this.modalService.dismissAll();
        },
        (error: any) => {
          this.error = true;
          console.error('error caught in component');
        }
      );
  }

  ngOnInit(): void {}
}
export interface UserLogin {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
