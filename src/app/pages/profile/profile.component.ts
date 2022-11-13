import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SessionService } from 'src/app/services/session/session.service';
import { FormServiceComponent } from 'src/app/components/form-service/form-service.component';
import { UserService } from 'src/app/services/user/user.service';
import { formatCurrency } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  isEditable: boolean = false;
  user: any = {
    username: '', 
    email: '',
    phone: null
  }
  newName: string = '';
  newPhone: any = null;


  constructor(private modalService: NgbModal, protected sessionService: SessionService, private userService: UserService) { }
  ngOnInit(): void {
    this.userService.getUser(this.sessionService.get('email')).subscribe((data: any) =>{
      this.user.username = data.name
      this.user.email = data.email
      this.user.phone = data.phone
    })
  }
  
  enableEdit() {
    this.isEditable = !this.isEditable;
  }

  clearEdit(){
    this.isEditable = !this.isEditable;
    this.newName = '';
    this.newPhone = null;
  }

  openCreateService() {
    const modalRef = this.modalService.open(FormServiceComponent,  { centered: true });
  }
  
  saveProfile() {
    this.userService.putUser(this.newName,this.user.email,this.newPhone).subscribe(res =>{
      console.log(res); 
      //this.sessionService.set('username', this.user.username);
    })
  }
}
