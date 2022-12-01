import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
})
export class ForgotComponent implements OnInit {
  newPassword: string = '';
  confirmPassword: string = '';

  token: string = '';
  email: string = '';
  constructor(
    private userService: UserService,
    private router: Router,
    private utils: UtilsService
  ) {
    this.token = this.router.url.substring(
      this.router.url.lastIndexOf('/') + 1
    );
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.newPassword === this.confirmPassword) {
      this.userService
        .resetPwd(this.token, this.newPassword)
        .subscribe((data) => {});
    } else {
      this.utils.openSnackBar("Passwords don't match", 'Ok', 1);
    }
  }
}
