import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-forgot-modal',
  templateUrl: './forgot-modal.component.html',
})
export class ForgotModalComponent implements OnInit {
  email: string = '';
  constructor(private userService: UserService, public modal: NgbActiveModal) {}

  ngOnInit(): void {}
  forgot() {
    this.userService.sendRecoveryMail(this.email).subscribe(
      (data) => {
        console.log(data);
        this.modal.close();
      },
      (error) => {
        this.modal.close();
      }
    );
  }
}
