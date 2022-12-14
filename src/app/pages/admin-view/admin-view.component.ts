import { Component, OnInit } from '@angular/core';
import { UserTO } from 'src/app/entities/UserTO';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './admin-view.component.html',
})
export class AdminViewComponent implements OnInit {
  usersList: UserTO[];
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((res: any) => {
      let user: UserTO;
      user = {
        email: res.email,
        username: res.username,
        grade: res.user_grade,
        wallet: res.wallet,
        access: res.access,
      };
      this.usersList.push(user);
    });
  }
}
