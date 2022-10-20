import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-anuncio',
  templateUrl: './card-anuncio.component.html',
  styleUrls: ['./card-anuncio.component.sass']
})
export class CardAnuncioComponent implements OnInit {
  @Input() title?: string;
  @Input() description?: string;
  @Input() price?: number; 
  constructor() { }

  ngOnInit(): void {
  }

}
