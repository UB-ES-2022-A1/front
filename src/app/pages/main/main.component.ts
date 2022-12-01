import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormServiceComponent } from 'src/app/components/form-service/form-service.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { ServiceTO } from 'src/app/entities/ServiceTO';
import { LoginService } from 'src/app/services/login/login.service';
import { SearchBarService } from 'src/app/services/search-bar/search-bar.service';
import { ServiceService } from 'src/app/services/service/service.service';
import { SessionService } from 'src/app/services/session/session.service';
import { UserService } from 'src/app/services/user/user.service';
import { ServiceDetailTO } from '../service-detail/service-detail.component';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {
  services: ServiceTO[] = [];
  searchText: string = '';
  search: string = '';
  constructor(
    private userService: UserService,
    private serviceService: ServiceService,
    protected sessionService: SessionService,
    private modalService: NgbModal,
    private searchBarService: SearchBarService,
    protected loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.searchBarService.currentSearch.subscribe((search: any) => {
      this.search = search;
      this.serviceService.getServicesFilt(this.search).subscribe((data) => {
        this.services = [];
        data.forEach((service: any) => {
          let auxService: ServiceTO = {
            id: service.id,
            title: service.title,
            description: service.description,
            price: service.price,
            user: {
              email: '',
            },
          };
          this.userService.getUser(service.user).subscribe((res: any) => {
            auxService.user = {
              username: res.name,
              email: res.email,
            };
            this.services.push(auxService);
          });
        });
      });
    });
  }

  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
  }
  openCreateService() {
    const modalRef = this.modalService.open(FormServiceComponent, {
      centered: true,
    });
  }
  openLogin() {
    const modalRef = this.modalService.open(LoginComponent, { centered: true });
  }
}
