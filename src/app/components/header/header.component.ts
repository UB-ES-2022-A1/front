import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FiltersTO } from 'src/app/entities/FiltersTO';
import { LoginService } from 'src/app/services/login/login.service';
import { SearchBarService } from 'src/app/services/search-bar/search-bar.service';
import { SessionService } from 'src/app/services/session/session.service';
import { FiltersComponent } from '../filters/filters.component';
import { FormServiceComponent } from '../form-service/form-service.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  enteredSearchValue: string = '';

  constructor(
    private modalService: NgbModal,
    protected loginService: LoginService,
    protected sessionService: SessionService,
    public router: Router,
    private data: SearchBarService
  ) {}

  filters: FiltersTO;

  ngOnInit(): void {
    this.data.currentSearch.subscribe((filters) => (this.filters = filters));
  }
  openLogin() {
    const modalRef = this.modalService.open(LoginComponent, { centered: true });
  }
  openCreateService() {
    const modalRef = this.modalService.open(FormServiceComponent, {
      centered: true,
    });
  }

  openFilters(): void {
    const modalRef = this.modalService.open(FiltersComponent, {
      centered: true,
      size: 'sm',
    });
    if (this.filters !== undefined) {
      modalRef.componentInstance.filters = this.filters;
    }
    modalRef.result.then((result) => {
      if (result[0] === 1) {
        this.filters.search = this.enteredSearchValue;
        console.log(this.filters);
      }
    });
  }

  onSearch() {
    this.router.navigate([`/`]);
    this.filters.search = this.enteredSearchValue;
    this.data.changeSearch(this.filters);
  }
  navigateProfile() {
    this.router.navigate([`/profile/${this.sessionService.get('email')}`]);
  }
  navigateOrders() {
    this.router.navigate([`/orders/`]);
  }
  goHome() {
    this.router.navigate([`/`]);
  }
  logout() {
    this.loginService.logout();
    window.location.reload();
  }
}
