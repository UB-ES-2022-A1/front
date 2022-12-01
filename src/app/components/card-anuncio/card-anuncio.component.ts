import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserTO } from 'src/app/entities/UserTO';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-card-anuncio',
  templateUrl: './card-anuncio.component.html',
})
export class CardAnuncioComponent implements OnInit {
  @Input() id: number;
  @Input() title: string;
  @Input() description: string;
  @Input() price: number;
  @Input() user?: UserTO;
  constructor(public router: Router) {}

  ngOnInit(): void {}
  seeDetail(): void {
    this.router.navigate([`/service/${this.id}`]);
  }
  navigateToProfile(event: Event): void {
    event.stopPropagation();
    if (this.user !== undefined) {
      this.router.navigate([`/profile/${this.user.email}`]);
      console.log(this.user);
    }
  }
}