import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UtilsService } from 'src/app/services/utils/utils.service';
@Component({
  selector: 'app-forgot-modal',
  templateUrl: './forgot-modal.component.html',
})
export class ForgotModalComponent implements OnInit {
  email: string = '';
  error: boolean = false;
  constructor(
    private userService: UserService,
    public modal: NgbActiveModal,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {}

  forgot() {
    this.userService.sendRecoveryMail(this.email).subscribe(
      (data) => {
        this.modal.close();
      },
      (error) => {
        this.error = true;
      }
    );
  }
}
