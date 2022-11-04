import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-anuncio',
  templateUrl: './card-anuncio.component.html',
  styleUrls: ['./card-anuncio.component.sass']
})
export class CardAnuncioComponent implements OnInit {
  @Input() id?: number; 
  @Input() title?: string;
  @Input() description?: string;
  @Input() price?: number; 
  constructor(public router: Router,) { }

  ngOnInit(): void {
  }
  seeDetail(): void {
    this.router.navigate([`/service/${this.id}`]);
  }
}
