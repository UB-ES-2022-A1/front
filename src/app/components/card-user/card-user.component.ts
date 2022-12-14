import { Component, Input, OnInit } from '@angular/core';
import { UserTO } from 'src/app/entities/UserTO';

@Component({
  selector: 'app-card-user',
  templateUrl: './card-user.component.html',
  styleUrls: ['./card-user.component.scss'],
})
export class CardUserComponent implements OnInit {
  @Input() contract: UserTO;

  constructor() {}

  ngOnInit(): void {}
}
