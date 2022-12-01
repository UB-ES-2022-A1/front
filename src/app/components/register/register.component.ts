import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user/user.service';
import { SessionService } from 'src/app/services/session/session.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  error = '';
  userLogin: UserLogin = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private sessionService: SessionService,
    private utils: UtilsService
  ) {}

  postUser() {
    if (this.userLogin.password === this.userLogin.confirmPassword) {
      this.userService
        .postUser(
          this.userLogin.username,
          this.userLogin.email,
          this.userLogin.password
        )
        .subscribe(
          (res) => {
            this.utils.openSnackBar(
              'Please, verify your email before your next login.',
              'Ok',
              2
            );
            this.modalService.dismissAll();
          },
          (error: any) => {
            this.error = 'Unexpected error';
            console.log(error);
          }
        );
    } else {
      this.error = "Passwords don't match";
    }
  }

  ngOnInit(): void {}
}
export interface UserLogin {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
