import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/services/login/login.service';
import { SearchBarService } from 'src/app/services/search-bar/search-bar.service';
import { SessionService } from 'src/app/services/session/session.service';
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

  sortPrice(): void {}

  onSearch() {
    this.data.changeSearch(this.search);
  }
  goHome() {
    this.router.navigate([`/`]);
  }
  logout() {
    this.loginService.logout();
    window.location.reload();
  }
}
