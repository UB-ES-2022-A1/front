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
  @Output()
  search: string = '';
  filters: FiltersTO = {
    priceMin: undefined,
    priceMax: undefined,
    priceOrd: 1,
  };
  ngOnInit(): void {
    this.data.currentSearch.subscribe((search) => (this.search = search));
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
    modalRef.componentInstance.filters = this.filters;
    modalRef.result.then((result) => {
      this.filters = result;
      console.log(this.filters);
    });
  }

  onSearch() {
    this.router.navigate([`/`]);
    this.data.changeSearch(this.enteredSearchValue);
  }
  navigateProfile() {
    this.router.navigate([`/profile/`]);
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
