import { Component, OnInit } from '@angular/core';
import { UserTO } from 'src/app/entities/UserTO';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './admin-view.component.html',
})
export class AdminViewComponent implements OnInit {
  usersList: UserTO[] = [];
  edit: boolean = false;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((res: any) => {
      let user: UserTO;
      res.forEach((resUser: any) => {
        user = {
          email: resUser.email,
          username: resUser.name,
          grade: resUser.user_grade,
          wallet: resUser.wallet,
          access: resUser.access,
          edited: false,
          moneyAdded: 0,
        };
        this.usersList.push(user);
      });
    });
  }
  editMode(): void {
    this.edit = !this.edit;
  }
  save(): void {
    this.usersList.forEach((user: UserTO) => {
      if (user.edited === true) {
        this.userService
          .addMoney(user.email, user.moneyAdded)
          .subscribe((res: any) => {
            console.log(res);
          });
        this.userService
          .setAccess(user.email, user.access)
          .subscribe((res: any) => {
            console.log(res);
          });
      }
    });
    //this.userService.setAccess(userEmail);
  }
}
