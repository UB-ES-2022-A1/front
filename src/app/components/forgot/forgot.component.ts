import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
})
export class ForgotComponent implements OnInit {
  newPassword: string = '';
  token: string = '';
  email: string = '';
  constructor(private userService: UserService, private router: Router) {
    this.token = this.router.url.substring(
      this.router.url.lastIndexOf('/') + 1
    );
  }

  ngOnInit(): void {}

  onSubmit() {
    this.userService
      .resetPwd(this.token, this.newPassword)
      .subscribe((data) => {
        console.log(data);
      });
  }
}
